import React, { useState, useMemo, useEffect, useRef } from "react";
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
import { useImageUpload } from "@/hooks/ImageUpload/useImageUpload";

const ViewCollection = () => {
  const { data: collectionData, isLoading, error } = useGetCollectionQuery();

  // delete collection
  const [deleteCollection, { isLoading: isDeleting }] =
    useDeleteCollectionMutation();

  // upload collection image
  const [
    uploadCollectionImage,
    { isLoading: isUploading, error: uploadError },
  ] = useUploadCollectionImageMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to fetch collections");
    }

    if (uploadError) {
      toast.error(uploadError?.data?.message || "Failed to upload image");
    }
  }, [error, uploadError]);

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

  // Track which collection is getting an image upload
  const [collectionToUpload, setCollectionToUpload] = useState(null);

  // Use ref for immediate access to the current collection being processed
  const currentUploadRef = useRef(null);

  // use the custom hook for image upload
  const { handleImageUpload: processImage, isUploading: isCompressing } =
    useImageUpload({
      maxSizeMB: 0.8,
      maxWidthOrHeight: 600,
      maxFileSize: 2 * 1024 * 1024,
      onSuccess: async (imageData) => {
        try {
          // Access the current collection from the ref
          const currentCollection = currentUploadRef.current;

          if (!currentCollection || !currentCollection._id) {
            console.error("No collection ID available for upload");
            toast.error("Failed to identify collection for upload");
            return;
          }

          console.log(
            "Uploading image for collection:",
            currentCollection._id,
            currentCollection.name
          );

          const response = await uploadCollectionImage({
            id: currentCollection._id,
            body: { image: imageData },
          }).unwrap();

          if (response.success) {
            toast.success(
              response.message || "Collection image updated successfully"
            );
          } else {
            toast.error(
              response.message || "Failed to update collection image"
            );
          }
        } catch (error) {
          console.error("Upload error:", error);
          toast.error(error?.data?.message || "Failed to upload image");
        } finally {
          // Reset the ref after upload completes
          currentUploadRef.current = null;
        }
      },
    });

  // Combine the loading states
  const isImageUploading = isCompressing || isUploading;

  // handle image upload with the custom hook
  const handleImageUpload = (collection, file) => {
    // Store the collection in the ref for immediate access
    currentUploadRef.current = collection;

    // Also update state for UI updates
    setCollectionToUpload(collection);

    const event = { target: { files: [file] } };
    processImage(event);
  };

  // column component for table
  const columns = useMemo(
    () =>
      createCollectionColumns(
        handleEdit,
        handleDeleteClick,
        handleImageUpload,
        isImageUploading,
        collectionToUpload?._id
      ),
    [
      handleEdit,
      handleDeleteClick,
      handleImageUpload,
      isImageUploading,
      collectionToUpload,
    ]
  );

  const data = useMemo(() => {
    if (!collectionData?.collections) return [];
    return [...collectionData.collections]
      .sort((a, b) => {
        // First sort by isFeatured (featured items on top)
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        // Then sort by creation date within each group (featured and non-featured)
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .map((collection, index) => ({
        id: index + 1,
        _id: collection._id,
        name: collection.name,
        description: collection.description || "N/A",
        isFeatured: collection.isFeatured,
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
