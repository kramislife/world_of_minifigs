import { Edit2, Trash2 } from "lucide-react";

export const createDesignerColumns = (handleEdit, handleDelete) => [
  {
    header: "ID",
    accessorKey: "id",
  },
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
                  <LinkIcon size={14} />
                  <span className="capitalize">{platform}</span>
                </a>
              )
          )}
      </div>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => handleEdit(row.original)}
          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
          title="Edit Designer"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => handleDelete(row.original)}
          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Delete Designer"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
