import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ReviewHeader = ({ existingReview, orderId }) => (
  <DialogHeader>
    <DialogTitle>
      {existingReview?.review ? "Edit Your Review" : "Share Your Experience"}
    </DialogTitle>
    <DialogDescription className="text-sm text-gray-300">
      Order ID: {orderId}
    </DialogDescription>
  </DialogHeader>
);

export default ReviewHeader;
