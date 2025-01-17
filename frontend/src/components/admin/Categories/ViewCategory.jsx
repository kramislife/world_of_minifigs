import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createCategoryColumns } from "@/components/admin/shared/table/columns/CategoryColumns";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";

const ViewCategories = () => {
  const { data: categoryData, isLoading, error } = useGetCategoryQuery();

  // delete category
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  // handle edit
  const handleEdit = (category) => {
    navigate(`/admin/update-category/${category._id}`);
  };

  // delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // handle delete click
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  // handle delete confirm
  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteCategory(categoryToDelete._id).unwrap();
      toast.success(response.message || "Category deleted successfully");
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  // column component for table
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
    <>
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

      {/* delete dialog */}
      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-500">
              {categoryToDelete?.name}
            </span>
            ? This action cannot be undone.
          </>
        }
        isLoading={isDeleting}
      />
    </>
  );
};

export default ViewCategories;
