import mongoose from "mongoose";

// Product Review Schema
const productReviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    media: [
      {
        type: String,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false, // Set to true if the user has purchased the product
    },
    isFlagged: {
      type: Boolean,
      default: false, // Flagged for admin review
    },
    reportedCount: {
      type: Number,
      default: 0, // Number of times flagged by users
    },
    helpfulVotes: {
      type: Number,
      default: 0, // Helpful votes for the review
    },
    unhelpfulVotes: {
      type: Number,
      default: 0, // Unhelpful votes for the review
    },
    lastModifiedAt: {
      type: Date,
      default: Date.now, // Time when the review was last edited
    },
    editedReviewText: {
      type: String,
      maxlength: 1000, // Store the new review text after it's edited
    },
    isEditted: {
      type: Boolean,
      default: false, // Track if the review is editted
    },
    replies: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // The user who replied
          required: true,
        },
        replyText: {
          type: String,
          required: true,
          maxlength: 1000, // Limit the reply text length
        },
        createdAt: {
          type: Date,
          default: Date.now, // Timestamp when the reply was created
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Static function: Get all reviews for a product with pagination
productReviewSchema.statics.getReviewsForProduct = async function (
  productId,
  page = 1,
  limit = 10
) {
  const skip = (page - 1) * limit;
  return await this.find({ product: productId })
    .skip(skip)
    .limit(limit)
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};

// Instance function: Edit the review (Allow editing only once)
productReviewSchema.methods.editReview = async function (newReviewText) {
  if (this.editCount >= 1) {
    throw new Error("You can only edit your review once.");
  }

  this.reviewText = newReviewText;
  this.editedReviewText = newReviewText;
  this.editCount += 1;
  this.lastModifiedAt = Date.now();
  await this.save();
};

// Instance function: Flag a review
productReviewSchema.methods.flagReview = async function () {
  this.isFlagged = true;
  this.reportedCount += 1;
  await this.save();
};

// Instance function: Vote as helpful
productReviewSchema.methods.voteHelpful = async function () {
  this.helpfulVotes += 1;
  await this.save();
};

// Instance function: Vote as unhelpful
productReviewSchema.methods.voteUnhelpful = async function () {
  this.unhelpfulVotes += 1;
  await this.save();
};

// Instance function: Add a reply to the review
productReviewSchema.methods.addReply = async function (userId, replyText) {
  const reply = {
    user: userId,
    replyText: replyText,
  };
  this.replies.push(reply);
  await this.save();
};

// Instance function: Mark review as verified
productReviewSchema.methods.verifyReview = async function () {
  this.isVerified = true;
  await this.save();
};

// Instance hook: Prevent editing if review is flagged or reported too many times
productReviewSchema.pre("save", function (next) {
  if (this.isFlagged || this.reportedCount >= 3) {
    return next(
      new Error("This review has been flagged and cannot be edited.")
    );
  }
  next();
});

// Instance hook: Prevent users from submitting multiple reviews for the same product
productReviewSchema.pre("save", async function (next) {
  const existingReview = await this.constructor.findOne({
    product: this.product,
    user: this.user,
  });

  if (existingReview && existingReview.isEditted === true) {
    return next(new Error("You can only submit one review per product."));
  }
  next();
});

// Create ProductReview model
const ProductReview = mongoose.model("ProductReview", productReviewSchema);

export default ProductReview;
