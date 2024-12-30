import mongoose from "mongoose";

const skillLevelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill level name is required"],
      unique: true,
      minlength: [3, "Skill level name must be at least 3 characters long"], // Optional: set minimum length
      maxlength: [100, "Skill level name must be less than 100 characters"], // Optional: max length for the name
    },
    key: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^[a-z0-9_]+$/,
        "Key must be in lowercase and contain only letters, numbers, and underscores",
      ],
    },
    description: {
      type: String,
      maxlength: [500, "Description must be less than 500 characters"], // Optional: max length for the description
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
      required: [true, "User ID is required for each category"],
    },
  },
  { timestamps: true }
);

// Pre-save middleware to generate and validate 'key'

skillLevelSchema.pre("save", async function (next) {
  if (this.name) {
    this.name = this.name.trim();
    this.description = this.description.trim();
    if (!this.key) {
      this.key = this.name.toLowerCase().trim().replace(/\s+/g, "_");
    }
  }

  // Check for unique key constraint
  const existingSkillLevel = await mongoose
    .model("SkillLevel")
    .findOne({ key: this.key });
  if (existingSkillLevel) {
    return next(new Error("Skill Level key must be unique."));
  }
  next();
});

// Pre-update middleware to update 'key' if 'name' changes
skillLevelSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Update the 'key' based on the new 'name' if provided
  if (update.name) {
    update.name = update.name.trim();
    update.key = update.name.toLowerCase().trim().replace(/\s+/g, "_");
  }
  if (update.description) {
    update.description = update.description.trim();
  }

  // Ensure uniqueness of the updated key
  const existingSkillLevel = await mongoose
    .model("SkillLevel")
    .findOne({ key: update.key });
  if (existingSkillLevel) {
    return next(new Error("Skill Level must be unique."));
  }

  next();
});

// Create the SkillLevel model based on the schema
const SkillLevel = mongoose.model("SkillLevel", skillLevelSchema);

export default SkillLevel;
