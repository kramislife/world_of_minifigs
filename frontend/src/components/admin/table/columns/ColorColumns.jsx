import { Edit2, Trash2 } from "lucide-react";

export const createColorColumns = (handleEdit, handleDelete) => [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Color",
    accessorKey: "code",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full border"
          style={{ backgroundColor: row.original.code }}
        />
        <span>{row.original.code}</span>
      </div>
    ),
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Created By",
    accessorKey: "createdBy",
  },
  {
    header: "Updated By",
    accessorKey: "updatedBy",
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => handleEdit(row.original)}
          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
          title="Edit Color"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => handleDelete(row.original)}
          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Delete Color"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
