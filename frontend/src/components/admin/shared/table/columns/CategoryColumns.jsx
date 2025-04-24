import { createBaseColumns } from "./BaseColumns";

export const createCategoryColumns = (handleEdit, handleDelete, isDeleting) => {
  const customColumns = [
    {
      header: "Name",
      accessorKey: "name",
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
    isDeleting,
    hasImageUpload: false,
    customColumns,
  });
};
