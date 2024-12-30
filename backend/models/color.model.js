import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the color name"],
      unique: true,
      trim: true,
      maxLength: [50, "Color name cannot exceed 50 characters"],
    },
    code: {
      type: String,
      required: [true, "Please enter the color code"],
      unique: true,
      match: [
        /^#([0-9A-F]{3}|[0-9A-F]{6})$/i,
        "Please enter a valid HEX color code (e.g., #FFF or #FFFFFF)",
      ],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [200, "Description cannot exceed 200 characters"],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please specify the creator"],
      immutable: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Color = mongoose.model("Color", colorSchema);

export default Color;
