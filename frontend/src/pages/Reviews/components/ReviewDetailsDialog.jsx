import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

const ReviewDetailsDialog = ({ open, onOpenChange, review, order }) => {
  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-5xl max-h-[90vh] overflow-y-auto bg-brand border-none 
        scrollbar-none rounded-xl shadow-2xl py-6 px-6"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-white">Your Review</h2>
            <p className="text-sm text-gray-400">
              Submitted on {format(new Date(review.createdAt), "PPP")}
            </p>
          </div>

          {/* Reviews */}
          <div className="space-y-8">
            {review.products.map((product) => {
              // Find matching order item to get additional details
              const orderItem = order?.orderItems?.find(
                (item) => item.product._id === product.product
              );

              return (
                <div
                  key={product.product}
                  className="p-6 rounded-xl bg-white/5 border border-gray-700 hover:border-gray-600 transition-colors duration-200"
                >
                  {/* Product Info with Image and Details */}
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative group">
                      <img
                        src={
                          orderItem?.image || "https://via.placeholder.com/128"
                        }
                        alt={orderItem?.name || product.productName}
                        className="w-36 h-36 object-cover rounded-lg shadow-md transform transition-transform group-hover:scale-105"
                      />
                      {orderItem?.discount > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                          {orderItem.discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col">
                        {/* Product Name and Rating */}
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-white">
                            {orderItem?.name || product.productName}
                          </h3>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                className={`w-5 h-5 ${
                                  index < product.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-500"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="mt-2 space-y-1">
                          {/* Price with discount */}
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-semibold text-green-400">
                              ${orderItem?.discountedPrice?.toFixed(2)}
                            </span>
                            {orderItem?.discount > 0 && (
                              <span className="text-sm text-gray-400 line-through">
                                ${orderItem?.price?.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-indigo-300">
                              Quantity:
                            </span>
                            <span className="text-sm text-white">
                              {orderItem?.quantity}
                            </span>
                          </div>

                          {/* Color */}
                          {orderItem?.color && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-indigo-300">
                                Color:
                              </span>
                              <span className="text-sm text-white">
                                {orderItem.color}
                              </span>
                            </div>
                          )}

                          {/* Includes */}
                          {orderItem?.includes && (
                            <div className="flex items-center gap-2 col-span-2">
                              <span className="text-sm text-indigo-300">
                                Includes:
                              </span>
                              <span className="text-sm text-white">
                                {orderItem.includes}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mt-6 space-y-4">
                    {/* Review Text */}
                    <div className="bg-white/5 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-300">
                        {product.editedReviewText || product.reviewText}
                      </p>

                      {/* Votes */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-gray-400">
                            {product.helpfulVotes?.length || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsDown className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-gray-400">
                            {product.unhelpfulVotes?.length || 0}
                          </span>
                        </div>
                      </div>

                      {product.isEdited && (
                        <p className="text-xs text-yellow-400 mt-2">
                          (Edited on {format(new Date(product.editedAt), "PPP")}
                          )
                        </p>
                      )}
                    </div>

                    {/* Review Images */}
                    {product.images && product.images.length > 0 && (
                      <div className="flex gap-2">
                        {product.images.map((image, index) => (
                          <img
                            key={index}
                            src={image.url}
                            alt={`Review ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg shadow-md hover:opacity-90 transition-opacity cursor-pointer"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDetailsDialog;
