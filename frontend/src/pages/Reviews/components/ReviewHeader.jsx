import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ReviewHeader = ({ existingReview, orderId }) => {
  return (
    <DialogHeader className="mb-6">
      <DialogTitle>
        <div className="flex items-center justify-between border-b border-indigo-500/30 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">
              {existingReview?.review
                ? "Edit Your Review"
                : "Share Your Experience"}
            </h2>
            <p className="text-sm font-medium text-indigo-300 pt-1">
              Order #{orderId}
            </p>
          </div>
        </div>
      </DialogTitle>
    </DialogHeader>
  );
};

export default ReviewHeader;
