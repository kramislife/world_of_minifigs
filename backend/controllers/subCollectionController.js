import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import SubCollection from "../models/subCollection.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";
import { uploadImage, deleteImage } from "../Utills/cloudinary.js";

//------------------------------------ GET ALL SUB-COLLECTIONS => GET /subcollections ------------------------------------

export const getAllSubCollections = catchAsyncErrors(async (req, res, next) => {
  const subcollections = await SubCollection.find()
    .populate("collection")
    .sort({ popularityId: 1 });

  if (!subcollections) {
    return next(
      new ErrorHandler("Failed to retrieve all sub-collections", 404)
    );
  }
  res.status(200).json({
    success: true,
    message: `${subcollections.length} sub-collections retrieved`,
    subcollections,
  });
});

//------------------------------------ GET SUB-COLLECTION BY ID => GET /subCollections/:id ------------------------------------

export const getSubCollectionById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const subcollection = await SubCollection.findById(id);
  if (!subcollection) {
    return next(new ErrorHandler("Sub-collection not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Sub-collection retrieved successfully",
    subcollection,
  });
});

// --------------------------------------------------- ADMIN ----------------------------------------------------------

//------------------------------------ CREATE NEW SUB COLLECTION => admin/newSubCollection ------------------------------------

export const createSubCollection = catchAsyncErrors(async (req, res, next) => {
  const newSubCollection = await SubCollection.create(req?.body);

  if (!newSubCollection) {
    return next(new ErrorHandler("Failed to create new sub-collection", 404));
  }

  res.status(201).json({
    success: true,
    message: "Sub-collection created successfully",
    newSubCollection,
  });
});

//------------------------------------ UPDATE SUB COLLECTION => admin/subcollections/:id ------------------------------------

export const updateSubCollection = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updatedData = { ...req.body };

  // Get existing subcollection first
  const existingSubCollection = await SubCollection.findById(id);
  if (!existingSubCollection) {
    return next(new ErrorHandler("Sub-collection not found", 404));
  }

  // Preserve the image if it's not being updated
  if (!updatedData.image && existingSubCollection.image) {
    updatedData.image = existingSubCollection.image;
  }

  const updatedSubCollection = await SubCollection.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedSubCollection) {
    return next(new ErrorHandler("Failed to update sub-collection", 404));
  }

  res.status(200).json({
    success: true,
    message: "Sub-collection updated successfully",
    updatedSubCollection,
  });
});

//------------------------------------ DELETE SUB COLLECTION => admin/subcollections/:id ------------------------------------

export const deleteSubCollectionByID = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const deletedSubCollection = await SubCollection.findByIdAndDelete(id);

  if (!deletedSubCollection) {
    return next(new ErrorHandler("Sub-collection not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Sub-collection deleted successfully",
    deletedSubCollection,
  });
});

//------------------------------------ UPLOAD SUB COLLECTION IMAGE => admin/subcollection/:id/upload_image ------------------------------------

export const uploadSubCollectionImage = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { image } = req.body; // Get the single image from the request body

      if (!image) {
        return next(new ErrorHandler("No image provided", 400));
      }

      // Find the subcollection first to check if it already has an image
      const existingSubCollection = await SubCollection.findById(req.params.id);
      
      if (!existingSubCollection) {
        return next(new ErrorHandler("Sub-collection not found", 404));
      }
      
      // If the subcollection already has an image, delete it from Cloudinary
      if (existingSubCollection.image && existingSubCollection.image.public_id) {
        await deleteImage(existingSubCollection.image.public_id);
        console.log("Deleted previous image:", existingSubCollection.image.public_id);
      }

      // Use standardized image upload function
      const url = await uploadImage(image, "world_of_minifigs/sub_collections");

      console.log("Uploaded URL:", url);

      // Update the subcollection with the new image URL
      const subcollection = await SubCollection.findByIdAndUpdate(
        req.params.id,
        { image: url }, // Update operation
        { new: true, runValidators: true } // Options
      );

      res.status(200).json({
        success: true,
        message: "Sub-collection image updated successfully",
        data: subcollection,
      });
    } catch (error) {
      return next(
        new ErrorHandler(error.message || "Image upload failed", 500)
      );
    }
  }
);
