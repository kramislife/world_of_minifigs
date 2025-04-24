import { AspectRatio } from "@/components/ui/aspect-ratio";
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
            onConfirm={() => onDelete(banner._id)}
            title="Delete Banner"
            itemToDelete={`Banner ${index + 1}`}
            isLoading={isDeleting}
            triggerVariant="secondary"
            triggerSize="icon"
            triggerClassName="hover:bg-accent"
          />
        </div>
      )}
    </AspectRatio>
  );
};
