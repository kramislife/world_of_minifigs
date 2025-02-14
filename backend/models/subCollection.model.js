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
    this.name = this.name.trim().replace(/\s+/g, " "); // Replace multiple spaces with a single space
    if (!this.key) {
      const formattedName = this.name.toLowerCase().replace(/\s+/g, "_");
      this.key = `${formattedName}_${this.collection.toString()}`;
    }
  }

  // Check for unique key constraint
  const existingSubCollection = await mongoose
    .model("SubCollection")
    .findOne({ key: this.key });
  if (existingSubCollection) {
    return next(new Error("SubCollection with similar name already exists."));
  }
  next();
});

// Pre-update middleware to update 'key' if 'name' changes
subCollectionSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.name && update.collection) {
    update.name = update.name.trim().replace(/\s+/g, " "); // Normalize spaces
    const formattedName = update.name.toLowerCase().replace(/\s+/g, "_");
    update.key = `${formattedName}_${update.collection.toString()}`;
  }

  const existingSubCollection = await mongoose
    .model("SubCollection")
    .findOne({ key: update.key });
  if (existingSubCollection) {
    return next(new Error("SubCollection with similar name already exists."));
  }

  next();
});

subCollectionSchema.index({ key: 1 });
subCollectionSchema.index({ collection: 1 });

const SubCollection = mongoose.model("SubCollection", subCollectionSchema);

export default SubCollection;
