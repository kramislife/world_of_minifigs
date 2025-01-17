import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "SubCategory name is required"],
      trim: true,
    },
    key: {
      type: String,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category ID is required"],
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
        match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, "Invalid image URL"],
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required for each subcategory"],
      immutable: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Middleware for generating `key` for SubCategory
subCategorySchema.pre("save", async function (next) {
  if (this.name && this.category && !this.key) {
    this.name = this.name.trim().replace(/\s+/g, " ");
    this.key = `${this.name
      .toLowerCase()
      .replace(/\s+/g, "_")}_${this.category.toString()}`;
  }

  // Check for unique key within the same category
  const existingSubCategory = await mongoose
    .model("SubCategory")
    .findOne({ key: this.key, category: this.category });
  if (existingSubCategory) {
    return next(
      new Error("SubCategory key must be unique within the category.")
    );
  }
  next();
});

// Middleware for validating key uniqueness during updates
subCategorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.name && update.category) {
    update.name = update.name.trim().replace(/\s+/g, " "); // Replace multiple spaces with a single space
    update.key = `${update.name
      .toLowerCase()
      .replace(/\s+/g, "_")}_${update.category.toString()}`;
  }

  const existingSubCategory = await mongoose
    .model("SubCategory")
    .findOne({ key: update.key, category: this.getQuery().category });
  if (existingSubCategory) {
    return next(
      new Error("SubCategory key must be unique within the category.")
    );
  }
  next();
});

// Indexing for efficient queries
subCategorySchema.index({ key: 1, category: 1 });

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
