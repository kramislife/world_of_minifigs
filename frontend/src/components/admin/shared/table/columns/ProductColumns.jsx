import { Edit2, Trash2, ImagePlus } from "lucide-react";
import ProductStatus from "@/components/product/shared/ProductStatus";

export const createProductColumns = (
  handleEdit,
  handleDelete,
  handleViewGallery
) => [
  {
    header: "ID",
    accessorKey: "_id",
  },
  {
    header: "Product Name",
    accessorKey: "name",
    size: 220,
  },
  {
    header: "Color",
    accessorKey: "color",
    size: 120,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        {row.original.colorCode && (
          <div
            className="w-5 h-5 rounded-full border border-gray-300"
            style={{ backgroundColor: row.original.colorCode }}
            title={row.original.color}
          />
        )}
        <span>{row.original.color || "N/A"}</span>
      </div>
    ),
  },
  {
    header: "Item ID",
    accessorKey: "itemID",
    size: 120,
  },
  {
    header: "Price",
    accessorKey: "price",
    size: 100,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.price ? `$${row.original.price.toFixed(2)}` : "N/A"}
      </div>
    ),
  },
  {
    header: "Collection",
    accessorKey: "collection",
    size: 150,
  },
  {
    header: "Stock",
    accessorKey: "stock",
    size: 100,
    cell: ({ row }) => <div className="text-center">{row.original.stock}</div>,
  },
  {
    header: "Status",
    accessorKey: "status",
    size: 120,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ProductStatus stock={row.original.stock} variant="pill" />
      </div>
    ),
  },
  {
    header: "Actions",
    size: 150,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => handleEdit(row.original)}
          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
          title="Edit Product"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => handleViewGallery(row.original)}
          className="text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-100 transition-colors"
          title="View Image Gallery"
        >
          <ImagePlus size={18} />
        </button>
        <button
          onClick={() => handleDelete(row.original)}
          className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Delete Product"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
