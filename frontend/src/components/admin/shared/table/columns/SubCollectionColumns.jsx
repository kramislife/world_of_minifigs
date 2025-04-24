import { createBaseColumns } from "./BaseColumns";

export const createSubCollectionColumns = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  isUploading,
  uploadingSubCollectionId,
  isDeleting
) => {
  const customColumns = [
    {
      header: "Parent Collection",
      accessorKey: "parentCollection",
    },
    {
      header: "Sub-Collection Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Created At",
      accessorKey: "createdBy",
    },
    {
      header: "Last Updated",
      accessorKey: "updatedBy",
    },
  ];

  return createBaseColumns({
    handleEdit,
    handleDelete,
    handleImageUpload,
    isUploading,
    uploadingId: uploadingSubCollectionId,
    isDeleting,
    hasImageUpload: true,
    customColumns,
  });
};
