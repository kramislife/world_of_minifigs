import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ReviewImageUpload from "./ReviewImageUpload";

const ProductReviewCard = ({
  item,
  ratings,
  reviews,
  images,
  fileInputRefs,
  handleRating,
  handleReviewChange,
  handleImageUpload,
  handleRemoveImage,
  isEdited = {},
}) => {
  const productIsEdited = isEdited?.[item.product._id] || false;

  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-indigo-400/20 shadow-lg transition-all hover:border-indigo-400/40">
      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          {/* Item image and discount */}
          <div className="relative group">
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-lg shadow-md transform transition-transform group-hover:scale-105"
            />
            {item.discount > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                {item.discount}% OFF
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                {/* Item name */}
                <h3 className="text-xl font-semibold text-white">
                  {item.name}
                </h3>

                {/* Item rating */}
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRating(item.product._id, star)}
                      disabled={productIsEdited}
                      className={`transition-transform hover:scale-110 focus:outline-none ${
                        productIsEdited ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      <Star
                        size={28}
                        fill={
                          (ratings[item.product._id] || 0) >= star
                            ? "rgb(250 204 21)"
                            : "none"
                        }
                        className={
                          (ratings[item.product._id] || 0) >= star
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Item discounted price and original price */}
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-white">
                  ${item.discountedPrice?.toFixed(2)}
                </span>
                {item.discount > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ${item.price?.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Item quantity */}
              <div className="mt-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-indigo-300">Quantity:</span>
                  <span className="text-sm text-white">{item.quantity}</span>
                </div>
              </div>

              {/* Item color */}
              {item.color && (
                <span className="text-sm text-indigo-300 mt-1">
                  Color: {item.color}
                </span>
              )}

              {/* Item includes */}
              {item.includes && (
                <span className="text-sm text-indigo-300 mt-1">
                  Includes: {item.includes}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Item review */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-md font-medium text-indigo-200">
                Your Review
              </span>
              <span className="text-xs text-red-400">*</span>
            </div>
            <span
              className={`text-sm ${
                reviews[item.product._id]?.length > 450
                  ? "text-orange-300"
                  : "text-gray-400"
              }`}
            >
              {reviews[item.product._id]?.length || 0}/500
            </span>
          </div>
          <Textarea
            placeholder="What did you like or dislike about this product? How was the quality, comfort, and overall experience?"
            className={`w-full min-h-[120px] bg-indigo-950/30 border-indigo-500/30 rounded-lg resize-none text-white placeholder:text-indigo-300/70 focus:border-indigo-400 shadow-inner ${
              productIsEdited ? "opacity-50 cursor-not-allowed" : ""
            }`}
            maxLength={500}
            value={reviews[item.product._id] || ""}
            onChange={(e) =>
              handleReviewChange(item.product._id, e.target.value)
            }
            disabled={productIsEdited}
          />
        </div>

        {/* Item image upload */}
        <ReviewImageUpload
          productId={item.product._id}
          images={images}
          fileInputRefs={fileInputRefs}
          handleImageUpload={handleImageUpload}
          handleRemoveImage={handleRemoveImage}
          disabled={productIsEdited}
        />

        {productIsEdited && (
          <div className="mt-4 p-2 bg-yellow-900/40 border border-yellow-600/50 rounded text-yellow-300 text-sm">
            This review has already been edited and cannot be modified further.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviewCard;
