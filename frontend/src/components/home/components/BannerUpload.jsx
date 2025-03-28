import { Upload } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const BannerUpload = ({ onUpload, isUploading, hasBanners }) => {
  return (
    <AspectRatio ratio={16 / 7} className="w-full">
      <label className="flex items-center justify-center w-full h-full cursor-pointer bg-darkBrand/60">
        <div className="flex flex-col items-center justify-center text-gray-400">
          <Upload className="w-12 h-12 mb-4" />
          <p className="mb-2 text-sm">
            <span className="font-semibold">
              {hasBanners ? "Click to upload Banner" : "Add your first banner"}
            </span>
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onUpload}
          disabled={isUploading}
        />
      </label>
    </AspectRatio>
  );
};
