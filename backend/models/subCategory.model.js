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
      validate: {
        validator: function (value) {
          return /^[0-9]{3}$/.test(value);
        },
        message: "Popularity ID must be a 3-digit number (001-999)",
      },
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
    this.name = this.name.trim().replace(/\s+/g, " ");
    if (!this.key) {
      const formattedName = this.name.toLowerCase().replace(/\s+/g, "_");
      this.key = `${formattedName}_${this.category.toString()}`;
    }
  }

  // Format popularityId to ensure 3 digits
  if (this.popularityId) {
    this.popularityId = this.popularityId.toString().padStart(3, "0");
  }

  // Check for unique constraints
  const existingSubCategory = await mongoose.model("SubCategory").findOne({
    $or: [{ key: this.key }, { popularityId: this.popularityId }],
  });

  if (existingSubCategory) {
    if (existingSubCategory.popularityId === this.popularityId) {
      return next(
        new Error(
          `Popularity ID ${this.popularityId} is already in use. Please choose a different number.`
        )
      );
    }
    if (existingSubCategory.key === this.key) {
      return next(
        new Error(
          "SubCategory with similar name already exists in this category."
        )
      );
    }
  }
  next();
});

// Pre-update middleware to update 'key' if 'name' changes
subCategorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.name && update.category) {
    update.name = update.name.trim().replace(/\s+/g, " ");
    const formattedName = update.name.toLowerCase().replace(/\s+/g, "_");
    update.key = `${formattedName}_${update.category.toString()}`;
  }

  if (update.popularityId) {
    update.popularityId = update.popularityId.toString().padStart(3, "0");
  }

  const docId = this.getQuery()._id;

  const existingSubCategory = await mongoose.model("SubCategory").findOne({
    _id: { $ne: docId },
    $or: [{ key: update.key }, { popularityId: update.popularityId }],
  });

  if (existingSubCategory) {
    if (existingSubCategory.popularityId === update.popularityId) {
      return next(
        new Error(
          `Popularity ID ${update.popularityId} is already in use. Please choose a different number.`
        )
      );
    }
    if (existingSubCategory.key === update.key) {
      return next(
        new Error(
          "SubCategory with similar name already exists in this category."
        )
      );
    }
  }
  next();
});

subCategorySchema.index({ key: 1 });
subCategorySchema.index({ category: 1 });

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
