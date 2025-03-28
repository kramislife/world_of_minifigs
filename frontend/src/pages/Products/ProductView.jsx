import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "@/components/product/shared/ProductDetails";
import ProductRating from "@/components/product/shared/ProductRating";
import ProductSpecification from "@/components/product/shared/ProductSpecification";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useGetProductDetailsQuery } from "@/redux/api/productApi";
import { useGetProductReviewsQuery } from "@/redux/api/reviewApi";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { productViewAnimations } from "@/hooks/Animation/animationConfig";

const ProductView = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProductDetailsQuery(id);

  // Fetch product reviews
  const { data: reviewsData } = useGetProductReviewsQuery(id, {
    skip: !id,
  });

  // Get review stats
  const reviewStats = reviewsData?.stats || {
    averageRating: 0,
    totalReviews: 0,
  };

  // Combine current product with similar products for display
  const similarProducts = useMemo(() => {
    if (!data?.product || !data?.similarProducts?.length) return null;

    // Make sure current product is included in similar products list
    const allProducts = [data.product, ...data.similarProducts].filter(
      (item, index, self) => index === self.findIndex((t) => t._id === item._id)
    );

    // Only return if we have more than one product (meaning we have similar products)
    return allProducts.length > 1 ? allProducts : null;
  }, [data?.product, data?.similarProducts]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [error, isError]);

  return (
    <>
      <Metadata title={data?.product?.product_name || "Product Details"} />
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="min-h-screen bg-brand-gradient">
          {/* Product Details */}
          <ProductDetails
            product={data?.product}
            similarProducts={similarProducts}
            containerVariants={productViewAnimations.containerVariants}
            itemVariants={productViewAnimations.itemVariants}
            reviewStats={reviewStats}
          />

          {/* Product Specification */}
          <ProductSpecification product={data?.product} />

          {/* Product Rating */}
          <ProductRating product={data?.product} reviewStats={reviewStats} />
        </div>
      )}
    </>
  );
};

export default ProductView;
