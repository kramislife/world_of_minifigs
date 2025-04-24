import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FallbackMessage } from "@/components/product/shared/FallbackStates";

const RatingGalleryDialog = ({ isOpen, onOpenChange, customerPhotos }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto scrollbar-none">
        <DialogHeader>
          <DialogTitle>Customer Photos</DialogTitle>
          <DialogDescription className="text-gray-400 text-sm sr-only">
            Photos shared by our customers
          </DialogDescription>
        </DialogHeader>

        {/* Gallery Content */}
        {customerPhotos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {customerPhotos.map((image, index) => (
              <div
                key={index}
                className="aspect-square w-full rounded-xl overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={`Customer review ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <FallbackMessage
            title="No Photos Yet"
            message="Be the first to share your experience with photos!"
            minHeight="min-h-[300px]"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RatingGalleryDialog;
