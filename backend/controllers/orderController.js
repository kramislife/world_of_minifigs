import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";
import { OrderConfirmationTemplate } from "../Utills/Emails/OrderConfirmationTemplate.js";
import sendEmail from "../Utills/sendEmail.js";
import { OrderStatusUpdateTemplate } from "../Utills/Emails/OrderStatusUpdateTemplate.js";

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
const sendOrderEmail = async (type, order, email) => {
  const emailConfig = {
    email,
    subject:
      type === "confirmation"
        ? `Order Confirmation #${order._id}`
        : `Order Status Update - #${order._id}`,
    message:
      type === "confirmation"
        ? OrderConfirmationTemplate(
            order.user?.username || "Valued Customer",
            order._id,
            order.orderStatus,
            order
          )
        : OrderStatusUpdateTemplate(
            order.user?.username || "Valued Customer",
            order._id,
            order.orderStatus,
            order
          ),
  };

  await sendEmail(emailConfig);
};

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
      price: item.discountedPrice,
      image:
        item.product.product_images[0]?.url || "https://via.placeholder.com/80",
      color:
        item.color ||
        (item.product.product_color ? item.product.product_color.name : null),
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

    order.orderStatus = req.body.orderStatus;
  }

  const updatedOrder = await order.save();

  // --------------- SEND STATUS UPDATE EMAIL -----------------------------
  if (req.body.orderStatus) {
    await sendOrderEmail("status", updatedOrder, order.email);
  }

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: updatedOrder,
  });
});
