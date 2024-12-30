import React, { useEffect } from "react";
import ProductGrid from "@/components/product/shared/ProductGrid";
import { latestProductAnimations } from "@/hooks/animationConfig";
import {
  useGetCategoryByKeyQuery,
  useGetProductsQuery,
} from "@/redux/api/productApi";
import LoadingSpinner from "../layout/spinner/LoadingSpinner";
import { toast } from "react-toastify";
// import { PRODUCTS } from "@/constant/productData";

const LatestProduct = () => {
  // ---------------------------- GET CATEGORY DETAILS ------------------------------------
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    error: categoryError,
  } = useGetCategoryByKeyQuery("latest");

  // ---------------------------- DERIVE THE LATEST CATEGORY ID ------------------------------------
  const latestCategoryId = categoryData?.category[0]?._id;

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useGetProductsQuery(
    latestCategoryId ? { product_category: latestCategoryId } : null,
    { skip: !latestCategoryId } // Skip the query if the ID is not set
  );

  useEffect(() => {
    if (isCategoryError) {
      toast.error(categoryError?.message || "Failed to fetch category");
    }
    if (isProductsError) {
      toast.error(productsError?.message || "Failed to fetch products");
    }
  }, [isCategoryError, categoryError, isProductsError, productsError]);

  if (isCategoryLoading || (latestCategoryId && isProductsLoading)) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <ProductGrid
        title="Latest Products"
        products={productsData?.products || []}
        baseUrl={`/product_category=${latestCategoryId}`}
        animations={latestProductAnimations}
      />
    </>
  );
};

export default LatestProduct;
