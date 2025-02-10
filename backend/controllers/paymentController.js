import Stripe from "stripe";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Utills/customErrorHandler.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

// Get Stripe API Key
export const getStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// Process Refund
export const processRefund = catchAsyncErrors(async (req, res, next) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    return next(new ErrorHandler("Payment Intent ID is required", 400));
  }

  try {
    // Create refund
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
    });

    if (refund.status === 'succeeded') {
      res.status(200).json({
        success: true,
        message: "Refund processed successfully",
        refund,
      });
    } else {
      return next(new ErrorHandler("Refund could not be processed", 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
