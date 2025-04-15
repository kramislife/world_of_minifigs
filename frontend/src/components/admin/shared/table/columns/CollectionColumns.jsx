import { Edit2, ImagePlus, Trash2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const createCollectionColumns = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  isUploading,
  uploadingCollectionId
) => [
  {
    header: "ID",
    accessorKey: "id",
    size: 80,
  },
  {
    header: "Collection Name",
    accessorKey: "name",
    size: 200,
  },
  {
    header: "Description",
    accessorKey: "description",
    size: 250,
  },
  {
    header: "Display Location",
    accessorKey: "isFeatured",
    size: 150,
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
  {
    header: "Actions",
    size: 150,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => handleEdit(row.original)}
          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
          title="Edit Collection"
        >
          <Edit2 size={18} />
        </button>
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImageUpload(row.original, e.target.files[0]);
              }
            }}
            disabled={isUploading}
          />
          <div className="text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-100 transition-colors">
            {isUploading && uploadingCollectionId === row.original._id ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ImagePlus size={18} />
            )}
          </div>
        </label>
        <button
          onClick={() => handleDelete(row.original)}
          className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Delete Collection"
          disabled={isUploading && uploadingCollectionId === row.original._id}
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
