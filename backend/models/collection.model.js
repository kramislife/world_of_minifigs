import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Collection name is required"],
      unique: true,
    },
    key: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      default: "",
      maxlength: [500, "Description can't exceed 500 characters"],
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
        validate: {
          validator: function (value) {
            return /^https?:\/\/.*\.(jpg|jpeg|png|gif|svg)$/i.test(value); // Validates URLs for image files
          },
          message: "URL must be a valid image URL.",
        },
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      immutable: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Pre-save middleware to generate and validate 'key'
collectionSchema.pre("save", async function (next) {
  if (this.name) {
    this.name = this.name.trim();
    if (!this.key) {
      this.key = this.name.toLowerCase().replace(/\s+/g, "_");
    }
  }

  // Check for unique key constraint
  const existingCollection = await mongoose
    .model("Collection")
    .findOne({ key: this.key });
  if (existingCollection) {
    return next(new Error("Collection key must be unique."));
  }
  next();
});

// Pre-update middleware to update 'key' if 'name' changes
collectionSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Update the 'key' based on the new 'name' if provided
  if (update.name) {
    update.name = update.name.trim();
    update.key = update.name.toLowerCase().trim().replace(/\s+/g, "_");
  }

  // Ensure uniqueness of the updated key
  const existingCollection = await mongoose
    .model("Collection")
    .findOne({ key: update.key });
  if (existingCollection) {
    return next(new Error("Collection key must be unique."));
  }

  next();
});

collectionSchema.index({ key: 1 });

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
