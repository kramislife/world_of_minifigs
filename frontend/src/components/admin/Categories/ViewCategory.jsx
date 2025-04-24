import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createCategoryColumns } from "@/components/admin/shared/table/columns/CategoryColumns";

const ViewCategories = () => {
  const { data: categoryData, isLoading, error } = useGetCategoryQuery();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to fetch categories");
    }
  }, [error]);

  // handle edit
  const handleEdit = (category) => {
    navigate(`/admin/update-category/${category._id}`);
  };

  // Simplified delete handler
  const handleDeleteClick = async (category) => {
    try {
      const response = await deleteCategory(category._id).unwrap();
      toast.success(response.message || "Category deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  const columns = useMemo(() =>
    createCategoryColumns(handleEdit, handleDeleteClick)
  );

  const data = useMemo(() => {
    if (!categoryData?.categories) return [];
    return [...categoryData.categories]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((category, index) => ({
        id: index + 1,
        _id: category._id,
        name: category.name,
        createdAt: new Date(category.createdAt).toLocaleString(),
        updatedAt: category.updatedAt
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
