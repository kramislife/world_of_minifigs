import React from "react";
import {
  useGetCategoryQuery,
  useGetSubCategoriesQuery,
} from "@/redux/api/productApi";
import DropdownSelection from "@/components/admin/shared/DropdownSelection";

const ProductCategories = ({ formData, onCheckboxChange }) => {
  const {
    data: categoryData,
    isError: isCategoryError,
    error: categoryError,
  } = useGetCategoryQuery();
  const {
    data: subCategoryData,
    isError: isSubCategoryError,
    error: subCategoryError,
  } = useGetSubCategoriesQuery();

  const getSubCategoriesForCategory = (categoryId) => {
    return (
      subCategoryData?.sub_categories?.filter(
        (subCategory) => subCategory.category._id === categoryId
      ) || []
    );
  };

  return (
    <DropdownSelection
      title="Product Categories"
      mainData={categoryData?.categories}
      subData={subCategoryData?.sub_categories}
      formData={formData}
      onCheckboxChange={onCheckboxChange}
      mainField="productCategory"
      subField="productSubCategories"
      getSubItems={getSubCategoriesForCategory}
      isError={isCategoryError || isSubCategoryError}
      error={categoryError || subCategoryError}
      addNewLink="/admin/new-category"
    />
  );
};

export default ProductCategories;
