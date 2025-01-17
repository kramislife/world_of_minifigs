import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteDesignerMutation,
  useGetDesignersQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createDesignerColumns } from "@/components/admin/shared/table/columns/DesignerColumns";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";

const ViewDesigner = () => {
  const { data: designerData, isLoading, error } = useGetDesignersQuery();

  // delete designer
  const [deleteDesigner, { isLoading: isDeleting }] =
    useDeleteDesignerMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  // handle edit
  const handleEdit = (designer) => {
    navigate(`/admin/update-designer/${designer._id}`);
  };

  // delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [designerToDelete, setDesignerToDelete] = useState(null);

  // handle delete click
  const handleDeleteClick = (designer) => {
    setDesignerToDelete(designer);
    setDeleteDialogOpen(true);
  };

  // handle delete confirm
  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteDesigner(designerToDelete._id).unwrap();
      toast.success(response.message || "Designer deleted successfully");
      setDeleteDialogOpen(false);
      setDesignerToDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete designer");
    }
  };

  // column component for table
  const columns = useMemo(() =>
    createDesignerColumns(handleEdit, handleDeleteClick)
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
    <>
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

      {/* delete dialog */}
      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setDesignerToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Designer"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-500">
              {designerToDelete?.name}
            </span>
            ? This action cannot be undone.
          </>
        }
        isLoading={isDeleting}
      />
    </>
  );
};

export default ViewDesigner;
