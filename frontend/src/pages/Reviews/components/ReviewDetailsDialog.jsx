import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

const ReviewDetailsDialog = ({ open, onOpenChange, review }) => {
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
            <div>
              <h2 className="text-2xl font-bold text-white">Your Review</h2>
              <p className="text-sm text-gray-400 mt-1">
                Submitted on {format(new Date(review.createdAt), "PPP")}
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {review.products.map((product) => (
              <div
                key={product.product}
                className="p-6 rounded-xl bg-white/5 border border-gray-700"
              >
                {/* Product Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {product.productName}
                    </h3>
                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
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

                  {/* Votes */}
                  <div className="flex items-center gap-4">
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
                </div>

                {/* Review Text */}
                <div className="mt-4">
                  <p className="text-gray-300">
                    {product.editedReviewText || product.reviewText}
                  </p>
                  {product.isEdited && (
                    <p className="text-xs text-yellow-400 mt-2">
                      (Edited on {format(new Date(product.editedAt), "PPP")})
                    </p>
                  )}
                </div>

                {/* Review Images */}
                {product.images && product.images.length > 0 && (
                  <div className="mt-4">
                    <div className="flex gap-2">
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={`Review ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDetailsDialog;
