import { ImagePlus } from "lucide-react";
import ProductStatus from "@/components/product/shared/ProductStatus";
import { Button } from "@/components/ui/button";
import { createBaseColumns } from "./BaseColumns";

export const createProductColumns = (
  handleEdit,
  handleDelete,
  handleViewGallery,
  isDeleting
) => {
  const customColumns = [
    {
      header: "Product Name",
      accessorKey: "name",
      size: 200,
    },
    {
      header: "Color",
      accessorKey: "color",
      size: 100,
    },
    {
      header: "Item ID",
      accessorKey: "itemID",
      size: 100,
    },
    {
      header: "Price",
      accessorKey: "price",
      size: 100,
    },
    {
      header: "Collection",
      accessorKey: "collection",
      size: 100,
    },
    {
      header: "Stock",
      accessorKey: "stock",
      size: 100,
    },
    {
      header: "Status",
      accessorKey: "status",
      size: 100,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <ProductStatus stock={row.original.stock} variant="pill" />
        </div>
      ),
    },
  ];

  // Override the actions column for products
  const columns = createBaseColumns({
    handleEdit,
    handleDelete,
    isDeleting,
    hasImageUpload: false,
    customColumns,
  });

  // Modify the actions column to include gallery button
  const actionsColumn = columns[columns.length - 1];
  const originalCell = actionsColumn.cell;
  actionsColumn.cell = ({ row }) => (
    <div className="flex justify-center items-center gap-3">
      <Button
        variant="ghost"
        onClick={() => handleViewGallery(row.original)}
        className="text-purple-600 p-0 hover:bg-transparent hover:scale-110 transition-all duration-300"
        title="View Image Gallery"
      >
        <ImagePlus size={18} />
      </Button>
      {originalCell({ row })}
    </div>
  );

  return columns;
};
