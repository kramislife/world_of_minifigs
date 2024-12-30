import mongoose from "mongoose";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";
import { getOrderUpdateEmailTemplate } from "../Utills/Emails/UpdateEmailTemplate.js";
import sendEmail from "../Utills/sendEmail.js";

// --------------- CREATE A NEW ORDER -----------------------------

export const createOrder = catchAsyncErrors(async (req, res, next) => {
  console.log("In Create Order");

  // TAKE DATA FROM THE REQUEST BODY

  const {
    shippingAddress,
    billingAddress,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    discountPrice,
    orderNotes,
  } = req.body;

  // VALIDATE ORDER ITEMS
  if (!orderItems || orderItems.length === 0) {
    return next(
      new ErrorHandler(" Please add some products to your order", 400)
    );
  }

  // VALIDATE REFERENCE IDS
  if (!shippingAddress) {
    return next(new ErrorHandler("Please add shipping address", 400));
  }

  // CALCULAT PRICE AND TOTAL
  const totalPrice =
    itemsPrice + taxPrice + shippingPrice - (discountPrice || 0);

  // CHECK STOCKS FOR NON PREORDER ITEMS
  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      return next(
        new ErrorHandler(`Product with id ${item.product} not found`, 404)
      );
    }

    if (!item.isPreorder && product.stock < item.quantity) {
      return next(
        new ErrorHandler(`Insuffecient stock for product : ${item.name}`, 404)
      );
    }
  }

  // CREATE NEW ORDER
  const newOrder = await Order({
    user: req.user.user_id,
    shippingAddress,
    billingAddress,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    discountPrice: discountPrice || 0,
    totalPrice,
    orderNotes,
  });

  const saveOrder = await newOrder.save();

  if (!saveOrder) {
    return next(new ErrorHandler("Failed to save order", 400));
  }

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: saveOrder,
  });
});

// ---------------------------- GET ALL ORDERS FOR LOGGED IN USER -----------------------------

export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const user_id = req.user.user_id;

  // console.log(user_id);

  if (!user_id) {
    next(new ErrorHandler("User not found", 404));
  }

  const orders = await Order.find({ user: user_id }).sort({ createdAt: -1 });

  if (!orders || orders.length === 0) {
    return next(new ErrorHandler("No orders found", 404));
  }

  res.status(200).json({
    success: true,
    message: ` ${orders.length} Orders found`,
    data: orders,
  });
});

// ---------------------------------- GET ALL ORDERS FOR ADMIN ------------------------------------------

export const getAllOrdersForAdmin = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  if (!orders || orders.length === 0) {
    return next(new ErrorHandler("No orders found", 404));
  }

  res.status(200).json({
    success: true,
    message: ` ${orders.length} Orders found`,
    data: orders,
  });
});

// ----------------------------------- GET SINGLE ORDER BY ID FOR LOGGED IN USER --------------------------------------------
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const orderId = req.params.id;

  if (!orderId) {
    return next(new ErrorHandler("Order not found", 404));
  }

  const order = await Order.findById(orderId).populate("user", "name email");
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
    message: `Order found`,
    data: order,
  });
});

// ----------------------------------- UPDATE ORDER STATUS - USER --------------------------------------------
export const updateOrderForUser = catchAsyncErrors(async (req, res, next) => {
  const orderId = req.params.id;

  // FIND THE ORDER
  const order = await Order.findById(orderId);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.user._id.toString() !== req.user.user_id) {
    return next(
      new ErrorHandler("You are not authorized to update this order", 403)
    );
  }

  // RESTRICT UPDATES IF THE ORDER IS ALREADY PROCESSED
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
    if (order.orderStatus === "Shipped" || order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler(
          "Order cannot be cancelled as it is already shipped or delivered",
          400
        )
      );
    }

    order.orderStatus = "Cancelled";
    order.cancelledAt = Date.now();
    order.cancellationReason = cancelOrder.reason || " Canclled by user";
  }
  const updatedOrder = await order.save();

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: updatedOrder,
  });
});

// ----------------------------------- GET SINGLE ORDER BY ID FOR ADMIN --------------------------------------------

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
    .populate("shippingAddress billingAddress", "address city postalCode")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: ` ${orders.length} Orders found`,
    data: orders,
  });
});

// ----------------------------------- GET SINGLE ORDER BY ID FOR ADMIN --------------------------------------------

// ------------------------- UPDATE ORDER STATUS BY ID - ADMIN ---------------------------

export const updateOrderForAdmin = catchAsyncErrors(async (req, res, next) => {
  const orderId = req.params.id;

  // FIND THE ORDER
  const order = await Order.findById(orderId).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  const { orderStatus, shippingInfo } = req.body;

  // VALIDATE REQUEST
  if (!orderStatus && !shippingInfo) {
    return next(
      new ErrorHandler(
        "Provide either order status or shipping info to update.",
        400
      )
    );
  }

  // RESTRICT UPDATES FOR DELIVERED/CANCELLED ORDERS
  if (["Delivered", "Cancelled"].includes(order.orderStatus)) {
    return next(
      new ErrorHandler(
        `Cannot update order as it is already ${order.orderStatus}.`,
        400
      )
    );
  }

  const validStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "On Hold",
    "Returned",
  ];

  let session = null; // Declare session and initialize later

  try {
    session = await mongoose.startSession(); // Initialize session
    session.startTransaction();

    // UPDATE ORDER STATUS
    let statusUpdated = false;
    if (orderStatus) {
      if (!validStatuses.includes(orderStatus)) {
        throw new Error("Invalid order status. Please choose a valid status.");
      }

      if (order.orderStatus !== orderStatus) {
        statusUpdated = true; // Flag to determine if email notification is needed
      }

      order.orderStatus = orderStatus;

      if (orderStatus === "Shipped") {
        order.shippingInfo.shippedAt = Date.now();
      } else if (orderStatus === "Delivered") {
        order.deliveredAt = Date.now();
      } else if (orderStatus === "Cancelled") {
        order.cancelledAt = Date.now();
      }
    }

    // UPDATE SHIPPING INFO (MERGING NEW INFO)
    if (shippingInfo) {
      order.shippingInfo = {
        ...order.shippingInfo.toObject(),
        ...shippingInfo,
      };
    }

    // TRACK ADMIN/EMPLOYEE WHO MODIFIED THE ORDER
    order.updatedBy = req.user.user_id;

    // SAVE THE ORDER
    const updatedOrder = await order.save({ session });

    // Commit transaction
    await session.commitTransaction();

    // End session
    session.endSession();

    // SEND NOTIFICATION (IF STATUS UPDATED)
    if (statusUpdated) {
      const options = {
        to: order.user.email,
        subject: `Order #${order._id} Status Update`,
        html: getOrderUpdateEmailTemplate(
          order.user.name,
          order._id,
          order.orderStatus
        ),
      };
      sendEmail(options);
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    // Ensure session is defined before trying to abort the transaction
    if (session) {
      await session.abortTransaction(); // Abort if an error occurs
      session.endSession(); // End session
    }

    return next(
      new ErrorHandler(error.message || "Failed to update order", 500)
    );
  }
});
