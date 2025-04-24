import { createBaseColumns } from "./BaseColumns";

export const createSkillLevelColumns = (
  handleEdit,
  handleDelete,
  isDeleting
) => {
  const customColumns = [
    {
      header: "Skill Level",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
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
