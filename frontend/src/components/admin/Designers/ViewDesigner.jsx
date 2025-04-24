import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteDesignerMutation,
  useGetDesignersQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createDesignerColumns } from "@/components/admin/shared/table/columns/DesignerColumns";

const ViewDesigner = () => {
  const { data: designerData, isLoading, error } = useGetDesignersQuery();
  const [deleteDesigner, { isLoading: isDeleting }] =
    useDeleteDesignerMutation();
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  const handleEdit = (designer) => {
    navigate(`/admin/update-designer/${designer._id}`);
  };

  const handleDelete = async (designer) => {
    try {
      const response = await deleteDesigner(designer._id).unwrap();
      toast.success(response.message || "Designer deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete designer");
    }
  };

  const columns = useMemo(
    () => createDesignerColumns(handleEdit, handleDelete, isDeleting),
    [handleEdit, handleDelete, isDeleting]
  );

  const data = useMemo(() => {
    if (!designerData?.designers) return [];
    return [...designerData.designers]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((designer, index) => ({
        id: index + 1,
        _id: designer._id,
        name: designer.name,
        bio: designer.bio || "No bio available",
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
