import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetColorsQuery,
  useDeleteColorMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createColorColumns } from "@/components/admin/table/columns/ColorColumns";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";

const ViewColor = () => {
  const { data: colorData, isLoading, error } = useGetColorsQuery();

  // delete color
  const [deleteColor, { isLoading: isDeleting }] = useDeleteColorMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  // handle edit
  const handleEdit = (color) => {
    navigate(`/admin/update-color/${color._id}`);
  };

  // delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [colorToDelete, setColorToDelete] = useState(null);

  // handle delete click
  const handleDeleteClick = (color) => {
    setColorToDelete(color);
    setDeleteDialogOpen(true);
  };

  // handle delete confirm
  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteColor(colorToDelete._id).unwrap();
      toast.success(response.message || "Color deleted successfully");
      setDeleteDialogOpen(false);
      setColorToDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete color");
    }
  };

  // column component for table
  const columns = useMemo(() =>
    createColorColumns(handleEdit, handleDeleteClick)
  );

  const data = useMemo(() => {
    if (!colorData?.prod_color) return [];
    return [...colorData.prod_color]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((color, index) => ({
        id: index + 1,
        _id: color._id,
        name: color.name,
        code: color.code,
        description: color.description || "No description",
        createdAt: new Date(color.createdAt).toLocaleString(),
        updatedAt: color.updatedAt
          ? new Date(color.updatedAt).toLocaleString()
          : "Not Updated",
      }));
  }, [colorData]);

  return (
    <>
      <ViewLayout
        title="Colors"
        description="Manage your product colors"
        addNewPath="/admin/new-color"
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
          setColorToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Color"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-500">
              {colorToDelete?.name}
            </span>
            ? This action cannot be undone.
          </>
        }
        isLoading={isDeleting}
      />
    </>
  );
};

export default ViewColor;
