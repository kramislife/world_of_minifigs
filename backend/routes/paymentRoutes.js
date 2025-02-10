import express from "express";
import {
  processPayment,
  confirmPayment,
  getStripeApiKey,
  processRefund,
} from "../controllers/paymentController.js";
import { isAuthenticatedUser, isAuthorizedUser } from "../middlewares/auth.middleware.js";
import { userRoles } from "../Utills/Roles.js";

const router = express.Router();

// Process payment
router.route("/payment/process").post(isAuthenticatedUser, processPayment);

// Confirm payment
router.route("/payment/confirm").post(isAuthenticatedUser, confirmPayment);

// Get Stripe API key
router.route("/stripeapikey").get(isAuthenticatedUser, getStripeApiKey);

// Process refund
router.post(
  "/payment/refund",
  isAuthenticatedUser,
  isAuthorizedUser(userRoles.SUPER_ADMIN, userRoles.ADMIN, userRoles.EMPLOYEE),
  processRefund
);

export default router;
