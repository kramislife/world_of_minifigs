import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Banner from "../models/banner.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";
import { uploadImage, deleteImage } from "../Utills/cloudinary.js";

// Get all banners
export const getAllBanners = catchAsyncErrors(async (req, res) => {
  const banners = await Banner.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    message: "Banners fetched successfully",
    banners,
  });
});

// Create new banner
export const createBanner = catchAsyncErrors(async (req, res, next) => {
  const imageFile = req.body.image;

  if (!imageFile) {
    return next(new ErrorHandler("Please upload an image", 400));
  }

  // Upload image to cloudinary
  const uploadedImage = await uploadImage(
    imageFile,
    "world_of_minifigs/banners"
  );

  const banner = await Banner.create({
    image: {
      public_id: uploadedImage.public_id,
      url: uploadedImage.url,
    },
    created_by: req.user.user_id,
  });

  res.status(201).json({
    success: true,
    message: "Banner created successfully",
    banner,
  });
});

// Update banner
export const updateBanner = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { isActive } = req.body;
  const imageFile = req.body.image;

  let banner = await Banner.findById(id);
  if (!banner) {
    return next(new ErrorHandler("Banner not found", 404));
  }

  const updateData = {
    isActive,
    updated_by: req.user.user_id,
  };

  if (imageFile) {
    // Delete old image and upload new one 
    await deleteImage(banner.image.public_id);
    const uploadedImage = await uploadImage(
      imageFile,
      "world_of_minifigs/banners"
    );
    updateData.image = {
      public_id: uploadedImage.public_id,
      url: uploadedImage.url,
    };
  }

  banner = await Banner.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Banner updated successfully",
    banner,
  });
});

// Delete banner
export const deleteBanner = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const banner = await Banner.findById(id);
  if (!banner) {
    return next(new ErrorHandler("Banner not found", 404));
  }

  // Delete image from cloudinary 
  await deleteImage(banner.image.public_id);

  // Delete banner from database
  await Banner.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Banner deleted successfully",
  });
});
