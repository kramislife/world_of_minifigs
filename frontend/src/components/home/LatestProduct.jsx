import React from "react";
import ProductGrid from "./components/ProductGrid";
import { useCategoryProducts } from "@/hooks/Product/useCategoryProducts";
import { latestProductAnimations } from "@/hooks/Animation/animationConfig";

const LatestProduct = () => {
  const { products, isLoading, isError, categoryId } =
    useCategoryProducts("latest");

  return (
    <ProductGrid
      title="Latest Products"
      products={products}
      baseUrl={`product_category=${categoryId}`}
      animations={latestProductAnimations}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default LatestProduct;
