import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/product/shared/FallbackStates";
import StarRating from "@/components/product/shared/StarRating";
import { useProductCard } from "@/hooks/Product/useProductCard";

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
      className="group cursor-pointer relative"
    >
      {/* Discount Badge */}
      {product?.discount > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="accent">{product.discount}% OFF</Badge>
        </div>
      )}

      {/* Card Header with Image */}
      <CardHeader className="space-y-0 p-0 relative aspect-square overflow-hidden rounded-t-lg">
        {hasImages ? (
          <>
            <img
              src={imagesList[0]?.url}
              alt={product.product_name || "Product Image"}
              className={`object-cover transition-all duration-500 absolute inset-0 ${
                isHovering ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              src={imagesList[currentImageIndex]?.url}
              alt={`${product.product_name} variant`}
              className={`object-cover transition-all duration-500 absolute inset-0 ${
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
      </CardHeader>

      {/* Card Content with Name, Price, Rating */}
      <CardContent className="px-3 pt-5 flex flex-col gap-2 text-background">
        <h3 className="text-md font-semibold line-clamp-1">
          {product?.product_name || "Unnamed Product"}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
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
      </CardContent>

      {/* Card Footer with Ratings */}
      <CardFooter className="px-3">
        <div className="flex items-center gap-2">
          <StarRating rating={Number(reviewStats.averageRating)} size="sm" />
          <span className="text-sm text-gray-400">
            ({reviewStats.totalReviews})
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
