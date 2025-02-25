import mongoose from "mongoose";

const subCollectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "SubCollection name is required"],
      trim: true,
      maxlength: [100, "SubCollection name can't exceed 100 characters"],
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
    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: [true, "Collection ID is required"],
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

// Pre-save middleware to generate 'key' for SubCollection
subCollectionSchema.pre("save", async function (next) {
  if (this.name && this.collection) {
    this.name = this.name.trim().replace(/\s+/g, " ");
    if (!this.key) {
      const formattedName = this.name.toLowerCase().replace(/\s+/g, "_");
      this.key = `${formattedName}_${this.collection.toString()}`;
    }
  }

  // Format popularityId to ensure 3 digits
  if (this.popularityId) {
    this.popularityId = this.popularityId.toString().padStart(3, "0");
  }

  // Check for unique constraints
  const existingSubCollection = await mongoose.model("SubCollection").findOne({
    $or: [{ key: this.key }, { popularityId: this.popularityId }],
  });

  if (existingSubCollection) {
    if (existingSubCollection.popularityId === this.popularityId) {
      return next(
        new Error(
          `Popularity ID ${this.popularityId} is already in use. Please choose a different number.`
        )
      );
    }
    if (existingSubCollection.key === this.key) {
      return next(new Error("SubCollection with similar name already exists."));
    }
  }
  next();
});

// Pre-update middleware to update 'key' if 'name' changes
subCollectionSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.name && update.collection) {
    update.name = update.name.trim().replace(/\s+/g, " ");
    const formattedName = update.name.toLowerCase().replace(/\s+/g, "_");
    update.key = `${formattedName}_${update.collection.toString()}`;
  }

  // Format popularityId if it's being updated
  if (update.popularityId) {
    update.popularityId = update.popularityId.toString().padStart(3, "0");
  }

  const docId = this.getQuery()._id;

  const existingSubCollection = await mongoose.model("SubCollection").findOne({
    _id: { $ne: docId },
    $or: [{ key: update.key }, { popularityId: update.popularityId }],
  });

  if (existingSubCollection) {
    if (existingSubCollection.popularityId === update.popularityId) {
      return next(
        new Error(
          `Popularity ID ${update.popularityId} is already in use. Please choose a different number.`
        )
      );
    }
    if (existingSubCollection.key === update.key) {
      return next(new Error("SubCollection with similar name already exists."));
    }
  }
  next();
});

subCollectionSchema.index({ key: 1 });
subCollectionSchema.index({ collection: 1 });

const SubCollection = mongoose.model("SubCollection", subCollectionSchema);

export default SubCollection;
