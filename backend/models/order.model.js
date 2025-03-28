import mongoose from "mongoose";

// Consolidate common status enums
const STATUS_ENUM = {
  ORDER: [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Pre-Order",
    "On Hold",
  ],
  PAYMENT: ["Pending", "Success", "Failed", "Refunded"],
  ITEM: ["Pending", "Shipped", "Delivered", "Cancelled"],
};

// Define the Order Schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
      lowercase: true,
      trim: true,
      immutable: true,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    orderItems: {
      type: [
        {
          _id: false,
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          color: {
            type: String,
          },
          includes: {
            type: String,
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          discount: {
            type: Number,
            default: 0,
          },
          discountedPrice: {
            type: Number,
            required: true,
          },
          image: {
            type: String,
          },
          isPreOrder: {
            type: Boolean,
            default: false,
          },
          availabilityDate: {
            type: Date,
          },
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
      paypalOrderId: { type: String },
      status: {
        type: String,
        enum: STATUS_ENUM.PAYMENT,
        default: "Pending",
      },
      payerEmail: { type: String },
      paidAt: { type: Date },
    },
    taxPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: STATUS_ENUM.ORDER,
      default: "Pending",
    },
    shippingInfo: {
      courier: {
        type: String,
        trim: true,
      },
      trackingNumber: {
        type: String,
        trim: true,
      },
      trackingLink: {
        type: String,
        trim: true,
      },
      additionalInfo: {
        type: String,
        trim: true,
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
    isReviewed: {
      type: Boolean,
      default: false,
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
  try {
    // Validate prices
    const prices = [this.totalPrice, this.taxPrice, this.shippingPrice];
    if (prices.some((price) => price < 0)) {
      throw new Error("Prices cannot be negative.");
    }

    // Calculate total price
    this.totalPrice = this.totalPrice + this.taxPrice + this.shippingPrice;

    const productModel = mongoose.model("Product");

    // If this is a new order (not cancelled), decrease stock
    if (this.isNew) {
      await Promise.all(
        this.orderItems.map(async (item) => {
          const product = await productModel.findById(item.product);
          if (!product) {
            throw new Error(`Product with ID ${item.product} does not exist.`);
          }

          if (!item.isPreOrder) {
            if (product.stock < item.quantity) {
              throw new Error(`Insufficient stock for product: ${item.name}`);
            }
            product.stock -= item.quantity;
            await product.save();
          }
        })
      );
    }

    // If order status is being changed to "Cancelled", restore stock
    if (this.isModified("orderStatus") && this.orderStatus === "Cancelled") {
      console.log("Restoring stock for cancelled order:", this._id);

      await Promise.all(
        this.orderItems.map(async (item) => {
          if (!item.isPreOrder) {
            const product = await productModel.findById(item.product);
            if (product) {
              console.log(
                `Restoring ${item.quantity} units to product ${product._id}`
              );
              product.stock += item.quantity;
              await product.save();
              console.log(
                `New stock for product ${product._id}: ${product.stock}`
              );
            }
          }
        })
      );
    }

    next();
  } catch (err) {
    next(err);
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
