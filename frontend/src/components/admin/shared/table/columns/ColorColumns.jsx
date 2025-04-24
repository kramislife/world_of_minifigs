import { createBaseColumns } from "./BaseColumns";

export const createColorColumns = (handleEdit, handleDelete, isDeleting) => {
  const customColumns = [
    {
      header: "Name",
      accessorKey: "name",
      size: 100,
    },
    {
      header: "Color",
      accessorKey: "code",
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
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
      size: 100,
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      size: 100,
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt",
      size: 100,
    },
  ];

  return createBaseColumns({
    handleEdit,
    handleDelete,
    isDeleting,
    hasImageUpload: false,
    customColumns,
  });
};
