import Collection from "../models/collection.model.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Utills/customErrorHandler.js";
import { upload_single_image } from "../Utills/cloudinary.js";

//------------------------------------ GET ALL COLLECTIONS => GET /collections ------------------------------------

export const getAllCollections = catchAsyncErrors(async (req, res, next) => {
  const collections = await Collection.find().sort({ updatedAt: -1 });
  if (collections) {
    console.log(collections);
  }
  if (!collections) {
    return next(new ErrorHandler("Failed to retrive all collections", 404));
  }
  res.status(200).json({
    message: `${collections.length} collections retrived`,
    collections,
  });
});

//------------------------------------ GET COLLECTION BY ID => GET /collections/:id ------------------------------------

export const getCollectionById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log("ID:", id);

  const collection = await Collection.findById(id);
  if (!collection) {
    return next(new ErrorHandler("Failed to retrive all collections", 404));
  }
  res.status(200).json({
    message: "Collection retrived",
    collection,
  });
});

// --------------------------------------------------- ADMIN ----------------------------------------------------------

//------------------------------------ CREATE NEW COLLECTION => admin/newCollection ------------------------------------

export const createCollection = catchAsyncErrors(async (req, res, next) => {
  const newCollection = await Collection.create(req?.body);

  if (!newCollection) {
    return next(new ErrorHandler("Failed to create new collection", 404));
  }

  res.status(201).json({
    message: "Collection created successfully",
    newCollection,
  });
});

//------------------------------------ UPDATE COLLECTION => admin/collections/:id ------------------------------------

export const updateCollection = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const updatedData = { ...req.body };

  const updatedCollection = await Collection.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCollection) {
    return res.status(404).json({ message: "Collection not found" });
  }

  res.status(200).json({
    updatedCollection,
    message: "Collection updated successfully",
  });
});

//------------------------------------ DELETE COLLECTION => admin/collection/:id ------------------------------------

export const deleteCollectionByID = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCollection = await Collection.findByIdAndDelete(id);

    if (!deletedCollection) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }

    res.status(200).json({
      message: "Collection deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//------------------------------------ UPLOAD COLLECTION => admin/collection/:id/upload_image ------------------------------------

export const uploadCollectionImage = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { image } = req.body; // Get the single image from the request body

      if (!image) {
        return next(new ErrorHandler("No image provided", 400));
      }

      // Assuming `uploadImage` is a helper function to handle the image upload
      const url = await upload_single_image(
        image,
        "brick_extreme//collections"
      );

      console.log("Uploaded URL:", url);

      // Update the product by pushing the single image URL to the `product_images` array
      const collection = await Collection.findByIdAndUpdate(
        req.params.id,
        { image: url }, // Update operation
        { new: true, runValidators: true } // Options
      );

      if (!collection) {
        return next(new ErrorHandler("Collection not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: collection,
      });
    } catch (error) {
      return next(
        new ErrorHandler(error.message || "Image upload failed", 500)
      );
    }
  }
);
