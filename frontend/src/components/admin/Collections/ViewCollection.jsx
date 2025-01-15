import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteCollectionMutation,
  useGetCollectionQuery,
  useUploadCollectionImageMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createCollectionColumns } from "@/components/admin/shared/table/columns/CollectionColumns";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";

const ViewCollection = () => {
  const { data: collectionData, isLoading, error } = useGetCollectionQuery();

  // delete collection
  const [deleteCollection, { isLoading: isDeleting }] =
    useDeleteCollectionMutation();

  // upload collection image
  const [
    uploadCollectionImage,
    { isLoading: isUploading, error: uploadError, isSuccess: uploadSuccess },
  ] = useUploadCollectionImageMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  // handle upload image
  useEffect(() => {
    if (uploadError) {
      toast.error(error?.data?.message);
    }

    if (uploadSuccess) {
      navigate("/");
    }
  }, [uploadError, uploadSuccess]);

  // handle edit
  const handleEdit = (collection) => {
    navigate(`/admin/update-collection/${collection._id}`);
  };

  // delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);

  // handle delete click
  const handleDeleteClick = (collection) => {
    setCollectionToDelete(collection);
    setDeleteDialogOpen(true);
  };

  // handle delete confirm
  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteCollection(collectionToDelete._id).unwrap();
      toast.success(response.message || "Collection deleted successfully");
      setDeleteDialogOpen(false);
      setCollectionToDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete collection");
    }
  };

  // handle image upload
  const handleImageUpload = async (collection, file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === FileReader.DONE) {
        const imageData = reader.result;

        try {
          await uploadCollectionImage({
            id: collection._id,
            body: { image: imageData },
          }).unwrap();

          toast.success("Image uploaded successfully");
        } catch (error) {
          toast.error(error?.data?.message || "Failed to upload image");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // column component for table
  const columns = useMemo(() =>
    createCollectionColumns(handleEdit, handleDeleteClick, handleImageUpload)
  );

  const data = useMemo(() => {
    if (!collectionData?.collections) return [];
    return [...collectionData.collections]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((collection, index) => ({
        id: index + 1,
        _id: collection._id,
        name: collection.name,
        description: collection.description || "N/A",
        createdAt: new Date(collection.createdAt).toLocaleString(),
        updatedAt: collection.updatedAt
          ? new Date(collection.updatedAt).toLocaleString()
          : "Not Updated",
        image: collection.image,
      }));
  }, [collectionData]);

  return (
    <>
      <ViewLayout
        title="Collection"
        description="Manage your collections"
        addNewPath="/admin/new-collection"
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
          setCollectionToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Collection"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-500">
              {collectionToDelete?.name}
            </span>
            ? This action cannot be undone.
          </>
        }
        isLoading={isDeleting}
      />
    </>
  );
};

export default ViewCollection;
