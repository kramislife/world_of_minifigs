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
    icon: {
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

  // Check if key already exists
  const existingCategory = await mongoose
    .model("Category")
    .findOne({ key: this.key });
  if (existingCategory) {
    const error = new Error("Category Already Available.");
    return next(error);
  }

  next();
});

categorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // If the name is being updated, we need to update the key
  if (update.name) {
    update.name = update?.name?.trim(); // Trim the name
    update.key = update?.name?.toLowerCase().replace(/\s+/g, "_"); // Update the key
  }

  // Ensure that the key remains unique
  const existingCategory = await mongoose
    .model("Category")
    .findOne({ key: update.key });
  if (existingCategory) {
    const error = new Error("Category Already Available.");
    return next(error);
  }

  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
