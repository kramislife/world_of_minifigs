import { createBaseColumns } from "./BaseColumns";

export const createSubCategoryColumns = (
  handleEdit,
  handleDelete,
  isDeleting
) => {
  const customColumns = [
    {
      header: "Parent Category",
      accessorKey: "parentCategory",
    },
    {
      header: "Sub-Category Name",
      accessorKey: "name",
    },
    {
      header: "Created At",
      accessorKey: "createdBy",
    },
    {
      header: "Last Updated",
      accessorKey: "updatedBy",
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
