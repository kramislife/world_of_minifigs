import { Edit2, ImagePlus, Trash2 } from "lucide-react";

export const createCollectionColumns = (
  handleEdit,
  handleDelete,
  handleImageUpload
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
    header: "Created At",
    accessorKey: "createdAt",
    size: 120,
    cell: ({ row }) => (
      <div className="text-center">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </div>
    ),
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
    size: 120,
    cell: ({ row }) => (
      <div className="text-center">
        {new Date(row.original.updatedAt).toLocaleDateString()}
      </div>
    ),
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
          />
          <div className="text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-100 transition-colors">
            <ImagePlus size={18} />
          </div>
        </label>
        <button
          onClick={() => handleDelete(row.original)}
          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Delete Collection"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
