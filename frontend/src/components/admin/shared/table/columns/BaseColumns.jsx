import { Edit2, ImagePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";

export const createBaseColumns = ({
  handleEdit,
  handleDelete,
  handleImageUpload,
  isUploading,
  uploadingId,
  isDeleting,
  hasImageUpload = false,
  customColumns = [],
}) => {
  // Base columns that are common across all tables
  const baseColumns = [
    {
      header: "ID",
      accessorKey: "id",
      size: 10,
    },
    ...customColumns,
    {
      header: "Actions",
      size: 10,
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-3">
          {hasImageUpload && (
            <>
              <Button
                variant="ghost"
                onClick={(e) => {
                  const input = e.currentTarget.nextElementSibling;
                  input?.click();
                }}
                className="text-purple-600 p-0 hover:bg-transparent hover:scale-110 transition-all duration-300"
                title="Upload Image"
                disabled={isUploading && uploadingId === row.original._id}
              >
                {isUploading && uploadingId === row.original._id ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ImagePlus size={18} />
                )}
              </Button>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleImageUpload(row.original, e.target.files[0]);
                  }
                }}
                disabled={isUploading}
              />
            </>
          )}

          <Button
            variant="ghost"
            onClick={() => handleEdit(row.original)}
            className="text-blue-600 p-0 hover:bg-transparent hover:scale-110 transition-all duration-300"
            title={`Edit ${row.original.name}`}
          >
            <Edit2 size={18} />
          </Button>

          <DeleteDialog
            onConfirm={() => handleDelete(row.original)}
            title={`Delete ${row.original.name}`}
            itemToDelete={row.original.name}
            isLoading={isDeleting}
          />
        </div>
      ),
    },
  ];

  return baseColumns;
};
