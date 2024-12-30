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

  return {
    productData,
    isProductLoading,
    productError,
    productErrorMsg,
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
