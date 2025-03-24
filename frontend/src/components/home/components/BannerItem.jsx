import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const BannerItem = ({ banner, index, isAdmin, onDelete }) => {
  return (
    <AspectRatio ratio={16 / 7} className="w-full">
      <div className="relative w-full h-full bg-darkBrand/60">
        <img
          src={banner.image.url}
          alt={`Banner ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {isAdmin && (
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onDelete(banner)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        )}
      </div>
    </AspectRatio>
  );
};
