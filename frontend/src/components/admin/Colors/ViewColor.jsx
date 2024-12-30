import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetColorsQuery,
  useDeleteColorMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createColorColumns } from "@/components/admin/table/columns/ColorColumns";

const ViewColor = () => {
  const { data: colorData, isLoading, error } = useGetColorsQuery();
  const [
    deleteColor,
    {
      isSuccess: deleteColorSuccess,
      isError: deleteColorError,
      error: deleteError,
    },
  ] = useDeleteColorMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteColorSuccess) {
      toast.success("Color deleted successfully");
    }
    if (deleteColorError) {
      toast.error(deleteError?.data?.message || "Failed to delete color");
    }
  }, [deleteColorSuccess, deleteColorError, deleteError]);

  const handleEdit = (color) => {
    navigate(`/admin/update-color/${color._id}`);
  };

  const handleDelete = (color) => {
    deleteColor(color._id);
  };

  const columns = useMemo(() => createColorColumns(handleEdit, handleDelete));

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
        createdBy: new Date(color.createdAt).toLocaleString(),
        updatedBy: color.updatedAt
          ? new Date(color.updatedAt).toLocaleString()
          : "Not Updated",
      }));
  }, [colorData]);

  return (
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
  );
};

export default ViewColor;
