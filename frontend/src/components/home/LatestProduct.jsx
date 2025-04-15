import React from "react";
import ProductGrid from "./components/ProductGrid";
import { useCategoryProducts } from "@/hooks/Product/useCategoryProducts";

const LatestProduct = () => {

  // Fetch only "Latest" Product
  const { products, isLoading, isError, categoryId } =
    useCategoryProducts("latest");

  return (
    <ProductGrid
      title="Latest Products"
      products={products}
      baseUrl={`product_category=${categoryId}`}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default LatestProduct;
