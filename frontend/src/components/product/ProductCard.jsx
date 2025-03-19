import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarRating from "@/components/product/shared/StarRating";
import { PlaceholderImage } from "@/components/product/shared/FallbackStates";
import { useGetProductReviewsQuery } from "@/redux/api/reviewApi";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  // Get reviews for this product
  const { data: reviewsData } = useGetProductReviewsQuery(product?._id, {
    skip: !product?._id,
  });

  // Calculate review stats
  const { averageRating, totalReviews } = React.useMemo(() => {
    if (!reviewsData?.reviews?.length)
      return { averageRating: 0, totalReviews: 0 };

    let totalRating = 0;
    let validReviewCount = 0;

    reviewsData.reviews.forEach((review) => {
      review.products.forEach((prod) => {
        if (prod.product.toString() === product._id.toString()) {
          totalRating += prod.rating;
          validReviewCount++;
        }
      });
    });

    return {
      averageRating:
        validReviewCount > 0 ? (totalRating / validReviewCount).toFixed(1) : 0,
      totalReviews: validReviewCount,
    };
  }, [reviewsData, product?._id]);

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
      className="bg-brand-gradient/80 text-slate-100 border border-slate-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-100 group relative cursor-pointer"
    >
      {/* Discount Badge */}
      {product?.discount > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-red-700 to-red-500 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
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

        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-full font-medium shadow-lg transition-all duration-300 ease-out pointer-events-none"
        >
          View Details
        </button>
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
                <p className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
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
              <StarRating rating={Number(averageRating)} />
              <span className="text-sm text-slate-300/70">
                ({totalReviews})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
