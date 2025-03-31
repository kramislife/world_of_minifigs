import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import SubCategory from "../models/subCategory.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";

// ----------------------------------------------- GET ALL SUB CATEGORIES ----------------------------------
export const getAllSubCategories = catchAsyncErrors(async (req, res, next) => {
  const sub_categories = await SubCategory.find()
    .populate("category")
    .sort({ popularityId: 1 });

  if (!sub_categories) {
    return next(new ErrorHandler("No Categories found", 404));
  }

  res.status(200).json({
    success: true,
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
    success: true,
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
    success: true,
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
    success: true,
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
    success: true,
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
      success: true,
      deletedSubCategory,
      message: "SubCategory deleted successfully",
    });
  }
);
