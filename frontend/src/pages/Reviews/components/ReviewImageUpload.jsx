import { ImagePlus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReviewImageUpload = ({
  productId,
  images,
  fileInputRefs,
  handleImageUpload,
  handleRemoveImage,
  disabled,
}) => {
  const currentImages = images[productId] || [];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-background">Add Photos</span>
        <span className="text-sm text-gray-300">
          {currentImages.length}/3 images
        </span>
      </div>

      {/* Upload Button - When no images */}
      {currentImages.length === 0 && (
        <UploadButton
          productId={productId}
          fileInputRefs={fileInputRefs}
          handleImageUpload={(e) => handleImageUpload(productId, e)}
          disabled={disabled}
          fullWidth
        />
      )}

      {/* Image Preview Grid */}
      {currentImages.length > 0 && (
        <div className="flex gap-3">
          {/* Existing Images */}
          {currentImages.map((image, index) => (
            <ImagePreview
              key={`${productId}-${index}`}
              image={image}
              index={index}
              disabled={disabled}
              onRemove={() => handleRemoveImage(productId, index)}
            />
          ))}

          {/* Upload Button - When there are existing images */}
          {currentImages.length < 3 && (
            <UploadButton
              productId={productId}
              fileInputRefs={fileInputRefs}
              handleImageUpload={(e) => handleImageUpload(productId, e)}
              disabled={disabled}
            />
          )}
        </div>
      )}
    </div>
  );
};

const ImagePreview = ({ image, index, disabled, onRemove }) => (
  <div className="relative w-36 h-36 rounded-lg overflow-hidden border border-brand-end/50">
    <img
      src={typeof image === "string" ? image : URL.createObjectURL(image)}
      alt={`Review ${index + 1}`}
      className="w-full h-full object-cover"
      onLoad={(e) => {
        if (typeof image !== "string") {
          URL.revokeObjectURL(e.target.src);
        }
      }}
    />
    {!disabled && (
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-1 right-1 w-6 h-6"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <X className="w-4 h-4" />
      </Button>
    )}
  </div>
);

const UploadButton = ({
  productId,
  fileInputRefs,
  handleImageUpload,
  disabled,
  fullWidth = false,
}) => (
  <>
    <input
      type="file"
      accept="image/*"
      multiple
      className="hidden"
      onChange={handleImageUpload}
      ref={(el) => (fileInputRefs.current[productId] = el)}
      disabled={disabled}
    />
    <Button
      variant="ghost"
      className={`${
        fullWidth ? "w-full" : "aspect-square"
      } rounded-lg border-2 border-dashed border-brand-end hover:border-blue-400 hover:bg-brand-dark/30 text-gray-300 min-h-[145px]`}
      onClick={() => fileInputRefs.current[productId]?.click()}
      disabled={disabled}
    >
      <div className="flex flex-col items-center gap-3">
        <ImagePlus className="w-8 h-8" />
        <span className="text-sm">Add Photos</span>
        {fullWidth && (
          <span className="text-xs text-gray-400">
            Drag and drop or click to upload
          </span>
        )}
      </div>
    </Button>
  </>
);

export default ReviewImageUpload;
