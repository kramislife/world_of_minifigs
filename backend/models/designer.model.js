import mongoose from "mongoose";

// Define the Designer schema
const designerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Designer name is required"],
      unique: true,
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot be more than 500 characters"],
    },
    social_links: {
      instagram: {
        type: String,
        match: [
          /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/,
          "Invalid Instagram URL",
        ],
      },
    },
    profile_picture: {
      public_id: { type: String },
      url: {
        type: String,
        match: [
          /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|svg)$/i,
          "Invalid image URL",
        ],
      },
    },
    key: {
      type: String,
      unique: true,
      match: [
        /^[a-z0-9_]+$/,
        "Key must be in lowercase and contain only letters, numbers, and underscores",
      ],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
      immutable: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:[true, "Updated by is required"],
    },
  },
  { timestamps: true }
);

// Pre-save middleware to trim fields, generate 'key' from 'name', and ensure uniqueness
designerSchema.pre("save", async function (next) {
  // Trim all string fields
  for (const field in this.toObject()) {
    if (typeof this[field] === "string") {
      this[field] = this[field].trim();
    }
  }

  // Generate the key if it's not already set
  if (this.name && !this.key) {
    this.key = this.name.toLowerCase().replace(/\s+/g, "_");
  }

  // Check if key already exists in other documents
  const existingDesigner = await mongoose
    .model("Designer")
    .findOne({ key: this.key });
  if (existingDesigner) {
    return next(new Error("Designer key must be unique."));
  }

  next();
});

// Pre-update middleware to trim fields, update 'key' if 'name' changes, and ensure uniqueness
designerSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Trim all string fields in the update object
  for (const field in update) {
    if (typeof update[field] === "string") {
      update[field] = update[field].trim();
    }
  }

  // Update the 'key' if 'name' is being updated
  if (update.name) {
    update.key = update.name.toLowerCase().replace(/\s+/g, "_");
  }

  // Ensure the updated key is unique
  const existingDesigner = await mongoose
    .model("Designer")
    .findOne({ key: update.key });
  if (existingDesigner) {
    return next(new Error("Designer key must be unique."));
  }

  next();
});

// Create the Designer model based on the schema
const Designer = mongoose.model("Designer", designerSchema);

export default Designer;
