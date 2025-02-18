import Stripe from "stripe";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Utills/customErrorHandler.js";
import Order from "../models/order.model.js";
import mongoose from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ------------------------------- Stripe Payment------------------------------------------------

// Get Stripe API Key
export const getStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// Create Payment Intent
export const processPayment = catchAsyncErrors(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) {
    return next(new ErrorHandler("Please provide amount", 400));
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        company: "BrickExtreme",
        user_id: req.user.user_id,
      },
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
      amount: amount,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Confirm Payment
export const confirmPayment = catchAsyncErrors(async (req, res, next) => {
  const { paymentIntentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      res.status(200).json({
        success: true,
        paymentIntent,
      });
    } else {
      return next(new ErrorHandler("Payment not completed", 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Process Refund
export const processRefund = catchAsyncErrors(async (req, res, next) => {
  const { orderId, reason } = req.body;

  if (!orderId) {
    return next(new ErrorHandler("Please provide order ID", 400));
  }

  try {
    // Get order details with populated product information
    const order = await Order.findById(orderId).populate("orderItems.product");

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    // Check if order is already cancelled
    if (order.orderStatus === "Cancelled") {
      return next(new ErrorHandler("Order is already cancelled", 400));
    }

    // Check if payment was made via Stripe
    if (order.paymentInfo.method !== "Stripe") {
      return next(
        new ErrorHandler("Refund only available for Stripe payments", 400)
      );
    }

    // Get payment intent ID from order
    const paymentIntentId = order.paymentInfo.transactionId;

    try {
      // Process refund through Stripe
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        reason: "requested_by_customer",
      });

      // Update order status and save to trigger stock restoration
      order.orderStatus = "Cancelled";
      order.cancellationReason = reason;
      order.cancelledAt = Date.now();
      order.paymentInfo.status = "Refunded";

      // Save the order to trigger the pre-save hook
      await order.save();

      // Verify stock restoration
      const productModel = mongoose.model("Product");
      for (const item of order.orderItems) {
        if (!item.isPreOrder) {
          const updatedProduct = await productModel.findById(item.product);
          console.log(
            `Verified stock for product ${updatedProduct._id}: ${updatedProduct.stock}`
          );
        }
      }

      res.status(200).json({
        success: true,
        message: "Order cancelled and payment refunded successfully",
        refund,
      });
    } catch (stripeError) {
      return next(
        new ErrorHandler(`Stripe Error: ${stripeError.message}`, 500)
      );
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// ------------------------------- PayPal Payment------------------------------------------------
// Get PayPal Client ID
export const getPayPalClientId = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    clientId: process.env.PAYPAL_CLIENT_ID,
  });
});
