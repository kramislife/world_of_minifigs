import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";
import {
  createNewReview,
  getReviewsSingleProduct,
  updateProductReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.route("/reviews").get(isAuthenticatedUser, createNewReview);

// --------------------------------------------- ADMIN ROUTES --------------------------------------------- //

// 1. Create a new review for a product (Customer)
router.route("/reviews/:productId").post(isAuthenticatedUser, createNewReview);

// 2. Update a review (Customer)
router
  .route("/reviews/:reviewId")
  .put(isAuthenticatedUser, updateProductReview);

// 3. Get all reviews for a product (Customer)
router
  .route("/reviews/:productId")
  .get(isAuthenticatedUser, getReviewsSingleProduct);

// // 4. Delete a review (Customer)
// router.delete('/reviews/:reviewId', isAuthenticatedUser, deleteProductReview);

// // Admin Routes for Product Reviews

// // 1. Admin: Get all reviews (with pagination)
// router.get('/admin/reviews', isAuthenticatedUser, isAuthorizedUser('ADMIN'), getAllReviews);

// // 2. Admin: Flag a review (inappropriate content)
// router.put('/admin/reviews/flag/:reviewId', isAuthenticatedUser, isAuthorizedUser('ADMIN'), flagReview);

// // 3. Admin: Approve a flagged review
// router.put('/admin/reviews/approve/:reviewId', isAuthenticatedUser, isAuthorizedUser('ADMIN'), approveReview);

// // 4. Admin: Reject a flagged review (Delete)
// router.delete('/admin/reviews/reject/:reviewId', isAuthenticatedUser, isAuthorizedUser('ADMIN'), rejectReview);

// // 5. Admin: View all flagged reviews
// router.get('/admin/reviews/flagged', isAuthenticatedUser, isAuthorizedUser('ADMIN'), getFlaggedReviews);

export default router;
