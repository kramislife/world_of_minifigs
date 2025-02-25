import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Utills/customErrorHandler.js";
import { upload_single_image } from "../Utills/cloudinary.js";
import SubCollection from "../models/subCollection.model.js";

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
    message: `${subcollections.length} sub-collections retrieved`,
    subcollections,
  });
});

//------------------------------------ GET SUB-COLLECTION BY ID => GET /subCollections/:id ------------------------------------

export const getSubCollectionById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const subcollections = await SubCollection.findById(id);
  if (!subcollections) {
    return next(new ErrorHandler("Failed to retrive all sub-collections", 404));
  }
  res.status(200).json({
    message: "sub-collection retrived",
    subcollections,
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
    message: "Sub Collection created successfully",
    newSubCollection,
  });
});

//------------------------------------ UPDATE SUB COLLECTION => admin/subcollections/:id ------------------------------------

export const updateSubCollection = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const updatedData = { ...req.body };

  const updatedSubCollection = await SubCollection.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedSubCollection) {
    return res.status(404).json({ message: "Sub Collection not found" });
  }

  res.status(200).json({
    updatedSubCollection,
    message: "Sub Collection updated successfully",
  });
});

//------------------------------------ DELETE SUB COLLECTION => admin/subcollections/:id ------------------------------------

export const deleteSubCollectionByID = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubCollection = await SubCollection.findByIdAndDelete(id);

    if (!deletedSubCollection) {
      return res.status(404).json({
        message: "SubCollection not found",
      });
    }

    res.status(200).json({
      message: "SubCollection deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//------------------------------------ UPLOAD SUB COLLECTION IMAGE => admin/subcollection/:id/upload_image ------------------------------------

export const uploadSubCollectionImage = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { image } = req.body; // Get the single image from the request body

      if (!image) {
        return next(new ErrorHandler("No image provided", 400));
      }

      // Assuming `uploadImage` is a helper function to handle the image upload
      const url = await upload_single_image(
        image,
        "world_of_minifigs/sub_collections"
      );

      console.log("Uploaded URL:", url);

      // Update the product by pushing the single image URL to the `product_images` array
      const subcollection = await SubCollection.findByIdAndUpdate(
        req.params.id,
        { image: url }, // Update operation
        { new: true, runValidators: true } // Options
      );

      if (!subcollection) {
        return next(new ErrorHandler("Sub Collection not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: subcollection,
      });
    } catch (error) {
      return next(
        new ErrorHandler(error.message || "Image upload failed", 500)
      );
    }
  }
);
