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
  // 1. CHECK IF CURRENT USER IS AVAILABLE AND IF THERE IS A USER ROLE

  const currentUserId = req.user.user_id;
  const currentUserRole = req.user.role;

  if (!currentUserId || !currentUserRole) {
    return next(new ErrorHandler("User not found", 404));
  }

  const userIdToUpdate = req.params.id;
  const userToUpdate = await User.findById(userIdToUpdate);

  if (
    currentUserRole === userRoles.ADMIN &&
    ![userRoles.EMPLOYEE, userRoles.SELLER, userRoles.CUSTOMER].includes(
      userToUpdate.role
    )
  ) {
    return next(
      new ErrorHandler("Admins cannot update this type of user", 403)
    );
  }

  if (
    currentUserRole === userRoles.EMPLOYEE &&
    userToUpdate.role !== userRoles.CUSTOMER
  ) {
    return next(new ErrorHandler("Employees can only update customers", 403));
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

  // Update Fields

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

  if (!userIdToDelete) {
    return next(new ErrorHandler("User not found or unauthorized!", 404));
  }

  // IDENTIFY USER TO BE DELETED
  const userToDelete = await User.findById(userIdToDelete);
  if (!userToDelete) {
    return next(new ErrorHandler("User not found or unauthorized!", 404));
  }

  let DeletedUser = {};

  // ROLE BASED ACCESS CONTROL

  if (currentUserRole === userRoles.SUPER_ADMIN) {
    DeletedUser = await User.findByIdAndDelete(userIdToDelete);
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      data: DeletedUser,
    });
  }

  if (currentUserRole === userRoles.ADMIN) {
    if (
      userToDelete.role === userRoles.SUPER_ADMIN ||
      userToDelete.role === userRoles.ADMIN
    ) {
      return next(
        new ErrorHandler("You are not authorized to delete this user!", 401)
      );
    }
    DeletedUser = await User.findByIdAndDelete(userIdToDelete);
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      data: DeletedUser,
    });
  }

  if (
    currentUserRole === userRoles.EMPLOYEE ||
    currentUserRole === userRoles.CUSTOMER ||
    currentUserRole === userRoles.SELLER
  ) {
    return next(
      new ErrorHandler("You are not authorized to use this resource!", 401)
    );
  }
});
