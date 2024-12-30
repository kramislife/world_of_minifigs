import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import ProductReview from "../models/review.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";

export const createNewReview = catchAsyncErrors(async (req, res, next) => {
  // CHECK FOR REVIEW EXISTANCE

  const { rating, comment } = req.body;
  if (!rating && !comment) {
    return next(new ErrorHandler("Please provide a rating or a comment", 400));
  }

  //CHECK FOR PRODUCT ID
  const productId = req.params.productId;

  if (!productId) {
    return next(new ErrorHandler("Please provide a product id", 400));
  }

  //CHECK IF USER IS LOGGED IN
  if (!req.user) {
    return next(
      new ErrorHandler("You must be logged in to review a product", 401)
    );
  }

  // CHECK IF REVIEW EXIST
  const existingReview = await ProductReview.findOne({
    product: productId,
    user: req.user.user_id,
  });

  if (existingReview) {
    console.log("REVIEW => ", existingReview);
    return next(
      new ErrorHandler(
        "You have already reviewed this product. Please update your existing review instead.",
        400
      )
    );
  }

  //FIND ORDER WITH THE PROVIDED USER ID AND PRODUCT ID TO CHECK IF THE USER PURCHASED THE ORDER
  const [order] = await Order.find({
    user: req.user.user_id,
    "orderItems.product": productId,
    orderStatus: "Delivered",
  });

  if (!order) {
    return next(
      new ErrorHandler(
        "You can only review a product after it has been delivered.",
        403
      )
    );
  }

  const newReview = new ProductReview({
    product: productId,
    user: req.user.user_id,
    rating,
    reviewText: comment,
  });

  await newReview.save();

  await Product.findByIdAndUpdate(productId, {
    $push: { reviews: newReview._id },
  });

  res.status(200).json({
    success: true,
    newReview,
  });
});

//------------------------------- GET ALL REVIEWS --------------------------------------------
export const getReviewsSingleProduct = catchAsyncErrors(
  async (req, res, next) => {
    console.log("In getReviewsSingleProduct");

    const productId = req.params.productId;
    console.log("GET REVIEWS", productId);

    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const reviews = await ProductReview.find({ product: productId })
      .select("reviewText user isEditted")
      .populate("user", "name email")
      .skip(skip)
      .limit(limit);

    const totalReviews = await ProductReview.countDocuments({
      product: productId,
    });

    res.status(200).json({
      success: true,
      message: `${totalReviews} Reviews fetched successfully`,
      reviews,
      totalReviews,
      countPage: page,
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
