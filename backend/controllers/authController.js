import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import ErrorHandler from "../Utills/customErrorHandler.js";
import {
  clearCookies,
  generateAccessToken,
  generateCookies,
} from "../Utills/generateToken.js";
import Address from "../models/userAddress.model.js";
import sendEmail from "../Utills/sendEmail.js";
import { getResetPasswordTemplate } from "../Utills/Emails/ResetPasswordTemplate.js";
import { getVerificationEmailTemplate } from "../Utills/Emails/VerificationEmailTemplate.js";
import { deleteImage, uploadImage } from "../Utills/cloudinary.js";
import { ContactFormTemplate } from "../Utills/Emails/ContactFormTemplate.js";

// --------------------------------------- REGISTER USER --------------------------------------- //
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  //1. TAKE USER DATA FROM REQUEST BODY
  const { name, username, email, password, contact_number } = req.body;

  if (!name || !username || !email || !password || !contact_number) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }

  //2. CHECK IF THE USER WITH SAME EMAIL OR USERNAME ALREADY EXISTS
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  //3. CREATE A NEW USER
  const new_user = await User({
    name,
    username,
    email,
    password,
    contact_number,
  });

  // 4. GET THE VERIFICATION TOKEN
  const token = new_user.generateVerificationToken();

  //5. SAVE THE USER TO DATABASE
  await new_user.save();

  // 6. CREATE VERIFICATION LINK
  const verificationLink = `${process.env.FRONTEND_URL}/verify_user/${token}`;

  // 7. SEND THE VERIFICATION LINK TO THE USER'S EMAIL
  await sendEmail({
    email: new_user.email,
    subject: `Verify Your Email | ${process.env.SMTP_FROM_NAME}`,
    message: getVerificationEmailTemplate(new_user, verificationLink),
  });

  // 8. SEND RESPONSE TO THE USER
  res.status(201).json({
    status: "success",
    message:
      "You have successfully registered. A verification email has been sent to your inbox. If you don’t receive it within a few minutes, please check your Spam folder ",
    new_user,
  });
});

// ----------------------------------------------- VERIFY USER ----------------------------------------------- //
export const verifyUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.params.token;

  const user = await User.findOneAndUpdate(
    {
      verification_token: token,
      verification_token_expiry: { $gt: Date.now() },
    },
    {
      $set: {
        is_verified: true,
        verification_token: undefined,
        verification_token_expiry: undefined,
      },
    },
    { new: true }
  );

  // If no user found or token expired
  if (!user) {
    const userWithToken = await User.findOne({ verification_token: token });

    if (!userWithToken) {
      return next(new ErrorHandler("Invalid verification token", 403));
    }

    // Token expired case - Don't automatically send new email
    if (userWithToken.verification_token_expiry < Date.now()) {
      return next(
        new ErrorHandler(
          "Verification token has expired. Please request a new verification link from the login page.",
          400
        )
      );
    }
  }

  res.status(200).json({
    status: "success",
    message: "Email verification successful",
  });
});

// --------------------------------------- LOGIN USER --------------------------------------- //

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email_username, password } = req.body;

  // 1. VALIDATE INPUT
  if (!email_username || !password) {
    return next(new ErrorHandler("Invalid Login Credentials", 400));
  }

  // 2. CHECK IF USER EXISTS USING EMAIL OR USERNAME
  const user = await User.findOne({
    $or: [{ email: email_username }, { username: email_username }],
  }).select("+password");

  // 3. IF USER DOES NOT EXIST
  if (!user) {
    return next(
      new ErrorHandler(
        "This account is not registered yet. Please register first.",
        404
      )
    );
  }

  // 4. IF PASSWORD DOES NOT MATCH
  if (!(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid Login Credentials", 401));
  }

  // 5. CHECK IF USER IS SUSPENDED
  if (user.isSuspended) {
    return next(
      new ErrorHandler(
        "Your account has been suspended. Please contact support for assistance.",
        403
      )
    );
  }

  // 6. CHECK IF USER IS VERIFIED
  if (!user.is_verified) {
    return next(
      new ErrorHandler("User not verified, please verify your email", 401)
    );
  }

  // 7. GENERATE ACCESS TOKEN
  const payload = { user_id: user._id, role: user.role };
  const accessToken = generateAccessToken(
    payload,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    process.env.JWT_ACCESS_TOKEN_EXPIRY
  );

  // 8. GENERATE REFRESH TOKEN
  const refreshToken = user.generateRefreshToken();

  // 9. SAVE USER IN DATABASE
  await user.save();

  // 10. SAVE ACCESS TOKEN IN COOKIE
  const maxAge = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY) * 60 * 60 * 1000;
  generateCookies(res, "accessToken", accessToken, maxAge);

  // 11. SAVE REFRESH TOKEN IN COOKIE
  const refreshMaxAge =
    parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY) * 24 * 60 * 60 * 1000;
  generateCookies(res, "refreshToken", refreshToken, refreshMaxAge);

  res.status(200).json({
    success: true,
    message: "Login Successful",
  });
});

// --------------------------------------------------------- LOGOUT USER -----------------------------------------------------------------

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(200).json({ message: "Logout successful" });
  }

  // 1. FIND USER WITH THE PROVIDED REFRESH TOKEN
  const user = await User.findOne({ refresh_token: refreshToken });

  if (user) {
    user.refresh_token = null;
    user.refresh_token_expiry = null;
    await user.save();
  }

  clearCookies(res, "accessToken");
  clearCookies(res, "refreshToken");

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

// -------------------------------- GET CURRENT USER PROFILE ---------------------------------//

export const getCurrentUserProfile = catchAsyncErrors(
  async (req, res, next) => {
    const user_id = req?.user?.user_id;

    const user = await User.findById(user_id);

    if (user) {
      res.status(200).json({
        success: true,
        user,
      });
    }
  }
);

// -------------------------------------- UPDATE CURRENT USER DATA ------------------------------------------------- //
export const updateCurrentUserProfile = catchAsyncErrors(
  async (req, res, next) => {
    const user_id = req.user.user_id;
    const { contact_number, name } = req.body;

    const updateFields = {};

    // Validate phone number if provided
    if (contact_number) {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(contact_number)) {
        return next(new ErrorHandler("Invalid phone number format", 400));
      }
      updateFields.contact_number = contact_number;
    }

    // Validate name if provided
    if (name) {
      if (name.trim().length < 3) {
        return next(
          new ErrorHandler("Name must be at least 3 characters long", 400)
        );
      }
      updateFields.name = name.trim();
    }

    const user = await User.findByIdAndUpdate(user_id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  }
);

// -------------------------------------------------- FORGOT PASSWORD --------------------------------------------------
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(
      new ErrorHandler(
        "This email is not registered with us. Please register to continue.",
        404
      )
    );
  }

  // Generate reset password token
  const reset_password_token = user.generateResetPasswordToken();
  await user.save();

  // Create reset password URL
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset-password/${reset_password_token}`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery | ${process.env.SMTP_FROM_NAME}`,
      message: getResetPasswordTemplate(user, resetUrl),
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (err) {
    user.reset_password_token = undefined;
    user.reset_password_token_expiry = undefined;
    await user.save();

    return next(new ErrorHandler(err.message, 500));
  }
});

// -------------------------------------- RESET PASSWORD -----------------------------------//
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = req.params.token;

  if (!resetPasswordToken) {
    return next(
      new ErrorHandler("Please provide a valid reset password token", 400)
    );
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetPasswordToken)
    .digest("hex");

  const user = await User.findOne({
    reset_password_token: hashedToken,
    reset_password_token_expiry: { $gt: Date.now() },
  });

  if (!user) {
    // Don't automatically generate new token and send email
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has expired. Please request a new reset link.",
        400
      )
    );
  }

  // If passwords don't match
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  // Update the password
  user.password = req.body.password;
  user.reset_password_token = undefined;
  user.reset_password_token_expiry = undefined;

  await user.save();

  // Send confirmation email
  try {
    await sendEmail({
      email: user.email,
      subject: `Password Reset Successful | ${process.env.SMTP_FROM_NAME}`,
      message: `
        <p>Hello ${user.username},</p>
        <p>Your password has been successfully reset. If this was not you, please contact support immediately at <a href="mailto:${process.env.SMTP_FROM_EMAIL}">${process.env.SMTP_FROM_EMAIL}</a></p>
      `,
    });
  } catch (error) {
    console.log("Error sending confirmation email:", error.message);
  }

  res.status(200).json({
    success: true,
    message: "Password reset successful. Please login with your new password",
  });
});

// -------------------------- UPDATE CURRENT USER PASSWORD -----------------------------//

export const updateCurrentUserPassword = catchAsyncErrors(
  async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user_id = req?.user?.user_id;

    // 1. Check if all required fields are provided
    if (!oldPassword || !newPassword || !confirmPassword) {
      return next(new ErrorHandler("Please fill in all fields", 400));
    }

    // 2. Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return next(new ErrorHandler("Passwords do not match", 400));
    }

    // 3. Get the user with password field
    const user = await User.findById(user_id).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // 4. Verify the old password is correct
    const isOldPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isOldPasswordCorrect) {
      return next(
        new ErrorHandler("Invalid Credentials. Please try again", 400)
      );
    }

    // 5. Check that new password is different from old password
    const isNewPasswordSameAsOld = await user.comparePassword(newPassword);

    if (isNewPasswordSameAsOld) {
      return next(
        new ErrorHandler(
          "New password cannot be the same as the current password",
          400
        )
      );
    }

    // 6. Update the password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  }
);

// ------------------------------------ CREATE USER ADDRESS ------------------------------------------------- //

export const createAddress = catchAsyncErrors(async (req, res, next) => {
  const user_id = req.user.user_id;
  console.log("User ID:", user_id);

  if (!user_id) {
    return next(new ErrorHandler("User not found", 404));
  }

  const user = await User.findById(user_id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!user.is_verified) {
    return next(
      new ErrorHandler(
        "Your account is not verified. User must be verified to add an address",
        401
      )
    );
  }

  const {
    name,
    contact_number,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country,
    country_code,
    is_default,
  } = req.body;

  // ENSURE REQUIRED FIELDS ARE PRESENT
  if (
    name === "" ||
    contact_number === "" ||
    address_line1 === "" ||
    city === "" ||
    postal_code === "" ||
    country === ""
  ) {
    return next(
      new ErrorHandler("Please fill in all the required fields", 400)
    );
  }

  if (is_default) {
    await Address.updateMany(
      { user_id, is_default: true },
      { is_default: false }
    );
  }

  const address = await Address.create({
    user: user_id,
    name,
    contact_number,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country,
    country_code,
    is_default,
  });

  // RETURN THE CREATED ADDRESS TO THE CLIENT
  res.status(201).json({
    success: true,
    message: "Address created successfully",
    address,
  });
});

// ------------------------ UPDATE A USER ADDRESS FOR A SINGLE USER ----------------------------------------

export const updateAddress = catchAsyncErrors(async (req, res, next) => {
  const user_id = req.user.user_id;

  const address_id = req.params.id;

  if (!user_id) {
    return next(
      new ErrorHandler(" User must be logged in to update an address", 401)
    );
  }

  // console.log("ADDRESS ID:", address_id);
  const address = await Address.findById(address_id);

  // console.log("ADDRESS - ", address);

  if (!address || address.is_deleted) {
    return next(new ErrorHandler("Address not found or has been deleted", 404));
  }

  if (address.user.toString() !== user_id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to update this address", 403)
    );
  }

  const {
    name,
    contact_number,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country,
    country_code,
    is_default,
  } = req.body;

  if (!name || !contact_number || !address_line1 || !city || !country) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const existingAddress = await Address.findOne({ user: user_id, name });

  if (
    existingAddress &&
    existingAddress._id.toString() !== address_id.toString()
  ) {
    return next(new ErrorHandler("Address with this name already exists", 400));
  }

  if (is_default) {
    await Address.updateMany(
      {
        user: user_id,
        is_default: true,
      },
      { is_default: false }
    );
  }

  address.name = name;
  address.contact_number = contact_number;
  address.address_line1 = address_line1;
  address.address_line2 = address_line2;
  address.city = city;
  address.state = state;
  address.postal_code = postal_code;
  address.country = country;
  address.country_code = country_code;
  address.is_default = is_default || false;
  address.updated_by = user_id;

  await address.save();

  res.status(200).json({
    success: true,
    message: "Address updated successfully",
    address,
  });
});

// --------------------------------------- GET ALL ADDRESSES FOR A USER  -----------------------------------
export const getAllAddresses = catchAsyncErrors(async (req, res, next) => {
  const user_id = req.user.user_id;

  if (!user_id) {
    return next(new ErrorHandler("You are not authorized ", 401));
  }

  const addresses = await Address.find({
    user: user_id,
    is_deleted: false,
  }).sort({ is_default: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    message: `${addresses.length} Addresses retrieved successfully`,
    addresses,
  });
});

// ---------- GET AN ADDRESS FOR A SINGLE USER  ---------------------------------------------

export const getSingleAddress = catchAsyncErrors(async (req, res, next) => {
  const user_id = req.user.user_id;
  const address_id = req.params.id;

  // console.log("USER ID => ", user_id);
  // console.log("ADDRESS ID => ", address_id);

  if (!user_id) {
    return next(new ErrorHandler("You are not authorized ", 401));
  }

  const address = await Address.findById(address_id);

  if (!address || address.user.toString() !== user_id.toString()) {
    return next(
      new ErrorHandler("Address not found or you are not authorized", 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Address retrieved successfully",
    address,
  });
});

// ---------- DELETE AN ADDRESS FOR A SINGLE USER  ---------------------------------------------

export const deleteAddress = catchAsyncErrors(async (req, res, next) => {
  const user_id = req.user.user_id;
  const address_id = req.params.id;

  if (!user_id) {
    return next(
      new ErrorHandler("You are not authorized to access this resource", 401)
    );
  }

  const address = await Address.findById(address_id);

  if (!address) {
    return next(new ErrorHandler("Address not found", 404));
  }

  if (address.user.toString() !== user_id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to delete this address", 401)
    );
  }

  await address.deleteOne();

  res.status(200).json({
    success: true,
    message: "Address deleted successfully",
  });
});

export const updateProfilePicture = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.user_id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Delete old profile picture if it exists
  if (user.profile_picture?.public_id) {
    await deleteImage(user.profile_picture.public_id);
  }

  // Upload new profile picture
  const result = await uploadImage(
    req.body.avatar,
    "world_of_minifigs/avatars"
  );

  user.profile_picture = {
    public_id: result.public_id,
    url: result.url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile picture updated successfully",
    user,
  });
});

// ------------------------------------ CONTACT US ------------------------------------
export const contactUs = catchAsyncErrors(async (req, res, next) => {
  const { name, email, message, subject } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }

  // Validate email format
  if (!/\S+@\S+\.\S+/.test(email)) {
    return next(new ErrorHandler("Please enter a valid email address", 400));
  }

  try {
    // Send email to admin with custom subject if provided
    await sendEmail({
      email: process.env.SMTP_USER,
      subject: subject ? subject : `Contact Form Submission`,
      message: ContactFormTemplate({ name, email, message, subject }),
    });

    // Send confirmation email to user
    await sendEmail({
      email: email,
      subject: "Thank you for Contacting World of Minifigs",
      message: `
          <p>Hello ${name},</p>
          <p>We've received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>World of Minifigs Team</p>      
      `,
    });

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    return next(
      new ErrorHandler("Failed to send message. Please try again later.", 500)
    );
  }
});
