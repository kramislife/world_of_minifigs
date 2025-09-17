import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import MinifigProject from "../models/minifigProject.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";

//------------------------------------  CREATE NEW PROJECT  ------------------------------------
export const createMinifigProject = catchAsyncErrors(async (req, res, next) => {
  const { name, head, torso, legs, selectedItems } = req.body;

  const newProject = await MinifigProject.create({
    user: req.user._id,
    name,
    hair,
    head,
    torso,
    legs,
    accessories: accessories || [],
    selectedItems,
  });

  if (!newProject) {
    return next(new ErrorHandler("Failed to create a project", 400));
  }

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    project: newProject,
  });
});

//------------------------------------  GET ALL PROJECTS BY USER  ------------------------------------
export const getUserProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await MinifigProject.find({ user: req.user._id });

  res.status(200).json({
    // success: true,
    message: "Projects retrieved successfully",
    projects,
  });
});

//------------------------------------  GET ALL PROJECTS BY ID  ------------------------------------
export const getMinifigProjectById = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    const project = await MinifigProject.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!project) {
      return next(new ErrorHandler("Project not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      project,
    });
  },
);

//------------------------------------  UPDATE A PROJECT  ------------------------------------
export const updateMinifigProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const updateData = { ...req.body };
  delete updateData._id;

  const updatedProject = await MinifigProject.findOneAndUpdate(
    {
      _id: id,
      user: req.user._id,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedProject) {
    return next(new ErrorHandler("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project: updatedProject,
  });
});

//------------------------------------  DELETE A PROJECT  ------------------------------------
export const deleteMinifigProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const deletedProject = await MinifigProject.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!deletedProject) {
    return next(new ErrorHandler("Projet not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
    project: deletedProject,
  });
});
