import React, { useEffect } from "react";
import ProductGrid from "@/components/product/shared/ProductGrid";
import { bestSellingAnimations } from "@/hooks/animationConfig";
import {
  useGetCategoryByKeyQuery,
  useGetProductsQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import LoadingSpinner from "../layout/spinner/LoadingSpinner";

const BestSelling = () => {
  // Fetch the category with key "best_seller"

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    error: categoryError,
  } = useGetCategoryByKeyQuery("best_seller");

  // Derive the best seller category ID
  const bestSellerId = categoryData?.category[0]?._id;

  // Fetch products based on the best seller category ID
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useGetProductsQuery(
    bestSellerId ? { product_category: bestSellerId } : null,
    { skip: !bestSellerId }
  );

  // Handle errors for category and products
  useEffect(() => {
    if (isCategoryError) {
      toast.error(categoryError?.message || "Failed to fetch category");
    }
    if (isProductsError) {
      toast.error(productsError?.message || "Failed to fetch products");
    }
  }, [isCategoryError, categoryError, isProductsError, productsError]);

  if (isCategoryLoading || (bestSellerId && isProductsLoading)) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ProductGrid
        title="Best Selling Products"
        products={productsData?.products || []}
        animations={bestSellingAnimations}
        baseUrl={`/product_category=${bestSellerId}`}
      />
    </>
  );
};

export default BestSelling;
