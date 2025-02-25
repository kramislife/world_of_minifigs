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

  // Format popularityId to ensure 3 digits
  if (this.popularityId) {
    this.popularityId = this.popularityId.toString().padStart(3, "0");
  }

  // Check for unique constraints
  const existingCollection = await mongoose.model("Collection").findOne({
    $or: [{ key: this.key }, { popularityId: this.popularityId }],
  });

  if (existingCollection) {
    if (existingCollection.popularityId === this.popularityId) {
      return next(
        new Error(
          `Popularity ID ${this.popularityId} is already in use. Please choose a different number.`
        )
      );
    }
    if (existingCollection.key === this.key) {
      return next(new Error("Collection with similar name already exists."));
    }
  }
  next();
});

// Pre-update middleware to update 'key' if 'name' changes
collectionSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.name) {
    update.name = update.name.trim();
    update.key = update.name.toLowerCase().replace(/\s+/g, "_");
  }

  if (update.popularityId) {
    update.popularityId = update.popularityId.toString().padStart(3, "0");
  }

  const docId = this.getQuery()._id;

  const existingCollection = await mongoose.model("Collection").findOne({
    _id: { $ne: docId },
    $or: [{ key: update.key }, { popularityId: update.popularityId }],
  });

  if (existingCollection) {
    if (existingCollection.popularityId === update.popularityId) {
      return next(
        new Error(
          `Popularity ID ${update.popularityId} is already in use. Please choose a different number.`
        )
      );
    }
    if (existingCollection.key === update.key) {
      return next(new Error("Collection with similar name already exists."));
    }
  }
  next();
});

collectionSchema.index({ key: 1 });

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
