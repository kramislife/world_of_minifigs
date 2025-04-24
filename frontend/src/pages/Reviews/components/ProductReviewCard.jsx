import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ReviewImageUpload from "./ReviewImageUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/product/shared/StarRating";

const ProductReviewCard = ({
  item,
  ratings,
  reviews,
  images,
  fileInputRefs,
  showReviewBox,
  handleRating,
  handleReviewChange,
  handleImageUpload,
  handleRemoveImage,
  handleBuyAgain,
  toggleReviewBox,
  isProductEdited,
  processingImages,
  isCompressing,
  existingReview,
}) => {
  const isMobile = window.innerWidth < 640;
  const hasReviewText = Boolean(reviews[item.product._id]);

  const shouldShowReviewBox = !isMobile || showReviewBox || hasReviewText;

  return (
    <div className="p-4 rounded-xl bg-brand-dark/30 border border-brand-end/50">
      <div className="flex flex-col gap-5">
        {/* Product Info */}
        <div className="flex items-start gap-3">
          <div className="relative bg-brand-dark rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover"
            />
            {item.discount > 0 && (
              <div className="absolute top-2 right-2 z-10">
                <Badge variant="accent">{item.discount}% OFF</Badge>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <ProductInfo
              item={item}
              ratings={ratings}
              handleRating={handleRating}
              isProductEdited={isProductEdited}
            />
          </div>
        </div>

        {/* Mobile view actions */}
        {isMobile && (
          <MobileActions
            item={item}
            ratings={ratings}
            handleRating={handleRating}
            handleBuyAgain={handleBuyAgain}
            toggleReviewBox={toggleReviewBox}
            isProductEdited={isProductEdited}
            existingReview={existingReview}
            hasReviewText={hasReviewText}
          />
        )}

        {/* Review Section */}
        {shouldShowReviewBox && (
          <ReviewSection
            productId={item.product._id}
            reviews={reviews}
            handleReviewChange={handleReviewChange}
            isProductEdited={isProductEdited}
          />
        )}

        {/* Image Upload Section */}
        {shouldShowReviewBox && (
          <ReviewImageUpload
            productId={item.product._id}
            images={images}
            fileInputRefs={fileInputRefs}
            handleImageUpload={handleImageUpload}
            handleRemoveImage={handleRemoveImage}
            disabled={isProductEdited}
            processingImages={processingImages}
            isCompressing={isCompressing}
          />
        )}

        {isProductEdited && (
          <div className="text-accent text-sm flex items-center gap-2 mt-3">
            <AlertCircle className="w-4 h-4" />
            This review has already been edited and cannot be modified further.
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-components for better organization
const ProductInfo = ({ item, ratings, handleRating, isProductEdited }) => (
  <>
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
      <p className="font-semibold text-md md:text-lg text-background line-clamp-1">
        {item.name}
      </p>
      <div className="hidden sm:block">
        <StarRating
          rating={ratings[item.product._id] || 0}
          size="lg"
          interactive={!isProductEdited}
          onRatingChange={(rating) => handleRating(item.product._id, rating)}
          disabled={isProductEdited}
        />
      </div>
    </div>
    <PriceInfo item={item} />
    <ProductDetails item={item} />
  </>
);

const PriceInfo = ({ item }) => (
  <div className="flex items-center mt-1 gap-2">
    <span className="font-bold text-emerald-400 text-lg">
      ${(item.quantity * item.discountedPrice).toFixed(2)}
    </span>
    {item.quantity > 1 && (
      <span className="text-xs text-gray-400 line-through">
        ${item.discountedPrice.toFixed(2)} each
      </span>
    )}
  </div>
);

const ProductDetails = ({ item }) => (
  <div className="flex flex-col text-sm text-gray-300 space-y-1 mt-1">
    {item.color && <span>{item.color}</span>}
    {item.includes && <span className="line-clamp-1">{item.includes}</span>}
    <span>Quantity: {item.quantity}</span>
  </div>
);

const MobileActions = ({
  item,
  ratings,
  handleRating,
  handleBuyAgain,
  toggleReviewBox,
  isProductEdited,
  existingReview,
  hasReviewText,
}) => (
  <div className="sm:hidden space-y-4">
    <div className="flex items-center justify-between gap-2">
      <span className="text-gray-200 font-semibold text-lg">Quick Review</span>
      <StarRating
        rating={ratings[item.product._id] || 0}
        size="lg"
        interactive={!isProductEdited}
        onRatingChange={(rating) => handleRating(item.product._id, rating)}
        disabled={isProductEdited}
      />
    </div>
    <div className="flex gap-2">
      <Button
        variant="cart"
        className="w-full hover:scale-100 text-background"
        onClick={handleBuyAgain}
      >
        Buy Again
      </Button>
      {!hasReviewText && (
        <Button
          variant="accent"
          className="w-full hover:scale-100"
          onClick={toggleReviewBox}
          disabled={isProductEdited}
        >
          {existingReview ? "Update Review" : "Write a Review"}
        </Button>
      )}
    </div>
  </div>
);

const ReviewSection = ({
  productId,
  reviews,
  handleReviewChange,
  isProductEdited,
}) => (
  <div className="w-full text-background">
    <div className="flex items-center justify-between my-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Write a Feedback</span>
      </div>
      <span
        className={`text-sm ${
          reviews[productId]?.length > 450 ? "text-red-500" : "text-gray-300"
        }`}
      >
        {reviews[productId]?.length || 0}/500
      </span>
    </div>
    <Textarea
      placeholder="Share your thoughts"
      maxLength={500}
      className="min-h-32 md:min-h-24 bg-transparent placeholder:text-gray-200"
      value={reviews[productId] || ""}
      onChange={(e) => handleReviewChange(productId, e.target.value)}
      disabled={isProductEdited}
    />
  </div>
);

export default ProductReviewCard;
