import ErrorHandler from "./customErrorHandler.js";

export const isSuspended = async (user_id) => {
  try {
    const currentUser = await User.findById(user_id);
    console.log(currentUser);
    
    if (currentUser.isSuspended) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
