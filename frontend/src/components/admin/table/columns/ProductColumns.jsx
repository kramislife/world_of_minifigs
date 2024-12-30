import { Edit2, Trash2, ImagePlus } from "lucide-react";
import ProductStatus from "@/components/product/shared/ProductStatus";

export const createProductColumns = (
  handleEdit,
  handleDelete,
  handleViewGallery
) => [
  {
    header: "ID",
    accessorKey: "id",
    size: 80,
  },
  {
    header: "Product Name",
    accessorKey: "name",
    size: 200,
  },
  {
    header: "Price",
    accessorKey: "price",
    size: 100,
    cell: ({ row }) => (
      <div className="text-center">${row.original.price.toFixed(2)}</div>
    ),
  },
  {
    header: "Category",
    accessorKey: "category",
    size: 150,
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
    header: "Created At",
    accessorKey: "createdAt",
    size: 120,
    cell: ({ row }) => (
      <div className="text-center">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </div>
    ),
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
          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Delete Product"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
