import express from "express";
import {
  forgotPassword,
  getCurrentUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateCurrentUserPassword,
  updateCurrentUserProfile,
  verifyUser,
} from "../controllers/authController.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/verify_user").get(verifyUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/profile/me").get(isAuthenticatedUser, getCurrentUserProfile);
router
  .route("/me/profile/updatePassword")
  .put(isAuthenticatedUser, updateCurrentUserPassword);
router
  .route("/me/profile/updateProfile")
  .put(isAuthenticatedUser, updateCurrentUserProfile);

export default router;
