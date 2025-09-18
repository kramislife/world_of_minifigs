import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProductImagesUploadDialog = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Upload Target</DialogTitle>
          <DialogDescription>
            Choose whether this image is for the main website or the Minifig Builder site.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={() => onConfirm("MAIN")}>
            Main Site
          </Button>
          <Button variant="accent" onClick={() => onConfirm("MINIFIG_BUILDER")}>
            Minifig Builder Site
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductImagesUploadDialog;