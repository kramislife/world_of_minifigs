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
        <span className="text-md font-medium text-white">
          Add Photos (Optional)
        </span>
        <span className="text-sm text-gray-400">
          {currentImages.length}/3 images
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
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

        {/* Upload Button */}
        {currentImages.length < 3 && (
          <UploadButton
            productId={productId}
            fileInputRefs={fileInputRefs}
            handleImageUpload={(e) => handleImageUpload(productId, e)}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};

const ImagePreview = ({ image, index, disabled, onRemove }) => (
  <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-brand-end/50">
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
      variant="outline"
      className="w-24 h-24 border-dashed"
      onClick={() => fileInputRefs.current[productId]?.click()}
      disabled={disabled}
    >
      <div className="flex flex-col items-center gap-2">
        <ImagePlus className="w-6 h-6" />
        <span className="text-xs">Add Photos</span>
      </div>
    </Button>
  </>
);

export default ReviewImageUpload;
