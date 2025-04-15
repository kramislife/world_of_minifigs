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
      <DialogContent className="bg-brand-start border border-brand-end/50 max-w-4xl max-h-[95vh] rounded-lg overflow-y-auto scrollbar-none p-3 w-[95vw]">
        <div className="p-3">
          {/* Header */}
          <DialogHeader className="border-b border-brand-end/50 pb-2 mb-4 text-white text-left">
            <DialogTitle>Customer Photos</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
              Photos shared by our customers
            </DialogDescription>
          </DialogHeader>

          {/* Gallery Content */}
          {customerPhotos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {customerPhotos.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden group"
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingGalleryDialog;
