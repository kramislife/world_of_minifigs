import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";
import { userRoles } from "../Utills/Roles.js";

// ------------------------ GET ALL USERS ------------------------ //

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const currentUserId = req.user.user_id;

  if (!currentUserId) {
    return next(new ErrorHandler("User not found", 404));
  }

  const users = await User.find();

  if (users.length < 1) {
    return next(new ErrorHandler("No users found", 404));
  }

  res.status(200).json({
    status: "success",
    message: `${users.length} users fetched successfully`,
    data: users,
  });
});

// ------------------------ GET SINGLE USER ----------------------- //

export const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const currentUserId = req.user.user_id;

  if (!currentUserId) {
    return next(new ErrorHandler("User not found", 404));
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    data: user,
  });
});

// ------------------------ UPDATE SINGLE USER ----------------------- //

export const updateSingleUser = catchAsyncErrors(async (req, res, next) => {
  const currentUserId = req.user.user_id;
  const currentUserRole = req.user.role;

  if (!currentUserId || !currentUserRole) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Block employees from modifying users
  if (currentUserRole === userRoles.EMPLOYEE) {
    return next(new ErrorHandler("Employees cannot modify user accounts", 403));
  }

  const userIdToUpdate = req.params.id;
  const userToUpdate = await User.findById(userIdToUpdate);

  if (!userToUpdate) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Prevent admins from modifying superAdmin accounts
  if (
    currentUserRole === userRoles.ADMIN &&
    userToUpdate.role === userRoles.SUPER_ADMIN
  ) {
    return next(new ErrorHandler("Cannot modify superAdmin accounts", 403));
  }

  // Prevent admins from changing roles to superAdmin
  if (
    currentUserRole === userRoles.ADMIN &&
    req.body.role === userRoles.SUPER_ADMIN
  ) {
    return next(new ErrorHandler("Cannot assign superAdmin role", 403));
  }

  const allowedUpdates = [
    "name",
    "username",
    "password",
    "contact_number",
    "is_verified",
    "role",
    "isSuspended",
  ];

  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((key) => allowedUpdates.includes(key));

  if (!isValidOperation) {
    return next(new ErrorHandler("Invalid updates!", 400));
  }

  updates.forEach((key) => {
    userToUpdate[key] = req.body[key];
  });

  userToUpdate.updated_by = currentUserId;
  await userToUpdate.save();

  let updatedUser = {};
  if (req.body.password) {
    updatedUser = await User.findById(userIdToUpdate).select("+password");
  } else {
    updatedUser = await User.findById(userIdToUpdate);
  }

  // Return Response
  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    data: updatedUser,
  });
});

// ------------------------ DELETE SINGLE USER ----------------------- //

export const deleteSingleUser = catchAsyncErrors(async (req, res, next) => {
  const userIdToDelete = req.params.id;
  const currentUserId = req.user.user_id;
  const currentUserRole = req.user.role;

  if (!currentUserId || !currentUserRole) {
    return next(
      new ErrorHandler("You are not authorized to perform this action!", 401)
    );
  }

  // Only allow superAdmin to delete users
  if (currentUserRole !== userRoles.SUPER_ADMIN) {
    return next(new ErrorHandler("Only Super Admin can delete users", 403));
  }

  if (!userIdToDelete) {
    return next(new ErrorHandler("User not found", 404));
  }

  // IDENTIFY USER TO BE DELETED
  const userToDelete = await User.findById(userIdToDelete);
  if (!userToDelete) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Prevent deletion of own account
  if (userIdToDelete === currentUserId) {
    return next(new ErrorHandler("Cannot delete your own account", 403));
  }

  const DeletedUser = await User.findByIdAndDelete(userIdToDelete);

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
    data: DeletedUser,
  });
});
