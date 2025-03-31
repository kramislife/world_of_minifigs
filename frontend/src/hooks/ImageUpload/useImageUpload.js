import { useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

/**
 * Custom hook for handling image uploads with compression
 * Options:
 * - maxSizeMB: Maximum file size in MB (default: 1)
 * - maxWidthOrHeight: Maximum width or height in pixels (default: 1920)
 * - onSuccess: Callback when image is successfully processed
 * - useWebWorker: Use web worker for compression (default: true)
 * - maxFileSize: Maximum file size in bytes before compression (default: 5MB)
 */
export const useImageUpload = (options = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    maxSizeMB = 1,
    maxWidthOrHeight = 1920,
    onSuccess,
    useWebWorker = true,
    maxFileSize = 5 * 1024 * 1024, // 5MB default max file size
  } = options;

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size before compression
    if (file.size > maxFileSize) {
      toast.error(
        `Image is too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB.`
      );
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    try {
      // Compression options
      const compressionOptions = {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker,
        onProgress: (progress) => {
          setUploadProgress(10 + Math.round(progress * 80));
        },
      };

      setUploadProgress(20);
      const compressedFile = await imageCompression(file, compressionOptions);
      setUploadProgress(90);

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadProgress(100);
        if (onSuccess && typeof onSuccess === "function") {
          onSuccess(reader.result);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error(`Error processing image: ${error.message}`);
      setIsUploading(false);
    }
  };

  const handleDrop = async (acceptedFiles) => {
    if (acceptedFiles?.[0]) {
      const file = acceptedFiles[0];

      // Check file size before compression
      if (file.size > maxFileSize) {
        toast.error(
          `Image is too large. Maximum size is ${
            maxFileSize / (1024 * 1024)
          }MB.`
        );
        return;
      }

      setIsUploading(true);
      setUploadProgress(10);

      try {
        // Compression options
        const compressionOptions = {
          maxSizeMB,
          maxWidthOrHeight,
          useWebWorker,
          onProgress: (progress) => {
            setUploadProgress(10 + Math.round(progress * 80));
          },
        };

        setUploadProgress(20);
        const compressedFile = await imageCompression(file, compressionOptions);
        setUploadProgress(90);

        // Convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadProgress(100);
          if (onSuccess && typeof onSuccess === "function") {
            onSuccess(reader.result);
          }
          setIsUploading(false);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error processing image:", error);
        toast.error(`Error processing image: ${error.message}`);
        setIsUploading(false);
      }
    }
  };

  return {
    handleImageUpload,
    handleDrop,
    isUploading,
    uploadProgress,
  };
};
