import express from "express";
import {
  processPayment,
  confirmPayment,
  getStripeApiKey,
} from "../controllers/paymentController.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Process payment
router.route("/payment/process").post(isAuthenticatedUser, processPayment);

// Confirm payment
router.route("/payment/confirm").post(isAuthenticatedUser, confirmPayment);

// Get Stripe API key
router.route("/stripeapikey").get(isAuthenticatedUser, getStripeApiKey);

export default router;
