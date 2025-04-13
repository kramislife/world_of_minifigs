import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import ProductReview from "../models/review.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";
import User from "../models/user.model.js";
import { uploadImage, deleteImage } from "../Utills/cloudinary.js";

export const createNewReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { order: orderId, products } = req.body;

    if (!orderId || !products || !products.length) {
      return next(new ErrorHandler("Please provide review data", 400));
    }

    // Get user details including verification status
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Process images for each product review
    const processedProducts = await Promise.all(
      products.map(async (product) => {
        let uploadedImages = [];

        // Handle image uploads if present
        if (product.images && product.images.length > 0) {
          if (product.images.length > 3) {
            return next(
              new ErrorHandler("Maximum 3 images allowed per review", 400)
            );
          }

          // Upload each image to Cloudinary
          uploadedImages = await Promise.all(
            product.images.map(async (base64Image) => {
              try {
                const uploadedImage = await uploadImage(
                  base64Image,
                  "world_of_minifigs/reviews"
                );
                return {
                  public_id: uploadedImage.public_id,
                  url: uploadedImage.url,
                };
              } catch (error) {
                console.error("Error uploading image:", error);
                throw new ErrorHandler("Failed to upload image", 500);
              }
            })
          );
        }

        return {
          product: product.product,
          productName: product.productName,
          rating: product.rating,
          reviewText: product.reviewText,
          images: uploadedImages,
        };
      })
    );

    // Create the review with processed images
    const review = await ProductReview.create({
      user: req.user.user_id,
      order: orderId,
      products: processedProducts,
      isVerified: user.is_verified, // Set isVerified based on user's verification status
    });

    // Mark the order as reviewed
    await Order.findByIdAndUpdate(orderId, { isReviewed: true });

    // Update product ratings
    for (const product of processedProducts) {
      await Product.findByIdAndUpdate(product.product, {
        $push: { reviews: review._id },
      });
    }

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return next(new ErrorHandler(error.message, 500));
  }
});

//------------------------------- GET ALL REVIEWS --------------------------------------------
export const getReviewsSingleProduct = catchAsyncErrors(
  async (req, res, next) => {
    const productId = req.params.productId;

    // Get all reviews for this product
    const reviews = await ProductReview.find({
      "products.product": productId,
    })
      .populate("user", "name email is_verified avatar")
      .populate({
        path: "products.replies.user",
        select: "name is_verified avatar",
      })
      .sort({ createdAt: -1 });

    if (!reviews) {
      return next(new ErrorHandler("No reviews found", 404));
    }

    // Calculate review statistics for star
    let totalRating = 0;
    let validReviewCount = 0;

    reviews.forEach((review) => {
      review.products.forEach((prod) => {
        if (prod.product.toString() === productId) {
          totalRating += prod.rating;
          validReviewCount++;
        }
      });
    });

    // Calculate rating distribution
    const distribution = Array(5).fill(0);
    reviews.forEach((review) => {
      review.products.forEach((prod) => {
        if (prod.product.toString() === productId) {
          distribution[5 - prod.rating]++;
        }
      });
    });

    // Create stats object
    const stats = {
      averageRating:
        validReviewCount > 0 ? (totalRating / validReviewCount).toFixed(1) : 0,
      totalReviews: validReviewCount,
      distribution: distribution,
    };

    res.status(200).json({
      success: true,
      reviews,
      stats,
    });
  }
);

//------------------------------- UPDATE REVIEW---------------------------------

export const updateProductReview = catchAsyncErrors(async (req, res, next) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  // Validate Input
  if (!rating && !comment) {
    return next(new ErrorHandler(400, "Please provide rating or comment"));
  }

  if (comment && comment.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: "Please provide a longer comment.",
    });
  }

  if (rating && (rating < 1 || rating > 5)) {
    return next(new ErrorHandler(400, "Rating must be between 1 and 5"));
  }

  const review = await ProductReview.findById(reviewId);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found.",
    });
  }

  // Authorization
  if (review.user.toString() !== req.user.user_id.toString()) {
    return res.status(403).json({
      success: false,
      message: "You can only edit your own reviews.",
    });
  }

  // Restrict Multiple Edits
  if (review.isEditted) {
    return res.status(400).json({
      success: false,
      message: "You can only edit your review once.",
    });
  }

  // Update Review
  review.rating = rating;
  review.comment = comment;
  review.isEditted = true;

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review updated successfully.",
    data: review,
  });
});

// Get review by order ID
export const getReviewByOrderId = catchAsyncErrors(async (req, res, next) => {
  const review = await ProductReview.findOne({
    order: req.params.orderId,
    user: req.user.user_id,
  });

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  res.status(200).json({
    success: true,
    review,
  });
});

// Update review
export const updateReview = catchAsyncErrors(async (req, res, next) => {
  const review = await ProductReview.findOne({
    _id: req.params.id,
    user: req.user.user_id,
  });

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  const { products } = req.body;

  // Process each product's updates
  for (const updatedProduct of products) {
    const productReview = review.products.find(
      (p) => p.product.toString() === updatedProduct.product
    );

    if (productReview) {
      // Handle new images if any
      if (updatedProduct.images && updatedProduct.images.length > 0) {
        const uploadedImages = await Promise.all(
          updatedProduct.images.map(async (base64Image) => {
            const uploadedImage = await uploadImage(
              base64Image,
              "world_of_minifigs/reviews"
            );
            return {
              public_id: uploadedImage.public_id,
              url: uploadedImage.url,
            };
          })
        );

        productReview.images = uploadedImages;
      }

      // Update other fields
      productReview.rating = updatedProduct.rating;
      productReview.reviewText = updatedProduct.reviewText;
      productReview.isEdited = true;
      productReview.editedAt = Date.now();
    }
  }

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    review,
  });
});

// Vote on a review
export const voteReview = catchAsyncErrors(async (req, res, next) => {
  const { reviewId, productId, voteType } = req.body;

  const review = await ProductReview.findById(reviewId);
  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  // Check if user is trying to vote on their own review
  if (review.user.toString() === req.user.user_id.toString()) {
    return next(new ErrorHandler("You cannot vote on your own review", 403));
  }

  const user = await User.findById(req.user.user_id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!user.is_verified) {
    return next(
      new ErrorHandler("Only verified users can vote on reviews", 403)
    );
  }

  const productReview = review.products.find(
    (p) => p.product.toString() === productId
  );

  if (!productReview) {
    return next(new ErrorHandler("Product review not found", 404));
  }

  const userId = req.user.user_id;

  // Remove user from both arrays first
  productReview.helpfulVotes = productReview.helpfulVotes.filter(
    (id) => id.toString() !== userId.toString()
  );
  productReview.unhelpfulVotes = productReview.unhelpfulVotes.filter(
    (id) => id.toString() !== userId.toString()
  );

  // Add vote to appropriate array
  if (voteType === "helpful") {
    productReview.helpfulVotes.push(userId);
  } else if (voteType === "unhelpful") {
    productReview.unhelpfulVotes.push(userId);
  }

  await review.save();

  res.status(200).json({
    success: true,
    message: "Vote recorded successfully",
    helpfulCount: productReview.helpfulVotes.length,
    unhelpfulCount: productReview.unhelpfulVotes.length,
  });
});

// Add reply to review
export const addReplyToReview = catchAsyncErrors(async (req, res, next) => {
  const { reviewId, productId, text } = req.body;

  const user = await User.findById(req.user.user_id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!user.is_verified) {
    return next(
      new ErrorHandler("Only verified users can reply to reviews", 403)
    );
  }

  const review = await ProductReview.findById(reviewId);
  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  const productReview = review.products.find(
    (p) => p.product.toString() === productId
  );

  if (!productReview) {
    return next(new ErrorHandler("Product review not found", 404));
  }

  productReview.replies.push({
    user: req.user.user_id,
    text,
  });

  await review.save();

  // Fetch the updated review with populated user data
  const populatedReview = await ProductReview.findById(reviewId)
    .populate("user", "name email is_verified avatar")
    .populate({
      path: "products.replies.user",
      select: "name is_verified avatar",
    });

  const updatedProductReview = populatedReview.products.find(
    (p) => p.product.toString() === productId
  );

  res.status(200).json({
    success: true,
    message: "Reply added successfully",
    replies: updatedProductReview.replies,
  });
});

// Get all reviews (Admin)
export const getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const reviews = await ProductReview.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    reviews,
  });
});
