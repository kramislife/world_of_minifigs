import { v2 as cloudinary } from "cloudinary"; // Correctly importing Cloudinary
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CLOUDINARY UPLOAD AVATAR IMAGE FILE
export const upload_single_image = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto", // Ensures auto-detection of file type
        folder: folder,
      },
      (error, result) => {
        if (error) {
          reject(error); // Reject promise if there is an error
        } else {
          resolve({
            public_id: result.public_id,
            url: result.url,
          });
        }
      }
    );
  });
};

// CLOUDINARY FILE DELETE
export const delete_user_avatar_file = async (file) => {
  try {
    const res = await cloudinary.uploader.destroy(file);
    if (res.result === "ok") {
      return true;
    } else {
      return false; // Return false if deletion failed
    }
  } catch (error) {
    throw new Error(`Failed to delete the file: ${error.message}`);
  }
};

// UPLOAD PRODUCT IMAGES

export const upload_product_images = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder: folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            public_id: result.public_id,
            url: result.url,
          });
        }
      }
    );
  });
};
