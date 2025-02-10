import { useEffect } from 'react';
import { useGetCategoryByKeyQuery, useGetProductsQuery } from '@/redux/api/productApi';
import { toast } from 'react-toastify';

// Custom hook to fetch products based on a category key (best_seller and latest)
export const useCategoryProducts = (categoryKey) => {
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    error: categoryError,
  } = useGetCategoryByKeyQuery(categoryKey);

  const categoryId = categoryData?.category[0]?._id;

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useGetProductsQuery(
    categoryId ? { product_category: categoryId } : null,
    { skip: !categoryId }
  );

  useEffect(() => {
    if (isCategoryError) {
      toast.error(categoryError?.message || "Failed to fetch category");
    }
    if (isProductsError) {
      toast.error(productsError?.message || "Failed to fetch products");
    }
  }, [isCategoryError, categoryError, isProductsError, productsError]);

  return {
    products: productsData?.products || [],
    isLoading: isCategoryLoading || (categoryId && isProductsLoading),
    categoryId,
  };
};