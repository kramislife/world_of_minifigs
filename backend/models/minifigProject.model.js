import mongoose from "mongoose";

const minifigPartSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["HAIR", "HEAD", "TORSO", "LEGS", "ACCESSORY"],
      required: true,
    },
    name: String,
    description: String,
    image: String,
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 1,
    },
    product_color: {
      type: String,
      ref: "Color",
      required: false,
    },
    product_includes: {
      type: String,
      required: false,
    },
  },
  { _id: false },
);

const minifigProjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    selectedItems: {
      hair: minifigPartSchema,
      head: minifigPartSchema,
      torso: minifigPartSchema,
      legs: minifigPartSchema,
      accessories: [minifigPartSchema],
    },
  },
  { timestamps: true },
);

const MinifigProject = mongoose.model("MinifigProject", minifigProjectSchema);

export default MinifigProject;
