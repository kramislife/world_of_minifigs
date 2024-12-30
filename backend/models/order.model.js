import mongoose from "mongoose";

// Define the Order Schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    billingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    }, // Optional
    orderItems: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          name: {
            type: String,
            required: true,
          }, // Snapshot of product name
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          }, // Snapshot of product price
          image: {
            type: String,
          }, // Snapshot of product thumbnail
          status: {
            type: String,
            enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
          },
          isPreOrder: {
            type: Boolean,
            default: false,
          }, // Pre-order support
          availabilityDate: {
            type: Date,
          }, // When pre-order items are available
        },
      ],
      validate: [
        (array) => array.length > 0,
        "Order must contain at least one item",
      ],
    },
    paymentInfo: {
      method: {
        type: String,
        enum: ["COD", "Stripe", "PayPal"],
        required: true,
      },
      transactionId: { type: String },
      status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending",
      },
      paidAt: { type: Date },
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
    taxPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Pre-Order",
        "On Hold",
      ],
      default: "Pending",
    },
    shippingInfo: {
      courier: {
        type: String,
      },
      trackingNumber: {
        type: String,
      },
      shippedAt: {
        type: Date,
      },
    },
    deliveredAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
    orderNotes: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["Normal", "High", "Urgent"],
      default: "Normal",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ---------------------- Virtual Fields ----------------------
orderSchema.virtual("totalItems").get(function () {
  return this.orderItems.reduce((sum, item) => sum + item.quantity, 0);
});

// ---------------------- Pre-Save Hook to Calculate Total Price ----------------------
orderSchema.pre("save", async function (next) {
  // Ensure prices are non-negative
  if (
    this.itemsPrice < 0 ||
    this.taxPrice < 0 ||
    this.shippingPrice < 0 ||
    this.discountPrice < 0
  ) {
    throw new Error("Prices cannot be negative.");
  }
  // Calculate total price
  this.totalPrice =
    this.itemsPrice + this.taxPrice + this.shippingPrice - this.discountPrice;

  const productModel = mongoose.model("Product");

  try {
    // Check stock and validate pre-order items
    for (const item of this.orderItems) {
      const product = await productModel.findById(item.product);
      if (!product) {
        throw new Error(`Product with ID ${item.product} does not exist.`);
      }

      if (!item.isPreOrder && product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${item.name}`);
      }

      if (
        item.isPreOrder &&
        (!item.availabilityDate || item.availabilityDate < new Date())
      ) {
        throw new Error(
          `Pre-order items must have a valid future availability date. Problem with item: ${item.name}`
        );
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

// --------------------- Deduct Stock After Order is Placed ---------------------
orderSchema.post("save", async function () {
  const productModel = mongoose.model("Product");
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    for (const item of this.orderItems) {
      if (!item.isPreOrder) {
        await productModel.findByIdAndUpdate(
          item.product,
          { $inc: { stock: -item.quantity } },
          { session }
        );
      }
    }
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw new Error(`Error updating stock: ${err.message}`);
  } finally {
    session.endSession();
  }
});

// --------------------- Indexes for Optimized Queries ---------------------
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ "orderItems.isPreOrder": 1, createdAt: -1 });
orderSchema.index({ isDeleted: 1, createdAt: -1 });

// --------------------- Default Populate ---------------------
orderSchema.pre(/^find/, function () {
  this.populate("user")
    .populate("shippingAddress")
    .populate("orderItems.product");
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
