import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteCollectionMutation,
  useGetCollectionQuery,
  useUploadCollectionImageMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createCollectionColumns } from "@/components/admin/table/columns/CollectionColumns";

const ViewCollection = () => {
  const { data: collectionData, isLoading, error } = useGetCollectionQuery();

  const [
    deleteCollection,
    {
      isSuccess: deleteCollectionSuccess,
      isError: deleteCollectionError,
      error: deleteError,
    },
  ] = useDeleteCollectionMutation();

  const [
    uploadCollectionImage,
    { isLoading: isUploading, error: uploadError, isSuccess: uploadSuccess },
  ] = useUploadCollectionImageMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteCollectionSuccess) {
      toast.success("Collection deleted successfully");
    }

    if (deleteCollectionError) {
      toast.error(deleteError?.data?.message || "Failed to delete collection");
    }
  }, [deleteCollectionSuccess, deleteCollectionError, deleteError]);

  useEffect(() => {
    if (uploadError) {
      toast.error(error?.data?.message);
    }

    if (uploadSuccess) {
      navigate("/");
    }
  }, [uploadError, uploadSuccess]);

  const handleEdit = (collection) => {
    navigate(`/admin/update-collection/${collection._id}`);
  };

  const handleDelete = (collection) => {
    deleteCollection(collection._id);
  };

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

  const columns = useMemo(() =>
    createCollectionColumns(handleEdit, handleDelete, handleImageUpload)
  );

  const data = useMemo(() => {
    if (!collectionData?.collections) return [];
    return [...collectionData.collections]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((collection, index) => ({
        id: index + 1,
        _id: collection._id,
        name: collection.name,
        description: collection.description,
        createdAt: collection.createdAt,
        updatedAt: collection.updatedAt,
        image: collection.image,
      }));
  }, [collectionData]);

  return (
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
  );
};

export default ViewCollection;
