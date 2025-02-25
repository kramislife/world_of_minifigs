import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
    },
    key: {
      type: String,
      unique: true,
    },
    popularityId: {
      type: String,
      unique: true,
      required: [true, "Popularity ID is required"],
      validate: {
        validator: function (value) {
          // Validates that the value is a 3-digit number string between 001-999
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
        match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, "Invalid image URL"],
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required for each category"],
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

categorySchema.pre("save", async function (next) {
  if (this.name && !this.key) {
    this.name = this.name.trim();
    this.key = this.name.toLowerCase().trim().replace(/\s+/g, "_");
  }

  // Format popularityId to ensure 3 digits
  if (this.popularityId) {
    this.popularityId = this.popularityId.toString().padStart(3, "0");
  }

  // Check if key already exists
  const existingCategory = await mongoose.model("Category").findOne({
    $or: [{ key: this.key }, { popularityId: this.popularityId }],
  });

  if (existingCategory) {
    if (existingCategory.key === this.key) {
      return next(new Error("Category with similar name already exists."));
    }
    if (existingCategory.popularityId === this.popularityId) {
      return next(
        new Error("Category with this popularity ID already exists.")
      );
    }
  }
  next();
});

categorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // If the name is being updated, we need to update the key
  if (update.name) {
    update.name = update?.name?.trim();
    update.key = update?.name?.toLowerCase().replace(/\s+/g, "_");
  }

  // Format popularityId if it's being updated
  if (update.popularityId) {
    update.popularityId = update.popularityId.toString().padStart(3, "0");
  }

  // Get the current document ID
  const docId = this.getQuery()._id;

  // Check for unique constraints
  const existingCategory = await mongoose.model("Category").findOne({
    _id: { $ne: docId },
    $or: [{ key: update.key }, { popularityId: update.popularityId }],
  });

  if (existingCategory) {
    if (existingCategory.key === update.key) {
      return next(new Error("Category with similar name already exists."));
    }
    if (existingCategory.popularityId === update.popularityId) {
      return next(
        new Error("Category with this popularity ID already exists.")
      );
    }
  }

  next();
});

categorySchema.index({ key: 1 });

const Category = mongoose.model("Category", categorySchema);

export default Category;
