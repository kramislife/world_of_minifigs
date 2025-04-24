import React from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const DeleteDialog = ({
  onConfirm,
  title,
  itemToDelete,
  isLoading,
  triggerVariant = "ghost",
  triggerSize = "default",
  triggerClassName = "p-0 hover:bg-transparent hover:scale-110 transition-all duration-300",
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size={triggerSize}
          className={triggerClassName}
        >
          <Trash2 className="h-4 w-4 text-red-500 hover:scale-110 transition-transform" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <AlertTriangle className="h-5 w-5 text-accent" />
            {title || "Confirm Deletion"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-2">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-accent italic">
            {itemToDelete}
          </span>{" "}
          ? This action cannot be undone.
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
