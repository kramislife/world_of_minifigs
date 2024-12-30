import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Designer from "../models/designer.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";

// -------------------------------------- GET ALL DESIGNERS => GET /designers --------------------------------------

export const getAllDesigners = catchAsyncErrors(async (req, res, next) => {
  const designers = await Designer.find();

  if (!designers) {
    return res.status(404).json({ message: "No designers found" });
  }
  res.status(200).json({
    message: `${designers.length} designers found`,
    designers,
  });
});

// -------------------------------------- GET ALL DESIGNERS => GET /designers/:id --------------------------------------

export const getDesignerById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const designers = await Designer.findById(id);

  if (!designers) {
    return next(new ErrorHandler("No designers found"), 404);
  }
  res.status(200).json({
    message: "All Designers found",
    designers,
  });
});

// -------------------------------------- CREATE NEW DESIGNER => POST admin/newDesigners --------------------------------------

export const createDesigners = catchAsyncErrors(async (req, res, next) => {
  const newDesigner = await Designer.create(req.body);

  if (!newDesigner) {
    return next(new ErrorHandler("Failed to create new designer", 400));
  }

  res.status(201).json({
    message: "New Designer created successfully",
    newDesigner,
  });
});

// -------------------------------------- UPDATE A DESIGNER => PUT admin/designers/:id --------------------------------------

export const updateDesignerById = catchAsyncErrors(async (req, res, next) => {
  console.log("Update Designers");

  const updatedDesigner = await Designer.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!updatedDesigner) {
    return next(new ErrorHandler("Failed to update designer", 400));
  }

  res.status(200).json({
    message: "Designer updated successfully",
    updatedDesigner,
  });
});

// -------------------------------------- DELETE A DESIGNER => DELETE admin/designers/:id --------------------------------------

export const deleteDesignerById = catchAsyncErrors(async (req, res, next) => {
  const deletedDesigner = await Designer.findByIdAndDelete(req.params.id);

  if (!deletedDesigner)
    return next(new ErrorHandler("Designer not found", 404));

  res.status(200).json({
    message: "Designer Deleted",
    deletedDesigner,
  });
});
