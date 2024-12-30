import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    coupon_code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      match: [/^[A-Za-z0-9]+$/, "Coupon code must be alphanumeric."],
    },
    description: {
      type: String,
      required: [true, "Coupon description is required"],
    },
    discount_type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: [true, "Specify discount type (percentage or fixed)"],
    },
    discount_value: {
      type: Number,
      required: [true, "Enter discount value"],
      min: [0, "Discount value cannot be negative"],
      validate: {
        validator: function (value) {
          if (this.discount_type === "percentage") {
            return value >= 0 && value <= 100;
          }
          return true;
        },
        message: "For percentage discount, value must be between 0 and 100",
      },
    },
    expiration: {
      type: Date,
      default: null,
      validate: {
        validator: function (value) {
          if (value) {
            return value > Date.now();
          }
          return true;
        },
        message: "Expiration date must be in the future",
      },
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    usage_count: {
      type: Number,
      default: 0,
    },
    minimum_purchase_amount: {
      type: Number,
      min: [0, "Minimum purchase amount cannot be negative"],
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [false, "User ID is required for each category"],
      immutable: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [false, "User ID is required for each category"],
    },
  },
  { timestamps: true }
);

// Create an index for fast lookups by coupon code
couponSchema.index({ coupon_code: 1 });

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
