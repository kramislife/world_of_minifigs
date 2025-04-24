import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/product/shared/StarRating";

const ReviewDetailsDialog = ({ open, onOpenChange, review, order }) => {
  if (!review || !order) return null;

  // Map order items to review products for displaying full product details
  const getOrderItemForProduct = (productId) => {
    return order.orderItems.find((item) => item.product._id === productId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Your Review</DialogTitle>
          <DialogDescription className="text-gray-300 text-xs md:text-sm">
            Order #{order._id} • Submitted on{" "}
            {format(new Date(review.createdAt), "PPP")}
          </DialogDescription>
        </DialogHeader>

        {/* Reviews */}
        <div className="space-y-5">
          {review.products.map((product) => {
            const orderItem = getOrderItemForProduct(product.product);

            return (
              <div
                key={product.product}
                className="p-5 rounded-md bg-brand-dark/30 border border-brand-end/50"
              >
                {/* Product Info with Image - Similar to ProductReviewCard layout */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    {/* Item image and discount */}
                    {orderItem && (
                      <div className="relative bg-brand-dark rounded-lg overflow-hidden">
                        <img
                          src={orderItem.image}
                          alt={orderItem.name}
                          className="w-32  h-32 object-cover"
                        />
                        {orderItem.discount > 0 && (
                          <div className="absolute top-2 right-2 z-10">
                            <Badge variant="discount">
                              {orderItem.discount}% OFF
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      {/* Product name and rating */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <h3 className="font-semibold text-md md:text-lg text-background line-clamp-1">
                          {product.productName}
                        </h3>

                        {/* Star rating - ONLY VISIBLE ON LARGE SCREENS */}
                        <div className="hidden sm:block">
                          <StarRating rating={product.rating} size="lg" />
                        </div>
                      </div>

                      {/* Price section */}
                      {orderItem && (
                        <div className="flex items-center mt-1 gap-2">
                          <span className="font-bold text-emerald-400 text-lg">
                            $
                            {(
                              orderItem.quantity * orderItem.discountedPrice
                            ).toFixed(2)}
                          </span>

                          {orderItem.quantity > 1 && (
                            <span className="text-xs text-gray-400 line-through">
                              ${orderItem.discountedPrice.toFixed(2)} each
                            </span>
                          )}
                        </div>
                      )}

                      {/* Item details */}
                      {orderItem && (
                        <div className="flex flex-col text-sm text-gray-300 space-y-1 mt-1">
                          {orderItem.color && <span>{orderItem.color}</span>}
                          {orderItem.includes && (
                            <span className="line-clamp-1">
                              {orderItem.includes}
                            </span>
                          )}
                          <span>Quantity: {orderItem.quantity}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Review Text with Votes */}
                  <div className="w-full border-t border-brand-end/30 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-md font-medium text-indigo-200 hidden sm:block">
                          Your Review
                        </h4>

                        {/* Star rating - ONLY VISIBLE ON SMALL SCREENS */}
                        <div className="sm:hidden">
                          <StarRating rating={product.rating} size="md" />
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

                    <p className="text-gray-300 bg-transparent rounded-md">
                      {product.editedReviewText ||
                        product.reviewText ||
                        "No written review provided."}
                    </p>
                  </div>

                  {/* Review Images */}
                  {product.images && product.images.length > 0 && (
                    <div className="w-full">
                      <div className="flex flex-wrap gap-3">
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
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDetailsDialog;
