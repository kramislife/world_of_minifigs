import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import SubCategory from "../models/subCategory.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";
import { upload_single_image } from "../Utills/cloudinary.js";

// ----------------------------------------------- GET ALL SUB CATEGORIES ----------------------------------
export const getAllSubCategories = catchAsyncErrors(async (req, res, next) => {
  const sub_categories = await SubCategory.find().populate("category");

  if (!sub_categories) {
    return next(new ErrorHandler("No Categories found", 404));
  }

  res.status(200).json({
    sub_categories,
    message: "SubCategories retrieved successfully",
  });
});

// ----------------------------------------------- GET A SUBCATEGORY BASED ON SUB-CATEGORY KEY ----------------------------------

export const getSubCategoryByKey = catchAsyncErrors(async (req, res, next) => {
  const subcategory = await SubCategory.find({ key: req.params.key });
  if (!subcategory) {
    return next(new ErrorHandler("SubCategory not found", 404));
  }
  res.status(200).json({
    message: "SubCategory retrieved successfully",
    subcategory,
  });
});

//------------------------------------  GET A SUB-CATEGORY BY ID => GET /subcategories/:id  ------------------------------------

export const getSubCategoryById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const subcategory = await SubCategory.findById(id);

  if (!subcategory) {
    return next(new ErrorHandler("Sub-Category not found", 404));
  }
  res.status(200).json({
    message: "Sub-Category retrieved successfully",
    subcategory,
  });
});

//------------------------------------ CREATE NEW SUB-CATEGORY => POST admin/newSubCategory ------------------------------------

export const createSubCategory = catchAsyncErrors(async (req, res, next) => {
  const newSubCategory = await SubCategory.create(req.body);

  if (!newSubCategory) {
    return next(new ErrorHandler("Failed to create category", 400));
  }

  res.status(201).json({
    newSubCategory,
    message: "Category created successfully",
  });
});

//------------------------------------ UPDATE A SUBCATEGORY => PUT admin/subcategories/:id ------------------------------------

export const updateSubCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updatedData = { ...req.body };

  const updatedSubCategory = await SubCategory.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedSubCategory) {
    return next(new ErrorHandler("Category not found", 404));
  }

  res.status(200).json({
    updatedSubCategory,
    message: "Sub-Category updated successfully",
  });
});

//------------------------------------ DELETE A SUBCATEGORY => DELETE admin/categories/:id ------------------------------------

export const deleteSubCategoryByID = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

    if (!deletedSubCategory) {
      return next(new ErrorHandler("SubCategory not found", 404));
    }

    res.status(200).json({
      deletedSubCategory,
      message: "SubCategory deleted successfully",
    });
  }
);

// ----------------------------------------- UPLOAD SUB CATEGORY IMAGES -----------------------------------

export const uploadSubCategoryImage = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { image } = req.body; // Get the single image from the request body

      if (!image) {
        return next(new ErrorHandler("No image provided", 400));
      }

      // Assuming `uploadImage` is a helper function to handle the image upload
      const url = await upload_single_image(
        image,
        "world_of_minifigs/sub_categories"
      );

      console.log("Uploaded URL:", url);

      // Update the product by pushing the single image URL to the `product_images` array
      const sub_categories = await SubCategory.findByIdAndUpdate(
        req.params.id,
        { image: url }, // Update operation
        { new: true, runValidators: true } // Options
      );

      if (!sub_categories) {
        return next(new ErrorHandler("Sub Category not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: sub_categories,
      });
    } catch (error) {
      return next(
        new ErrorHandler(error.message || "Image upload failed", 500)
      );
    }
  }
);
