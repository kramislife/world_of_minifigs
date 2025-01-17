import { Edit2, Trash2 } from "lucide-react";

export const createSubCollectionColumns = (handleEdit, handleDelete) => [
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
    cell: ({ row }) => (
      <span className="text-sm">{row.original.description}</span>
    ),
  },
  {
    header: "Created At",
    accessorKey: "createdBy",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.createdBy}</span>
    ),
  },
  {
    header: "Last Updated",
    accessorKey: "updatedBy",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.updatedBy}</span>
    ),
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
