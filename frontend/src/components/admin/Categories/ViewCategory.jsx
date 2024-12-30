import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createCategoryColumns } from "@/components/admin/table/columns/CategoryColumns";

const ViewCategories = () => {
  const { data: categoryData, isLoading, error } = useGetCategoryQuery();

  const [
    deleteCategory,
    {
      isSuccess: deleteCategorySuccess,
      isError: deleteCategoryError,
      error: deleteError,
    },
  ] = useDeleteCategoryMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteCategorySuccess) {
      toast.success("Category deleted successfully");
    }

    if (deleteCategoryError) {
      toast.error(deleteError?.data?.message || "Failed to delete category");
    }
  }, [deleteCategorySuccess, deleteCategoryError, deleteError]);

  const handleEdit = (category) => {
    navigate(`/admin/update-category/${category._id}`);
  };

  const handleDelete = (category) => {
    deleteCategory(category._id);
  };

  // column component for table
  const columns = useMemo(() =>
    createCategoryColumns(handleEdit, handleDelete)
  );

  const data = useMemo(() => {
    if (!categoryData?.categories) return [];
    return [...categoryData.categories]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((category, index) => ({
        id: index + 1,
        _id: category._id,
        name: category.name,
        createdBy: new Date(category.createdAt).toLocaleString(),
        updatedBy: category.updatedAt
          ? new Date(category.updatedAt).toLocaleString()
          : "Not Updated",
      }));
  }, [categoryData]);

  return (
    <ViewLayout
      title="Category"
      description="Manage your product categories"
      addNewPath="/admin/new-category"
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
};

export default ViewCategories;
