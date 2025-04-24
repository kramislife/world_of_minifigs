import { Star } from "lucide-react";

export const createReviewColumns = () => [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => <span className="text-sm">#{row.index + 1}</span>,
  },
  {
    header: "User",
    accessorKey: "userName",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.userName}</span>
        <span className="text-sm text-gray-400">{row.original.userEmail}</span>
      </div>
    ),
  },
  {
    header: "Product",
    accessorKey: "productName",
  },
  {
    header: "Rating",
    accessorKey: "rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        <span>{row.original.rating}</span>
      </div>
    ),
  },
  {
    header: "Review",
    accessorKey: "reviewText",
    cell: ({ row }) => (
      <div className="max-w-md">
        <p className="text-sm line-clamp-2">{row.original.reviewText}</p>
        {row.original.isEdited && (
          <span className="text-xs text-gray-400">(edited)</span>
        )}
      </div>
    ),
  },
  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div className="flex flex-col text-sm">
        <span>{row.original.createdAt}</span>
        {row.original.isEdited && (
          <span className="text-xs text-gray-400">
            Updated: {row.original.updatedAt}
          </span>
        )}
      </div>
    ),
  },
];
