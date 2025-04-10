import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/product/shared/StarRating";
import { PlaceholderImage } from "@/components/product/shared/FallbackStates";
import { useProductCard } from "@/hooks/Product/useProductCard";
import { Badge } from "../ui/badge";

const ProductCard = ({ product }) => {
  const {
    currentImageIndex,
    isHovering,
    imagesList,
    hasImages,
    reviewStats,
    handleMouseEnter,
    handleMouseLeave,
    handleViewDetails,
  } = useProductCard(product);

  return (
    <Card
      onClick={handleViewDetails}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-brand-dark/50 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-100 group relative cursor-pointer h-full flex flex-col border-none" 
    >
      {/* Discount Badge */}
      {product?.discount > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="discount">
            {product.discount}% OFF
          </Badge>
        </div>
      )}

      {/* Product Image Container */}
      <CardContent className="p-0 relative w-full aspect-square overflow-hidden">
        {hasImages ? (
          <>
            {/* Main Image */}
            <img
              src={imagesList[0]?.url}
              alt={product.product_name || "Product Image"}
              className={`w-full h-full object-cover transition-all duration-500 absolute inset-0 ${
                isHovering ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Image shown during hover */}
            <img
              src={imagesList[currentImageIndex]?.url}
              alt={`${product.product_name} variant`}
              className={`w-full h-full object-cover transition-all duration-500 absolute inset-0 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <PlaceholderImage />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <Button onClick={(e) => e.stopPropagation()} variant="popup">
          View Details
        </Button>
      </CardContent>

      {/* Product Info */}
      <CardContent className="p-5 flex flex-col gap-5 flex-grow text-white">
        <h3 className="text-md font-semibold transition-colors line-clamp-1">
          {product?.product_name || "Unnamed Product"}
        </h3>

        {/* Pricing and Ratings */}
        <div className="flex flex-col gap-3 mt-auto">
          {/* Pricing */}
          <div className="flex items-baseline justify-between">
            {product?.price ? (
              <>
                <p className="text-2xl font-bold text-accent">
                  ${(product?.discounted_price || 0).toFixed(2)}
                </p>
                {product?.discount > 0 && (
                  <p className="text-sm text-gray-300 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </>
            ) : (
              <p className="text-2xl font-bold text-accent">$0.00</p>
            )}
          </div>

          {/* Ratings */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <StarRating rating={Number(reviewStats.averageRating)} />
              <span className="text-sm text-gray-300/80">
                ({reviewStats.totalReviews})
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
