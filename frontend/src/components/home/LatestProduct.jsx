import React from "react";
import ProductGrid from "@/components/product/shared/ProductGrid";
import { useCategoryProducts } from "@/hooks/Product/useCategoryProducts";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { latestProductAnimations } from "@/hooks/Animation/animationConfig";

const LatestProduct = () => {
  const { products, isLoading, categoryId } = useCategoryProducts("latest");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <ProductGrid
      title="Latest Products"
      products={products}
      baseUrl={`product_category=${categoryId}`}
      animations={latestProductAnimations}
    />
  );
};

export default LatestProduct;
