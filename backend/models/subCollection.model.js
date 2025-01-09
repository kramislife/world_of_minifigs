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
    description: {
      type: String,
      default: "",
      maxlength: [500, "Description can't exceed 500 characters"],
    },
    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
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
  if (this.name) {
    this.name = this.name.trim();
    if (!this.key) {
      this.key = this.name.toLowerCase().replace(/\s+/g, "_");
    }
  }

  // Check for unique key constraint
  const existingSubCollection = await mongoose
    .model("SubCollection")
    .findOne({ key: this.key });
  if (existingSubCollection) {
    return next(new Error("SubCollection key must be unique."));
  }
  next();
});

// Pre-update middleware to update 'key' if 'name' changes
subCollectionSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.name) {
    update.name = update.name.trim();
    update.key = update.name.toLowerCase().replace(/\s+/g, "_");
  }

  const existingSubCollection = await mongoose
    .model("SubCollection")
    .findOne({ key: update.key });
  if (existingSubCollection) {
    return next(new Error("SubCollection key must be unique."));
  }

  next();
});

subCollectionSchema.index({ key: 1 });

const SubCollection = mongoose.model("SubCollection", subCollectionSchema);

export default SubCollection;
