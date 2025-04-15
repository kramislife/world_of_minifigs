import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ReviewHeader = ({ existingReview, orderId }) => (
  <DialogHeader className="space-y-1 text-left">
    <DialogTitle className="text-xl font-semibold text-white">
      {existingReview?.review ? "Edit Your Review" : "Share Your Experience"}
    </DialogTitle>
    <DialogDescription className="text-sm text-gray-400">Order ID: {orderId}</DialogDescription>
  </DialogHeader>
);

export default ReviewHeader;
