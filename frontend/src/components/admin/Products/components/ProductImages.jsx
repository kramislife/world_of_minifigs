import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductImageMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from "@/redux/api/productApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Upload, X, Info, Trash, Loader2 } from "lucide-react";
import Metadata from "@/components/layout/Metadata/Metadata";
import { toast } from "react-toastify";
import { useImageUpload } from "@/hooks/ImageUpload/useImageUpload";

const ProductImages = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [processingImages, setProcessingImages] = useState(0);

  const { data } = useGetProductDetailsQuery(params?.id);
  const [
    uploadProductImages,
    { isLoading, error, isError, isSuccess, data: uploadData },
  ] = useUploadProductImagesMutation();
  const [
    deleteProductImage,
    { isSuccess: isDeleteSuccess, error: deleteError, data: deleteData },
  ] = useDeleteProductImageMutation();

  // Use our standardized image upload hook
  const { handleImageUpload: processImage, isUploading: isCompressing } =
    useImageUpload({
      maxSizeMB: 0.8, // Smaller size for product images
      maxWidthOrHeight: 1200, // High enough resolution for product display
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      onSuccess: (imageData) => {
        setImagesPreview((prev) => [...prev, imageData]);
        setImages((prev) => [...prev, imageData]);
        setProcessingImages((prev) => Math.max(0, prev - 1));
      },
    });

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.product_images);
    }
    if (isError) toast.error(error?.data?.message);
    if (isSuccess) {
      toast.success(uploadData?.message || "Images uploaded successfully");
      setImagesPreview([]);
      navigate("/admin/products");
    }
  }, [data, isError, isSuccess, error, uploadData]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success(deleteData?.message || "Image deleted successfully");
      setUploadedImages(deleteData?.product?.product_images || []);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message || "Failed to delete image");
    }
  }, [isDeleteSuccess, deleteError, deleteData]);

  const handleProductImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const remainingSlots = 10 - (uploadedImages.length + imagesPreview.length);

    if (uploadedFiles.length > remainingSlots) {
      toast.warning(
        `You can only upload ${remainingSlots} more image${
          remainingSlots !== 1 ? "s" : ""
        }`
      );
      return;
    }

    // Update processing count to show loading state
    setProcessingImages(uploadedFiles.length);

    // Process each file with the hook
    uploadedFiles.forEach((file) => {
      // Create a mock event object for each file
      const mockEvent = { target: { files: [file] } };
      processImage(mockEvent);
    });
  };

  const handleImagePreviewDelete = (image) => {
    setImages((prev) => prev.filter((img) => img !== image));
    setImagesPreview((prev) => prev.filter((img) => img !== image));
  };

  const handleDelete = (imgId) => {
    deleteProductImage({ id: params?.id, body: { public_id: imgId } });
  };

  // Determine if we're in a loading state
  const isProcessing = isCompressing || processingImages > 0;

  return (
    <>
      <Metadata title="Product Images" />

      <Card className="bg-brand-start shadow-none">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            uploadProductImages({ id: params?.id, body: { images } });
          }}
        >
          <CardHeader className="text-background space-y-2">
            <CardTitle className="text-3xl font-bold">
              Product Image Gallery
            </CardTitle>
            <CardDescription className="flex items-center justify-between">
              <span className="text-gray-300 text-base">
                Manage product images and upload new ones
              </span>
              <div className="flex items-center gap-2 text-blue-400">
                <Info className="w-4 h-4" />
                <span className="text-sm">
                  First image will be the main display (
                  {uploadedImages.length + imagesPreview.length}/10)
                </span>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 space-y-8">
            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* Upload Button - Always First */}
              {uploadedImages.length + imagesPreview.length < 10 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className={`aspect-square rounded-lg border-2 border-dashed border-brand-end/50 flex flex-col items-center justify-center gap-2 hover:border-blue-500 transition-colors group ${
                    isProcessing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform text-gray-300">
                    {isProcessing ? (
                      <>
                        <div className="w-8 h-8 border-2 border-brand-end/50 border-t-accent rounded-full animate-spin"></div>
                        <span className="text-sm text-accent">
                          Processing...
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 group-hover:text-blue-500" />
                        <span className="text-sm group-hover:text-blue-500">
                          Add Image
                        </span>
                      </>
                    )}
                  </div>
                </button>
              )}

              {/* Uploaded Images */}
              {uploadedImages.map((img, index) => (
                <div
                  key={index}
                  className={`relative group aspect-square rounded-lg overflow-hidden cursor-pointer
                    ${index === 0 ? "ring-2 ring-red-500" : "ring-2"}
                  `}
                >
                  <img
                    src={img.url}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(img?.public_id)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                  {index === 0 ? (
                    <div className="absolute top-2 left-2 bg-red-500 px-3 pb-1 rounded-md">
                      <span className="text-xs text-white font-medium">
                        Main
                      </span>
                    </div>
                  ) : (
                    <div className="absolute top-2 left-2 bg-blue-500 px-3 pb-1 rounded-md">
                      <span className="text-xs text-white font-medium">
                        Thumbnail {index}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {/* Preview Images */}
              {imagesPreview.map((img, index) => (
                <div
                  key={`preview-${index}`}
                  className="relative group aspect-square rounded-lg overflow-hidden ring-2 ring-slate-700 cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleImagePreviewDelete(img)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2 bg-green-600 px-3 pb-1 rounded-md">
                    <span className="text-xs text-white font-medium">New</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleProductImageUpload}
              multiple
              accept="image/*"
              disabled={isProcessing}
            />

            {/* Upload Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="accent"
                disabled={images.length <= 0 || isLoading || isProcessing}
              >
                {isLoading || isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isLoading ? "Uploading..." : "Processing..."}
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </>
  );
};

export default ProductImages;
