import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";

export const BannerItem = ({
  banner,
  index,
  isAdmin,
  isDeleting,
  onDelete,
}) => {
  return (
    <AspectRatio ratio={16 / 7}>
      <img
        src={banner.image.url}
        alt={`Banner ${index + 1}`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {isAdmin && (
        <div className="absolute top-4 right-4 flex gap-2">
          <DeleteDialog
            trigger={
              <Button variant="secondary" size="icon">
                <Trash2 className="text-red-500" />
              </Button>
            }
            onConfirm={() => onDelete(banner._id)}
            title="Delete Banner"
            description="Are you sure you want to delete this banner? This action cannot be undone."
            isLoading={isDeleting}
          />
        </div>
      )}
    </AspectRatio>
  );
};
