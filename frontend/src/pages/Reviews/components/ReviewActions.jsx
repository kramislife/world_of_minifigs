import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ReviewActions = ({
  onOpenChange,
  handleSubmit,
  isCreating,
  isUpdating,
  hasEditedProducts,
  existingReview,
}) => {
  const isLoading = isCreating || isUpdating;

  return (
    <DialogFooter className="gap-2">
      <Button
        variant="outline"
        onClick={() => onOpenChange(false)}
        className="w-full sm:w-auto hover:bg-input"
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button variant="submit" onClick={handleSubmit} disabled={isLoading} className="w-auto">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {isUpdating ? "Updating..." : "Submitting..."}
          </>
        ) : (
          <>{existingReview?.review ? "Update Review" : "Submit Review"}</>
        )}
      </Button>
    </DialogFooter>
  );
};

export default ReviewActions;
