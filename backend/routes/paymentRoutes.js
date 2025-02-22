import express from "express";
import {
  processPayment,
  confirmPayment,
  getStripeApiKey,
  getPayPalClientId,
  processRefund,
} from "../controllers/paymentController.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Process payment
router.route("/payment/process").post(isAuthenticatedUser, processPayment);

// Confirm payment
router.route("/payment/confirm").post(isAuthenticatedUser, confirmPayment);

// Get Stripe API key
router.route("/stripeapikey").get(isAuthenticatedUser, getStripeApiKey);

// Get PayPal Client ID
router
  .route("/payment/paypal-credentials")
  .get(isAuthenticatedUser, getPayPalClientId);

// Process refund
router.route("/payment/refund").post(isAuthenticatedUser, processRefund);

export default router;
