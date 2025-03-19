import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";
import {
  createNewReview,
  getReviewsSingleProduct,
  updateReview,
  getReviewByOrderId,
  voteReview,
  addReplyToReview,
  getAllReviews,
} from "../controllers/reviewController.js";
import { isAuthorizedUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a new review
router.route("/order/reviews").post(isAuthenticatedUser, createNewReview);

// Get reviews for a product
router.route("/reviews/:productId").get(getReviewsSingleProduct);

router.route("/reviews/:id").put(isAuthenticatedUser, updateReview);
router
  .route("/reviews/order/:orderId")
  .get(isAuthenticatedUser, getReviewByOrderId);

router.post("/reviews/vote", isAuthenticatedUser, voteReview);
router.post("/reviews/reply", isAuthenticatedUser, addReplyToReview);

router
  .route("/admin/reviews")
  .get(
    isAuthenticatedUser,
    isAuthorizedUser("admin", "superAdmin"),
    getAllReviews
  );

export default router;
