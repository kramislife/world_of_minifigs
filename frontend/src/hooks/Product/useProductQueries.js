import { useMemo } from "react";
import {
  useGetProductsQuery,
  useGetCategoryQuery,
  useGetCollectionQuery,
  useGetSkillLevelsQuery,
  useGetDesignersQuery,
} from "@/redux/api/productApi";

export const useProductQueries = (searchParams) => {
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: productError,
    error: productErrorMsg,
  } = useGetProductsQuery(searchParams.toString());

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

  // Group similar products by partID and name
  const groupedProducts = useMemo(() => {
    if (!productData?.allProducts?.length) return [];

    const groups = {};

    // Group products by partID and base product name
    productData.allProducts.forEach((product) => {
      if (!product.partID) {
        // If no partID, treat as individual product
        groups[product._id] = [product];
        return;
      }

      // Get base product name (remove any text after hyphen or parenthesis)
      const baseName = product.product_name.split(/[\(\-]/)[0].trim();
      const groupKey = `${product.partID}-${baseName}`;

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }

      groups[groupKey].push(product);
    });

    // Select one representative product from each group
    // Preferably one with an image, or the first one
    return Object.values(groups).map((group) => {
      // If only one product in group, return it
      if (group.length === 1) return group[0];

      // Try to find a product with an image
      const productWithImage = group.find(
        (p) =>
          p.product_images &&
          p.product_images.length > 0 &&
          p.product_images[0].url
      );

      // Return product with image or first product in group
      return productWithImage || group[0];
    });
  }, [productData?.allProducts]);

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
