import React from "react";
import ProductGrid from "./components/ProductGrid";
import { useCategoryProducts } from "@/hooks/Product/useCategoryProducts";
import { bestSellingAnimations } from "@/hooks/Animation/animationConfig";

const BestSelling = () => {
  const { products, isLoading, isError, categoryId } =
    useCategoryProducts("best_seller");

  return (
    <ProductGrid
      title="Best Selling Products"
      products={products}
      baseUrl={`/product_category=${categoryId}`}
      animations={bestSellingAnimations}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default BestSelling;
