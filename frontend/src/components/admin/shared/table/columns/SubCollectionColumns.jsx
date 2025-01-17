import { Edit2, Trash2, ImagePlus } from "lucide-react";

export const createSubCollectionColumns = (
  handleEdit,
  handleDelete,
  handleImageUpload
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
          />
          <div className="text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-100 transition-colors">
            <ImagePlus size={18} />
          </div>
        </label>
        <button
          onClick={() => handleDelete(row.original)}
          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Delete Sub-Collection"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
