import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetSubCategoriesQuery,
  useDeleteSubCategoryMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createSubCategoryColumns } from "@/components/admin/shared/table/columns/SubCategoryColumns";

const ViewSubCategories = () => {
  const {
    data: subCategoryData,
    isLoading,
    error,
  } = useGetSubCategoriesQuery();
  const [deleteSubCategory, { isLoading: isDeleting }] =
    useDeleteSubCategoryMutation();
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  const handleEdit = (subCategory) => {
    navigate(`/admin/update-subcategory/${subCategory._id}`);
  };

  const handleDelete = async (subCategory) => {
    try {
      const response = await deleteSubCategory(subCategory._id).unwrap();
      toast.success(response.message || "Sub-category deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete sub-category");
    }
  };

  const columns = useMemo(
    () => createSubCategoryColumns(handleEdit, handleDelete, isDeleting),
    [handleEdit, handleDelete, isDeleting]
  );

  const data = useMemo(() => {
    if (!subCategoryData?.sub_categories) return [];

    return [...subCategoryData.sub_categories]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((subCategory, index) => ({
        id: index + 1,
        _id: subCategory._id,
        name: subCategory.name,
        parentCategory: subCategory.category?.name || "N/A",
        createdBy: new Date(subCategory.createdAt).toLocaleString(),
        updatedBy: subCategory.updatedAt
          ? new Date(subCategory.updatedAt).toLocaleString()
          : "Not Updated",
      }));
  }, [subCategoryData]);

  return (
    <ViewLayout
      title="Sub Category"
      description="Manage your product sub-categories"
      addNewPath="/admin/new-subcategory"
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
};

export default ViewSubCategories;
