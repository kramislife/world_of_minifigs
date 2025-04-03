import { Edit2, Trash2, ImagePlus, Loader2 } from "lucide-react";

export const createSubCollectionColumns = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  isUploading,
  uploadingSubCollectionId
) => [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Parent Collection",
    accessorKey: "parentCollection",
    cell: ({ row }) => (
      <span className="font-medium text-blue-600">
        {row.original.parentCollection}
      </span>
    ),
  },
  {
    header: "Sub-Collection Name",
    accessorKey: "name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
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
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => handleEdit(row.original)}
          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
          title="Edit Sub-Collection"
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
            {isUploading && uploadingSubCollectionId === row.original._id ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ImagePlus size={18} />
            )}
          </div>
        </label>
        <button
          onClick={() => handleDelete(row.original)}
          className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Delete Sub-Collection"
          disabled={
            isUploading && uploadingSubCollectionId === row.original._id
          }
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
