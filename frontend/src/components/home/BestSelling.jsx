import React from "react";
import ProductGrid from "./components/ProductGrid";
import { useCategoryProducts } from "@/hooks/Product/useCategoryProducts";

const BestSelling = () => {

  // Fetch only "Best Selling" Product
  const { products, isLoading, isError, categoryId } =
    useCategoryProducts("best_seller");

  return (
    <ProductGrid
      title="Best Selling Products"
      products={products}
      baseUrl={`/product_category=${categoryId}`}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default BestSelling;
