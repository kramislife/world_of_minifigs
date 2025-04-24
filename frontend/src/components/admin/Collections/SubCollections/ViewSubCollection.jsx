import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetSubCollectionsQuery,
  useDeleteSubCollectionMutation,
  useUploadSubCollectionImageMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createSubCollectionColumns } from "@/components/admin/shared/table/columns/SubCollectionColumns";
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
  const [subCollectionToUpload, setSubCollectionToUpload] = useState(null);
  const currentUploadRef = useRef(null);
  const navigate = useNavigate();

  const handleEdit = (subCollection) => {
    navigate(`/admin/update-subcollection/${subCollection._id}`);
  };

  const handleDelete = async (subCollection) => {
    try {
      const response = await deleteSubCollection(subCollection._id).unwrap();
      toast.success(response.message || "Sub-collection deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete sub-collection");
    }
  };

  const { handleImageUpload: processImage, isUploading: isCompressing } =
    useImageUpload({
      maxSizeMB: 0.8,
      maxWidthOrHeight: 600,
      maxFileSize: 2 * 1024 * 1024,
      onSuccess: async (imageData) => {
        try {
          const currentSubCollection = currentUploadRef.current;

          if (!currentSubCollection || !currentSubCollection._id) {
            toast.error("Failed to identify sub-collection for upload");
            return;
          }

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
          toast.error(error?.data?.message || "Failed to upload image");
        } finally {
          currentUploadRef.current = null;
          setSubCollectionToUpload(null);
        }
      },
    });

  const isImageUploading = isCompressing || isUploading;

  const handleImageUpload = (subCollection, file) => {
    currentUploadRef.current = subCollection;
    setSubCollectionToUpload(subCollection);
    const event = { target: { files: [file] } };
    processImage(event);
  };

  const columns = useMemo(
    () =>
      createSubCollectionColumns(
        handleEdit,
        handleDelete,
        handleImageUpload,
        isImageUploading,
        subCollectionToUpload?._id,
        isDeleting
      ),
    [
      handleEdit,
      handleDelete,
      handleImageUpload,
      isImageUploading,
      subCollectionToUpload,
      isDeleting,
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
  );
};

export default ViewSubCollections;
