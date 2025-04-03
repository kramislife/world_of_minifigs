import { Edit2, Trash2 } from "lucide-react";

export const createSubCategoryColumns = (handleEdit, handleDelete) => [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Parent Category",
    accessorKey: "parentCategory",
    cell: ({ row }) => (
      <span className="font-medium text-blue-600">
        {row.original.parentCategory}
      </span>
    ),
  },
  {
    header: "Sub-Category Name",
    accessorKey: "name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
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
          title="Edit Sub-Category"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => handleDelete(row.original)}
          className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Delete Sub-Category"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
