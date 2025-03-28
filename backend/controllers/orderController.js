import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";
import sendEmail from "../Utills/sendEmail.js";
import { OrderConfirmationTemplate } from "../Utills/Emails/OrderStatus/OrderConfirmationTemplate.js";
import { OrderProcessingTemplate } from "../Utills/Emails/OrderStatus/OrderProcessingTemplate.js";
import { OrderShippedTemplate } from "../Utills/Emails/OrderStatus/OrderShippedTemplate.js";
import { OrderDeliveredTemplate } from "../Utills/Emails/OrderStatus/OrderDeliveredTemplate.js";
import { OrderCancelledTemplate } from "../Utills/Emails/OrderStatus/OrderCancelledTemplate.js";
import { OrderPreOrderTemplate } from "../Utills/Emails/OrderStatus/OrderPreOrderTemplate.js";
import { OrderOnHoldTemplate } from "../Utills/Emails/OrderStatus/OrderOnHoldTemplate.js";

// --------------- VALIDATE ORDER DATA -----------------------------
const validateOrderData = (data, next) => {
  const {
    user,
    email,
    shippingAddress,
    orderItems,
    paymentInfo,
    totalPrice,
    taxPrice,
    shippingPrice,
  } = data;

  if (!user) return next(new ErrorHandler("User ID is required", 400));
  if (!email) return next(new ErrorHandler("Email is required", 400));
  if (!shippingAddress)
    return next(new ErrorHandler("Shipping address is required", 400));
  if (!orderItems?.length)
    return next(new ErrorHandler("Order items are required", 400));
  if (!paymentInfo?.method)
    return next(new ErrorHandler("Payment information is required", 400));

  // Validate order items
  for (const item of orderItems) {
    if (!item.product)
      return next(
        new ErrorHandler("Product ID is required for each item", 400)
      );
    if (!item.name)
      return next(
        new ErrorHandler("Product name is required for each item", 400)
      );
    if (!item.quantity || item.quantity < 1)
      return next(
        new ErrorHandler("Valid quantity is required for each item", 400)
      );
    if (!item.price || item.price < 0)
      return next(
        new ErrorHandler("Valid price is required for each item", 400)
      );
  }

  // Validate prices
  if (typeof taxPrice !== "number")
    return next(new ErrorHandler("Valid tax price is required", 400));
  if (typeof shippingPrice !== "number")
    return next(new ErrorHandler("Valid shipping price is required", 400));
  if (!totalPrice || totalPrice < 0)
    return next(new ErrorHandler("Valid total price is required", 400));

  return true;
};

// --------------- SEND ORDER EMAIL -----------------------------
const sendOrderEmail = catchAsyncErrors(async (type, order, recipientEmail) => {
  let emailTemplate;
  let subject;

  const customerName = order.user?.username || recipientEmail.split("@")[0];
  const orderId = order._id;
  const orderStatus = order.orderStatus;

  // Determine which template to use based on order status
  switch (orderStatus) {
    case "Pending":
      emailTemplate = OrderConfirmationTemplate(
        customerName,
        orderId,
        orderStatus,
        order
      );
      subject = "Order Confirmation";
      break;
    case "Processing":
      emailTemplate = OrderProcessingTemplate(
        customerName,
        orderId,
        orderStatus,
        order
      );
      subject = "Your Order is Being Processed";
      break;
    case "Shipped":
      // Make sure to pass the complete order object including shipping info
      emailTemplate = OrderShippedTemplate(
        customerName,
        orderId,
        orderStatus,
        order
      );
      subject = "Your Order Has Been Shipped";
      break;
    case "Delivered":
      emailTemplate = OrderDeliveredTemplate(
        customerName,
        orderId,
        orderStatus,
        order
      );
      subject = "Your Order Has Been Delivered";
      break;
    case "Cancelled":
      emailTemplate = OrderCancelledTemplate(
        customerName,
        orderId,
        orderStatus,
        order
      );
      subject = "Your Order Has Been Cancelled";
      break;
    case "Pre-Order":
      emailTemplate = OrderPreOrderTemplate(
        customerName,
        orderId,
        orderStatus,
        order
      );
      subject = "Your Pre-Order Confirmation";
      break;
    case "On Hold":
      emailTemplate = OrderOnHoldTemplate(
        customerName,
        orderId,
        orderStatus,
        order
      );
      subject = "Your Order is On Hold";
      break;
    default:
      emailTemplate = OrderConfirmationTemplate(
        customerName,
        orderId,
        orderStatus,
        order
      );
      subject = "Order Update";
  }

  await sendEmail({
    email: recipientEmail,
    subject,
    message: emailTemplate,
  });
});

// --------------- CREATE A NEW ORDER -----------------------------

export const createOrder = catchAsyncErrors(async (req, res, next) => {
  // Validate order data
  if (!validateOrderData(req.body, next)) return;

  try {
    // Create order
    const order = await Order.create({
      ...req.body,
      paidAt: Date.now(),
    });

    // Populate order details
    const populatedOrder = await Order.findById(order._id)
      .populate("user", "username email")
      .populate(
        "shippingAddress",
        "contact_number address_line1 address_line2 city state postal_code country"
      )
      .populate({
        path: "orderItems.product",
        select: "product_name product_images product_color",
        populate: {
          path: "product_color",
          select: "name code",
        },
      });

    // Format order items
    const formattedOrderItems = populatedOrder.orderItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price, // Original price
      discountedPrice: item.discountedPrice || item.price, // Discounted price or original if no discount
      hasDiscount: item.discountedPrice && item.discountedPrice < item.price, // Flag to check if item has discount
      image:
        item.product?.product_images[0]?.url ||
        "https://via.placeholder.com/80",
      color: item.color || item.product?.product_color?.name || "N/A",
      includes: item.includes || null,
    }));

    // --------------- SEND CONFIRMATION EMAIL -----------------------------
    await sendOrderEmail(
      "confirmation",
      {
        ...populatedOrder.toObject(),
        orderItems: formattedOrderItems,
        shippingAddress: {
          address: `${populatedOrder.shippingAddress?.address_line1 || ""} ${
            populatedOrder.shippingAddress?.address_line2 || ""
          }, ${populatedOrder.shippingAddress?.city || ""}, ${
            populatedOrder.shippingAddress?.country || ""
          }, ${populatedOrder.shippingAddress?.postal_code || ""}`,
          phoneNo: populatedOrder.shippingAddress?.contact_number || "N/A",
        },
      },
      req.body.email
    );

    // Send notification to admin
    await sendEmail({
      email: process.env.SMTP_USER,
      subject: `New Order #${populatedOrder._id}`,
      message: OrderConfirmationTemplate(
        "Admin", // customerName
        populatedOrder._id, // orderId
        populatedOrder.orderStatus, // orderStatus
        {
          ...populatedOrder.toObject(),
          orderItems: formattedOrderItems,
          shippingAddress: {
            address: `${populatedOrder.shippingAddress?.address_line1 || ""} ${
              populatedOrder.shippingAddress?.address_line2 || ""
            }, ${populatedOrder.shippingAddress?.city || ""}, ${
              populatedOrder.shippingAddress?.country || ""
            }, ${populatedOrder.shippingAddress?.postal_code || ""}`,
            phoneNo: populatedOrder.shippingAddress?.contact_number || "N/A",
          },
          user: populatedOrder.user,
          paymentInfo: populatedOrder.paymentInfo,
          totalPrice: populatedOrder.totalPrice,
          isAdminNotification: true, // Add this flag to customize message
        }
      ),
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// ---------------------------- GET ALL ORDERS FOR LOGGED IN USER -----------------------------

export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.user_id }).sort({
    createdAt: -1,
  });

  if (!orders?.length) {
    return next(new ErrorHandler("No orders found", 404));
  }

  res.status(200).json({
    success: true,
    message: `${orders.length} Orders found`,
    data: orders,
  });
});

// ---------------------------------- GET ALL ORDERS FOR ADMIN ------------------------------------------

export const getAllOrdersForAdmin = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().sort({ createdAt: -1 });

  if (!orders?.length) {
    return next(new ErrorHandler("No orders found", 404));
  }

  res.status(200).json({
    success: true,
    message: `${orders.length} Orders found`,
    data: orders,
  });
});

// ----------------------------------- GET SINGLE ORDER BY ID FOR LOGGED IN USER --------------------------------------------
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.user._id.toString() !== req.user.user_id) {
    return next(
      new ErrorHandler("You are not authorized to view this order", 403)
    );
  }

  res.status(200).json({
    success: true,
    message: "Order found",
    data: order,
  });
});

// ----------------------------------- UPDATE ORDER STATUS - USER --------------------------------------------
export const updateOrderForUser = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.user._id.toString() !== req.user.user_id) {
    return next(
      new ErrorHandler("You are not authorized to update this order", 403)
    );
  }

  if (["Shipped", "Delivered", "Cancelled"].includes(order.orderStatus)) {
    return next(
      new ErrorHandler(
        `Order cannot be updated as it is already ${order.orderStatus}`,
        400
      )
    );
  }

  const { orderNotes, cancelOrder } = req.body;

  if (orderNotes) {
    order.orderNotes = orderNotes;
  }

  if (cancelOrder) {
    if (["Shipped", "Delivered"].includes(order.orderStatus)) {
      return next(
        new ErrorHandler(
          "Order cannot be cancelled as it is already shipped or delivered",
          400
        )
      );
    }

    order.orderStatus = "Cancelled";
    order.cancelledAt = Date.now();
    order.cancellationReason = cancelOrder.reason || "Cancelled by user";
  }

  const updatedOrder = await order.save();

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: updatedOrder,
  });
});

// ------------------------------------ GET ALL ORDERS ADMIN ----------------------------
export const getAllOrdersAdmin = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler("You are not authorized to view this page", 403)
    );
  }

  // FETCH ALL ORDERS
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate("user", "name email")
    .populate("shippingAddress", "address city postalCode")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: ` ${orders.length} Orders found`,
    data: orders,
  });
});

// ------------------------- UPDATE ORDER STATUS BY ID - ADMIN ---------------------------

const validateStatusTransition = (currentStatus, newStatus) => {
  const statusTransitions = {
    Pending: ["Processing", "On Hold", "Cancelled"],
    Processing: ["Shipped", "On Hold", "Cancelled"],
    Shipped: ["Delivered", "Returned"],
    Delivered: ["Returned"],
    Cancelled: [],
    "On Hold": ["Processing", "Cancelled"],
    Returned: [],
  };

  return statusTransitions[currentStatus]?.includes(newStatus);
};

export const updateOrderForAdmin = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  // Validate status transition if status is being updated
  if (req.body.orderStatus) {
    const isValidTransition = validateStatusTransition(
      order.orderStatus,
      req.body.orderStatus
    );

    if (!isValidTransition) {
      return next(
        new ErrorHandler(
          `Invalid status transition from ${order.orderStatus} to ${req.body.orderStatus}`,
          400
        )
      );
    }

    // Validate shipping information when status is being updated to "Shipped"
    if (req.body.orderStatus === "Shipped") {
      const { courier, trackingNumber, trackingLink } =
        req.body.shippingInfo || {};

      if (!courier || !trackingNumber || !trackingLink) {
        return next(
          new ErrorHandler(
            "Courier, tracking number, and tracking link are required for shipped orders",
            400
          )
        );
      }

      order.shippingInfo = {
        courier,
        trackingNumber,
        trackingLink,
        additionalInfo: req.body.shippingInfo?.additionalInfo || "",
        shippedAt: Date.now(),
      };
    }

    order.orderStatus = req.body.orderStatus;
  }

  const updatedOrder = await order.save();

  // --------------- SEND STATUS UPDATE EMAIL WHEN ORDER STATUS IS UPDATED  BY ADMIN-----------------------------
  if (req.body.orderStatus) {
    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate("user", "username email")
      .populate(
        "shippingAddress",
        "contact_number address_line1 address_line2 city state postal_code country"
      )
      .populate({
        path: "orderItems.product",
        select: "product_images product_color",
      });

    // Format order items consistently
    const formattedOrderItems = populatedOrder.orderItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price, // Original price
      discountedPrice: item.discountedPrice || item.price, // Discounted price or original if no discount
      hasDiscount: item.discountedPrice && item.discountedPrice < item.price, // Flag to check if item has discount
      image:
        item.product?.product_images[0]?.url ||
        "https://via.placeholder.com/80",
      color: item.color || item.product?.product_color?.name || "N/A",
      includes: item.includes || null,
    }));

    // Format shipping address and order details consistently
    const formattedOrder = {
      ...populatedOrder.toObject(),
      orderItems: formattedOrderItems,
      shippingAddress: {
        address: `${populatedOrder.shippingAddress?.address_line1 || ""} ${
          populatedOrder.shippingAddress?.address_line2 || ""
        }, ${populatedOrder.shippingAddress?.city || ""}, ${
          populatedOrder.shippingAddress?.country || ""
        }, ${populatedOrder.shippingAddress?.postal_code || ""}`,
        phoneNo: populatedOrder.shippingAddress?.contact_number || "N/A",
      },
      totalPrice: populatedOrder.totalPrice,
      shippingPrice: populatedOrder.shippingPrice,
      taxPrice: populatedOrder.taxPrice,
    };

    await sendOrderEmail("status", formattedOrder, order.email);
  }

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: updatedOrder,
  });
});
