import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetSubCollectionsQuery,
  useDeleteSubCollectionMutation,
  useUploadSubCollectionImageMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createSubCollectionColumns } from "@/components/admin/shared/table/columns/SubCollectionColumns";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";
import { useImageUpload } from "@/hooks/ImageUpload/useImageUpload";

const ViewSubCollections = () => {
  const {
    data: subCollectionData,
    isLoading,
    error,
  } = useGetSubCollectionsQuery();

  const [deleteSubCollection, { isLoading: isDeleting }] =
    useDeleteSubCollectionMutation();

  const [
    uploadSubCollectionImage,
    { isLoading: isUploading, error: uploadError },
  ] = useUploadSubCollectionImageMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const [subCollectionToDelete, setSubCollectionToDelete] = useState(null);
  const navigate = useNavigate();

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to fetch sub-collections");
    }

    if (uploadError) {
      toast.error(uploadError?.data?.message || "Failed to upload image");
    }
  }, [error, uploadError]);

  const handleEdit = (subCollection) => {
    navigate(`/admin/update-subcollection/${subCollection._id}`);
  };

  const handleDelete = (subCollection) => {
    setSubCollectionToDelete(subCollection);
  };

  // Track which subcollection is getting an image upload
  const [subCollectionToUpload, setSubCollectionToUpload] = useState(null);

  // Use ref for immediate access to the current subcollection being processed
  const currentUploadRef = useRef(null);

  // use the custom hook for image upload
  const { handleImageUpload: processImage, isUploading: isCompressing } =
    useImageUpload({
      maxSizeMB: 0.8,
      maxWidthOrHeight: 600,
      maxFileSize: 2 * 1024 * 1024,
      onSuccess: async (imageData) => {
        try {
          // Access the current subcollection from the ref
          const currentSubCollection = currentUploadRef.current;

          if (!currentSubCollection || !currentSubCollection._id) {
            console.error("No sub-collection ID available for upload");
            toast.error("Failed to identify sub-collection for upload");
            return;
          }

          console.log(
            "Uploading image for sub-collection:",
            currentSubCollection._id,
            currentSubCollection.name
          );

          const response = await uploadSubCollectionImage({
            id: currentSubCollection._id,
            body: { image: imageData },
          }).unwrap();

          if (response.success) {
            toast.success(response.message);
          } else {
            toast.error("Failed to update sub-collection image");
          }
        } catch (error) {
          console.error("Upload error:", error);
          toast.error(error?.data?.message || "Failed to upload image");
        } finally {
          // Reset the ref after upload completes
          currentUploadRef.current = null;
          setSubCollectionToUpload(null);
        }
      },
    });

  // Combine the loading states
  const isImageUploading = isCompressing || isUploading;

  // handle image upload with the custom hook
  const handleImageUpload = (subCollection, file) => {
    // Store the subcollection in the ref for immediate access
    currentUploadRef.current = subCollection;

    // Also update state for UI updates
    setSubCollectionToUpload(subCollection);

    const event = { target: { files: [file] } };
    processImage(event);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteSubCollection(
        subCollectionToDelete._id
      ).unwrap();
      toast.success(response.message || "Sub-collection deleted successfully");
      setSubCollectionToDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete sub-collection");
    }
  };

  const columns = useMemo(
    () =>
      createSubCollectionColumns(
        handleEdit,
        handleDelete,
        handleImageUpload,
        isImageUploading,
        subCollectionToUpload?._id
      ),
    [
      handleEdit,
      handleDelete,
      handleImageUpload,
      isImageUploading,
      subCollectionToUpload,
    ]
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
        image: subCollection.image?.url || null,
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

      {/* delete dialog */}
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
