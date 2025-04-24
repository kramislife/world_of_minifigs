import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetColorsQuery,
  useDeleteColorMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createColorColumns } from "@/components/admin/shared/table/columns/ColorColumns";

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

  // Simplified delete handler
  const handleDeleteClick = async (color) => {
    try {
      const response = await deleteColor(color._id).unwrap();
      toast.success(response.message || "Color deleted successfully");
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
