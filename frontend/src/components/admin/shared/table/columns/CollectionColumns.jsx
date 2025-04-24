import { Badge } from "@/components/ui/badge";
import { createBaseColumns } from "./BaseColumns";

export const createCollectionColumns = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  isUploading,
  uploadingCollectionId,
  isDeleting
) => {
  const customColumns = [
    {
      header: "Collection Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Display Location",
      accessorKey: "isFeatured",
      cell: ({ row }) => (
        <Badge variant={row.original.isFeatured ? "accent" : "info"}>
          {row.original.isFeatured ? "Featured Section" : "Collections Section"}
        </Badge>
      ),
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt",
    },
  ];

  return createBaseColumns({
    handleEdit,
    handleDelete,
    handleImageUpload,
    isUploading,
    uploadingId: uploadingCollectionId,
    isDeleting,
    hasImageUpload: true,
    customColumns,
  });
};
