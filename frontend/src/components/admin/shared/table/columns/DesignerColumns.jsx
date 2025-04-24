import { createBaseColumns } from "./BaseColumns";

export const createDesignerColumns = (handleEdit, handleDelete, isDeleting) => {
  const customColumns = [
    {
      header: "Designer Name",
      accessorKey: "name",
    },
    {
      header: "Bio",
      accessorKey: "bio",
    },
    {
      header: "Social Links",
      accessorKey: "links",
      cell: ({ row }) => (
        <div>
          {row.original.links &&
            Object.entries(row.original.links).map(
              ([platform, url]) =>
                url && (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 text-blue-500 hover:text-blue-600 mb-1"
                  >
                    <span className="capitalize">{platform}</span>
                  </a>
                )
            )}
        </div>
      ),
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
