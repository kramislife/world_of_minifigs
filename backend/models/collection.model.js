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
    isFeatured: {
      type: Boolean,
      default: false,
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
    return next(new Error("Collection with similar name already exists."));
  }
  next();
});

// Pre-update middleware to update 'key' if 'name' changes
collectionSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Only proceed with key check if name is being updated
  if (update.name) {
    update.name = update.name.trim();
    update.newKey = update.name.toLowerCase().trim().replace(/\s+/g, "_");

    // Get the current document
    const currentDoc = await this.model.findOne(this.getQuery());

    // Only check for uniqueness if the name is actually changing
    if (currentDoc.name !== update.name) {
      const existingCollection = await mongoose
        .model("Collection")
        .findOne({ key: update.newKey, _id: { $ne: currentDoc._id } });

      if (existingCollection) {
        return next(new Error("Collection with similar name already exists."));
      }
    }
  }

  next();
});

collectionSchema.index({ key: 1 });

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
