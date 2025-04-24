import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useGetCategoryQuery,
  useGetCollectionQuery,
  useGetSkillLevelsQuery,
  useGetDesignersQuery,
} from "@/redux/api/productApi";

export const useProductQueries = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("keyword");

  // Create API-safe search params (remove sort parameter)
  const apiSearchParams = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("sort"); // Remove sort from API request
    return params;
  }, [searchParams]);

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: productError,
    error: productErrorMsg,
  } = useGetProductsQuery(apiSearchParams.toString());

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
    error: categoriesError,
  } = useGetCategoryQuery();

  const {
    data: collectionsData,
    isLoading: collectionsIsLoading,
    isError: collectionsIsError,
    error: collectionsError,
  } = useGetCollectionQuery();

  const {
    data: skillLevelsData,
    isLoading: skillLevelsIsLoading,
    isError: skillLevelsIsError,
    error: skillLevelsError,
  } = useGetSkillLevelsQuery();

  const {
    data: designersData,
    isLoading: designersIsLoading,
    isError: designerIsError,
    error: designersError,
  } = useGetDesignersQuery();

  // Group similar products by partID and name, considering search keyword
  const groupedProducts = useMemo(() => {
    if (!productData?.allProducts?.length) return [];

    // Get filter parameters
    const collectionFilter = searchParams.get("product_collection");
    const subCollectionFilter = searchParams.get("product_sub_collections");
    const keyword = searchParams.get("keyword")?.toLowerCase();

    // Filter products first based on collection/sub-collection and search
    const filteredProducts = productData.allProducts.filter((product) => {
      let matchesFilters = true;

      // Apply collection filter
      if (collectionFilter) {
        matchesFilters = product.product_collection.some(
          (col) => col._id === collectionFilter
        );
      }

      // Apply sub-collection filter
      if (subCollectionFilter) {
        matchesFilters =
          matchesFilters &&
          product.product_sub_collections.some(
            (sub) => sub._id === subCollectionFilter
          );
      }

      // Apply keyword search if present
      if (keyword) {
        const searchableFields = [
          product.product_name,
          ...(product.product_category?.map((cat) => cat.name) || []),
          ...(product.product_sub_categories?.map((subCat) => subCat.name) ||
            []),
          ...(product.product_collection?.map((col) => col.name) || []),
          ...(product.product_sub_collections?.map((subCol) => subCol.name) ||
            []),
          product.product_color?.name,
          product.itemID,
          product.partID,
        ]
          .filter(Boolean)
          .map((field) => field.toLowerCase());

        matchesFilters =
          matchesFilters &&
          searchableFields.some((field) => field.includes(keyword));
      }

      return matchesFilters;
    });

    // If no products match the filters, return empty array
    if (filteredProducts.length === 0) return [];

    // Group filtered products
    const groups = {};

    filteredProducts.forEach((product) => {
      if (!product.partID) {
        groups[product._id] = [product];
        return;
      }

      const baseName = product.product_name.split(/[\(\-]/)[0].trim();
      const groupKey = `${product.partID}-${baseName}`;

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }

      groups[groupKey].push(product);
    });

    return Object.values(groups).map((group) => {
      if (group.length === 1) return group[0];
      const productWithImage = group.find(
        (p) =>
          p.product_images &&
          p.product_images.length > 0 &&
          p.product_images[0].url
      );
      return productWithImage || group[0];
    });
  }, [productData?.allProducts, searchParams]);

  return {
    productData,
    isProductLoading,
    productError,
    productErrorMsg,
    groupedProducts,
    filterData: {
      categoriesData,
      collectionsData,
      skillLevelsData,
      designersData,
      categoriesIsLoading,
      collectionsIsLoading,
      skillLevelsIsLoading,
      designersIsLoading,
      categoriesIsError,
      collectionsIsError,
      skillLevelsIsError,
      designerIsError,
      categoriesError,
      collectionsError,
      skillLevelsError,
      designersError,
    },
  };
};
