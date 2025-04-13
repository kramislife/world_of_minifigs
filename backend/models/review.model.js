import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    _id: false, // Prevent generating unnecessary _id for replies
  }
);

const imageSchema = new mongoose.Schema(
  {
    public_id: String,
    url: String,
  },
  {
    _id: false, // Prevent generating unnecessary _id for images
  }
);

// Product Review Schema
const productReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    products: [
      {
        _id: false,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: String,
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        reviewText: {
          type: String,
          required: false,
        },
        images: [imageSchema],
        helpfulVotes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
        unhelpfulVotes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
        replies: [replySchema],
        isEdited: {
          type: Boolean,
          default: false,
        },
        editedAt: Date,
        editedReviewText: String,
        lastModifiedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
    reportedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// Remove _id from products array elements
productReviewSchema.set("toJSON", {
  transform: function (doc, ret) {
    if (ret.products) {
      ret.products = ret.products.map((product) => {
        const { _id, ...productWithoutId } = product;
        return productWithoutId;
      });
    }
    return ret;
  },
});

// Explicitly drop any existing indexes
const dropIndexes = async () => {
  try {
    const ProductReview = mongoose.model("ProductReview", productReviewSchema);
    await ProductReview.collection.dropIndexes();
  } catch (error) {
    console.log("No indexes to drop or collection doesn't exist yet");
  }
};

dropIndexes();

// Static function: Get all reviews for a product with pagination
productReviewSchema.statics.getReviewsForProduct = async function (
  productId,
  page = 1,
  limit = 10
) {
  const skip = (page - 1) * limit;
  return await this.find({ "products.product": productId })
    .skip(skip)
    .limit(limit)
    .populate("user", "name email")
    .populate("order")
    .sort({ createdAt: -1 });
};

// Instance function: Edit a product review
productReviewSchema.methods.editProductReview = async function (
  productId,
  newReviewText
) {
  const productReview = this.products.find(
    (p) => p.product.toString() === productId
  );

  if (!productReview) {
    throw new Error("Product review not found");
  }

  if (productReview.isEdited) {
    throw new Error("You can only edit your review once.");
  }

  productReview.reviewText = newReviewText;
  productReview.editedReviewText = newReviewText;
  productReview.isEdited = true;
  productReview.editedAt = Date.now();
  productReview.lastModifiedAt = Date.now();

  await this.save();
};

// Instance function: Flag a review
productReviewSchema.methods.flagReview = async function () {
  this.isFlagged = true;
  this.reportedCount += 1;
  await this.save();
};

// Instance function: Vote as helpful for a specific product review
productReviewSchema.methods.voteHelpful = async function (productId) {
  const productReview = this.products.find(
    (p) => p.product.toString() === productId
  );
  if (productReview) {
    productReview.helpfulVotes.push(this.user);
    await this.save();
  }
};

// Instance function: Vote as unhelpful for a specific product review
productReviewSchema.methods.voteUnhelpful = async function (productId) {
  const productReview = this.products.find(
    (p) => p.product.toString() === productId
  );
  if (productReview) {
    productReview.unhelpfulVotes.push(this.user);
    await this.save();
  }
};

// Instance function: Add a reply to the review
productReviewSchema.methods.addReply = async function (userId, replyText) {
  const reply = {
    user: userId,
    text: replyText,
  };
  this.products
    .find((p) => p.product.toString() === userId)
    .replies.push(reply);
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

// Add a pre-save hook to update isVerified
productReviewSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("user")) {
    try {
      const user = await mongoose.model("User").findById(this.user);
      if (user) {
        this.isVerified = user.is_verified;
      }
    } catch (error) {
      console.error("Error updating review verification status:", error);
    }
  }
  next();
});

// Create the model without any unique indexes
const ProductReview = mongoose.model("ProductReview", productReviewSchema);

export default ProductReview;
