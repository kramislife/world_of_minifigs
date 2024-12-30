import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [200, "Product name cannot be more than 200 characters"],
      trim: true,
    },
    key: {
      type: String,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      min: [0, "Price cannot be negative"],
      validate: {
        validator: (v) => /^\d+(\.\d{1,2})?$/.test(v),
        message: "Price must have at most 2 decimal places",
      },
    },
    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot be more than 100%"],
    },
    product_description_1: {
      type: String,
      required: [true, "Please enter product description"],
    },
    product_description_2: String,
    product_description_3: String,
    product_images: [
      {
        public_id: { type: String },
        url: {
          type: String,
          match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, "Invalid image URL"],
        },
      },
    ],
    product_category: [
      {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    product_collection: [
      {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    product_piece_count: {
      type: Number,
      required: [true, "Please enter product piece count"],
      min: [1, "Product piece count must be at least 1"],
    },
    product_availability: Date,
    product_length: {
      type: Number,
      required: [true, "Please enter product length"],
      min: [0, "Length cannot be negative"],
      validate: {
        validator: (v) => /^\d+(\.\d{1,2})?$/.test(v),
        message: "Length must have at most 2 decimal places",
      },
    },
    product_width: {
      type: Number,
      required: [true, "Please enter product width"],
      min: [0, "Width cannot be negative"],
      validate: {
        validator: (v) => /^\d+(\.\d{1,2})?$/.test(v),
        message: "Width must have at most 2 decimal places",
      },
    },
    product_height: {
      type: Number,
      required: [true, "Please enter product height"],
      min: [0, "Height cannot be negative"],
      validate: {
        validator: (v) => /^\d+(\.\d{1,2})?$/.test(v),
        message: "Height must have at most 2 decimal places",
      },
    },
    product_includes: {
      type: String,
      required: [true, "Please enter what's included with the product"],
    },
    product_skill_level: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkillLevel",
    },
    product_designer: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designer",
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    seller: String,
    tags: {
      type: [String],
      validate: {
        validator: function (tags) {
          return tags.length <= 10;
        },
        message: "Only 10 tags are allowed",
      },
    },
    stock: {
      type: Number,
      required: [true, "Please enter how many items are available in stock"],
      min: [0, "Stock cannot be negative"],
      default: 1,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
    manufacturer: String,
    is_preorder: {
      type: Boolean,
      default: false,
    },
    preorder_availability_date: {
      type: Date,
      required: function () {
        return this.is_preorder;
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [false, "Only Employees or Admins can create products"],
      immutable: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [false, "Only Employee or Admin can update products"],
    },
    product_color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: [true, "Please specify the product color"],
    },
  },
  { timestamps: true }
);

// ----------------------------------- PRE-SAVE HOOK TO GENERATE PRODUCT KEY -----------------------------------

productSchema.pre("save", async function (next) {
  if (this.product_name && !this.key) {
    this.product_name = this.product_name.trim();
    this.key = this.product_name.toLowerCase().trim().replace(/\s+/g, "_");
  }

  // ---------------------------------- CHECK FOR UNIQUE KEY CONSTRAINT -----------------------------------------------

  const existingProduct = await mongoose
    .model("Product")
    .findOne({ key: this.key });
  if (existingProduct) {
    return next(new Error("Product key must be unique."));
  }
  next();
});

// -------------------------------------- PRE-UPDATE HOOK TO CHECK FOR UNIQUE KEY DURING UPDATE ---------------------------------------------------------

productSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.product_name) {
    update.key = update.product_name.toLowerCase().trim().replace(/\s+/g, "_");

    // ------------------------------------------- CHECK IF THE KEY IS UNIQUE -------------------------------------------------------------
    const existingProduct = await mongoose
      .model("Product")
      .findOne({ key: update.key, _id: { $ne: this.getQuery()._id } });
    if (existingProduct) {
      return next(new Error("Product key must be unique."));
    }
  }
  next();
});

// ---------------------------------- EXPORT PRODUCT MODEL -------------------------------------------------

const Product = mongoose.model("Product", productSchema);

export default Product;
