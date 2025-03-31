import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Category from "../models/category.model.js";
import SubCategory from "../models/subCategory.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";

//------------------------------------  GET ALL CATEGORY => GET /categories  ------------------------------------

export const getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find().sort({ popularityId: 1 });
  if (!categories) {
    return next(new ErrorHandler("No Categories found", 404));
  }
  res.status(200).json({
    success: true,
    categories,
    message: "Categories retrieved successfully",
  });
});

// GET A CATEGORY BASED ON CATEGORY KEY
export const getCategoryByKey = catchAsyncErrors(async (req, res, next) => {
  // console.log("KEY:", req.params.key);

  const category = await Category.find({ key: req.params.key });
  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Category retrieved successfully",
    category,
  });
});

//------------------------------------  GET CATEGORY BY ID => GET /categories/:id  ------------------------------------

export const getCategoryById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Category retrieved successfully",
    category,
  });
});

//------------------------------------ CREATE NEW CATEGORY => POST admin/newCategory ------------------------------------

export const createCategory = catchAsyncErrors(async (req, res, next) => {
  const newCategory = await Category.create(req.body);

  if (!newCategory) {
    return next(new ErrorHandler("Failed to create category", 400));
  }

  res.status(201).json({
    success: true,
    newCategory,
    message: "Category created successfully",
  });
});

//------------------------------------ UPDATE A CATEGORY => PUT admin/categories/:id ------------------------------------

export const updateCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updatedData = { ...req.body };

  const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!updatedCategory) {
    return next(new ErrorHandler("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    updatedCategory,
    message: "Category updated successfully",
  });
});

//------------------------------------ DELETE A CATEGORY => DELETE admin/categories/:id ------------------------------------

export const deleteCategoryByID = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // First check if category exists
  const category = await Category.findById(id);
  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  // Check if there are any subcategories linked to this category
  const subCategories = await SubCategory.find({ category: id });

  if (subCategories && subCategories.length > 0) {
    return next(
      new ErrorHandler(
        `Cannot delete category. Please delete the subcategories first.`,
        400
      )
    );
  }

  // If no subcategories exist, proceed with deletion
  const deletedCategory = await Category.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    deletedCategory,
    message: "Category deleted successfully",
  });
});
