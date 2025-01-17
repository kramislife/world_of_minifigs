import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetSubCollectionsQuery,
  useDeleteSubCollectionMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createSubCollectionColumns } from "@/components/admin/shared/table/columns/SubCollectionColumns";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";

const ViewSubCollections = () => {
  const {
    data: subCollectionData,
    isLoading,
    error,
  } = useGetSubCollectionsQuery();
  const [deleteSubCollection, { isLoading: isDeleting }] =
    useDeleteSubCollectionMutation();
  const [globalFilter, setGlobalFilter] = useState("");
  const [subCollectionToDelete, setSubCollectionToDelete] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (subCollection) => {
    navigate(`/admin/update-subcollection/${subCollection._id}`);
  };

  const handleDelete = (subCollection) => {
    setSubCollectionToDelete(subCollection);
  };

  const confirmDelete = async () => {
    try {
      await deleteSubCollection(subCollectionToDelete._id).unwrap();
      toast.success("Sub-collection deleted successfully");
      setSubCollectionToDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete sub-collection");
    }
  };

  const columns = useMemo(
    () => createSubCollectionColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete]
  );

  const data = useMemo(() => {
    if (!subCollectionData?.subcollections) return [];

    return [...subCollectionData.subcollections]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((subCollection, index) => ({
        id: index + 1,
        _id: subCollection._id,
        name: subCollection.name,
        description: subCollection.description || "N/A",
        parentCollection: subCollection.collection?.name || "N/A",
        createdBy: new Date(subCollection.createdAt).toLocaleString(),
        updatedBy: subCollection.updatedAt
          ? new Date(subCollection.updatedAt).toLocaleString()
          : "Not Updated",
      }));
  }, [subCollectionData]);

  return (
    <>
      <ViewLayout
        title="Sub Collection"
        description="Manage your product sub-collections"
        addNewPath="/admin/new-subcollection"
        isLoading={isLoading}
        error={error}
        data={data}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <DeleteDialog
        isOpen={!!subCollectionToDelete}
        onClose={() => setSubCollectionToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Sub-Collection"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-500">
              {subCollectionToDelete?.name}
            </span>
            ? This action cannot be undone.
          </>
        }
        isLoading={isDeleting}
      />
    </>
  );
};

export default ViewSubCollections;
