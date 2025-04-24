import { Loader2, Upload } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const BannerUpload = ({
  onUpload,
  isUploading,
  hasBanners,
  fileInputRef,
  onFileInputClick,
}) => {
  return (
    <AspectRatio ratio={16 / 7}>
      <div
        onClick={onFileInputClick}
        className="flex items-center justify-center w-full h-full cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center text-gray-400 group">
          {isUploading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-accent" />
              <p className="text-lg text-accent">Uploading banner...</p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 mb-4 group-hover:text-accent" />
              <p className="mb-2 text-sm">
                <span className="font-semibold group-hover:text-accent">
                  {hasBanners
                    ? "Click to upload Banner"
                    : "Add your first banner"}
                </span>
              </p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onUpload}
          disabled={isUploading}
        />
      </div>
    </AspectRatio>
  );
};
