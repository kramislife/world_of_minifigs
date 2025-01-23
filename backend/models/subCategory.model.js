import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "SubCategory name is required"],
      trim: true,
      maxlength: [100, "SubCategory name can't exceed 100 characters"],
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
    popularityId: {
      type: String,
      unique: true,
      required: [true, "Popularity ID is required"],
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
        validate: {
          validator: function (value) {
            return /^https?:\/\/.*\.(jpg|jpeg|png|gif|svg)$/i.test(value);
          }, // Validates URLs for image files
          message: "URL must be a valid image URL.",
        },
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category ID is required"],
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

// Pre-save middleware to generate 'key' for SubCategory
subCategorySchema.pre("save", async function (next) {
  if (this.name && this.category) {
    this.name = this.name.trim().replace(/\s+/g, " "); // Replace multiple spaces with a single space
    if (!this.key) {
      const formattedName = this.name.toLowerCase().replace(/\s+/g, "_");
      this.key = `${formattedName}_${this.category.toString()}`;
    }
  }

  // Check for unique key constraint
  const existingSubCategory = await mongoose
    .model("SubCategory")
    .findOne({ key: this.key });
  if (existingSubCategory) {
    return next(
      new Error(
        "SubCategory with similar name already exists in this category."
      )
    );
  }
  next();
});

// Pre-update middleware to update 'key' if 'name' changes
subCategorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.name && update.category) {
    update.name = update.name.trim().replace(/\s+/g, " "); // Normalize spaces
    const formattedName = update.name.toLowerCase().replace(/\s+/g, "_");
    update.key = `${formattedName}_${update.category.toString()}`;
  }

  const existingSubCategory = await mongoose
    .model("SubCategory")
    .findOne({ key: update.key });
  if (existingSubCategory) {
    return next(
      new Error(
        "SubCategory with similar name already exists in this category."
      )
    );
  }
  next();
});

subCategorySchema.index({ key: 1 });

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
