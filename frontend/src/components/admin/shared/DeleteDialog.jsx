import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />

      {/* Dialog */}
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-[450px] translate-x-[-50%] translate-y-[-50%] duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] sm:max-w-[450px]">
        {children}
      </div>
    </div>
  );
};

const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="relative rounded-lg border bg-brand-gradient shadow-lg border-none">
        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="flex gap-2 items-center font-semibold text-lg leading-none tracking-tight pb-3 border-b border-gray-700">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              {title || "Confirm Deletion"}
            </h2>
            <p className="leading-loose text-sm font-light">
              {description ||
                "This action cannot be undone. Are you sure you want to delete this item?"}
            </p>
          </div>

          {/* Footer */}
          <div className="flex gap-2 justify-end mt-6">
            <Button
              className="text-gray-800 hover:text-red-500"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmDialog;

// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//   } from "@/components/ui/dialog";
//   import { Button } from "@/components/ui/button";
//   import { AlertTriangle } from "lucide-react";

//   const DeleteConfirmDialog = ({
//     isOpen,
//     onClose,
//     onConfirm,
//     title,
//     description,
//     isLoading
//   }) => {
//     return (
//       <Dialog open={isOpen} onOpenChange={onClose}>
//         <DialogContent className="sm:max-w-[450px]">
//           <DialogHeader>
//             <DialogTitle className="flex gap-2 items-center text-red-500 pb-3">
//               <AlertTriangle className="h-5 w-5" />
//               {title || "Confirm Deletion"}
//             </DialogTitle>
//             <DialogDescription className="leading-relaxed text-gray-800">
//               {description || "This action cannot be undone. Are you sure you want to delete this item?"}
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter className="flex gap-2 justify-end">
//             <Button
//               variant="outline"
//               onClick={onClose}
//               disabled={isLoading}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={onConfirm}
//               disabled={isLoading}
//               className="bg-red-500 hover:bg-red-600"
//             >
//               {isLoading ? "Deleting..." : "Delete"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     );
//   };

//   export default DeleteConfirmDialog;
