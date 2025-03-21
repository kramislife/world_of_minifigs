import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarRating from "@/components/product/shared/StarRating";
import { PlaceholderImage } from "@/components/product/shared/FallbackStates";
import { useGetProductReviewsQuery } from "@/redux/api/reviewApi";
import { Button } from "../ui/button";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  // Get reviews for this product
  const { data: reviewsData } = useGetProductReviewsQuery(product?._id, {
    skip: !product?._id,
  });

  // Get review stats
  const reviewStats = reviewsData?.stats || {
    averageRating: 0,
    totalReviews: 0,
  };

  // Check if the product has images otherwise show the placeholder image
  const hasImages =
    product?.product_images && product.product_images.length > 0;

  // Function to handle the "View Details" button click
  const handleViewDetails = () => {
    const path = category
      ? `/products/${category}/${product?._id}`
      : `/products/${product?._id}`;
    navigate(path);
  };

  return (
    <div
      onClick={handleViewDetails}
      className="bg-[#4f5e73] text-slate-100 border border-[#32475f] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-100 group relative cursor-pointer"
    >
      {/* Discount Badge */}
      {product?.discount > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-accent px-3 py-1.5 rounded-full text-[#32475f] text-sm font-medium shadow-lg">
            {product.discount}% OFF
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        {hasImages ? (
          <img
            src={product.product_images[0].url}
            alt={product.product_name || "Product Image"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <PlaceholderImage />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <Button
          onClick={(e) => e.stopPropagation()}
          variant="accent"
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-foreground px-6 py-2.5 rounded-full font-medium shadow-lg transition-all duration-300 ease-out pointer-events-none"
        >
          View Details
        </Button>
      </div>

      {/* Product Name */}
      <div className="p-5 flex flex-col gap-5">
        <h3 className="text-lg font-semibold transition-colors line-clamp-1">
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
                  <p className="text-sm text-slate-500 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-slate-500">$0.00</p>
            )}
          </div>

          {/* Ratings */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <StarRating rating={Number(reviewStats.averageRating)} />
              <span className="text-sm text-slate-300/70">
                ({reviewStats.totalReviews})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
