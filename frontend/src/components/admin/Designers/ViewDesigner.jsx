import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteDesignerMutation,
  useGetDesignersQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createDesignerColumns } from "../table/columns/DesignerColumns";

const ViewDesigner = () => {
  const { data: designerData, isLoading, error } = useGetDesignersQuery();

  const [
    deleteDesigner,
    {
      isSuccess: deleteDesignerSuccess,
      isError: deleteDesignerError,
      error: deleteError,
    },
  ] = useDeleteDesignerMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteDesignerSuccess) {
      toast.success("Designer deleted successfully");
    }

    if (deleteDesignerError) {
      toast.error(deleteError?.data?.message || "Failed to delete designer");
    }
  }, [deleteDesignerSuccess, deleteDesignerError, deleteError]);

  const handleEdit = (designer) => {
    navigate(`/admin/update-designer/${designer._id}`);
  };

  const handleDelete = (designer) => {
    deleteDesigner(designer._id);
  };

  // column component for table
  const columns = useMemo(() =>
    createDesignerColumns(handleEdit, handleDelete)
  );

  const data = useMemo(() => {
    if (!designerData?.designers) return [];
    return [...designerData.designers]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((designer, index) => ({
        id: index + 1,
        _id: designer._id,
        name: designer.name,
        bio: designer.bio,
        links: designer.social_links || {},
      }));
  }, [designerData]);

  return (
    <ViewLayout
      title="Designer"
      description="Manage your product designers"
      addNewPath="/admin/new-designer"
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
};

export default ViewDesigner;
