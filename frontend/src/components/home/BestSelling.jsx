import React from "react";
import ProductGrid from "@/components/product/shared/ProductGrid";
import { useCategoryProducts } from "@/hooks/Product/useCategoryProducts";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { bestSellingAnimations } from "@/hooks/Animation/animationConfig";

const BestSelling = () => {
  const { products, isLoading, categoryId } = useCategoryProducts("best_seller");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <ProductGrid
      title="Best Selling Products"
      products={products}
      baseUrl={`/product_category=${categoryId}`}
      animations={bestSellingAnimations}
    />
  );
};

export default BestSelling;
