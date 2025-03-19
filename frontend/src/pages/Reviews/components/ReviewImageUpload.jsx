import { Camera, X } from "lucide-react";

const ReviewImageUpload = ({
  productId,
  images,
  fileInputRefs,
  handleImageUpload,
  handleRemoveImage,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3">
        {(!images[productId] || images[productId].length < 3) && (
          <button
            type="button"
            onClick={() => fileInputRefs.current[productId].click()}
            className="w-24 h-24 flex flex-col items-center justify-center bg-indigo-900/30 border-2 border-dashed border-indigo-400/40 rounded-lg hover:border-indigo-400 hover:bg-indigo-800/30 transition-all group"
          >
            <Camera className="w-8 h-8 text-indigo-300 mb-1 group-hover:text-indigo-200" />
            <span className="text-xs text-indigo-300 group-hover:text-indigo-200">
              Add Photos
            </span>
          </button>
        )}

        {images[productId]?.map((img, index) => (
          <div key={index} className="relative w-24 h-24 group">
            <img
              src={img}
              alt={`Review ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all rounded-lg"></div>
            <button
              type="button"
              onClick={() => handleRemoveImage(productId, index)}
              className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}

        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={(el) => (fileInputRefs.current[productId] = el)}
          onChange={(e) => handleImageUpload(productId, e)}
        />
      </div>

      <p className="text-xs text-indigo-300/80 mt-3">
        Share up to 3 photos to help other shoppers (PNG, JPG)
      </p>
    </div>
  );
};

export default ReviewImageUpload;
