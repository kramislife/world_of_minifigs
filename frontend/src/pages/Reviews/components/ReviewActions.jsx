import { Button } from "@/components/ui/button";

const ReviewActions = ({
  onOpenChange,
  handleSubmit,
  isCreating,
  isUpdating,
  isEdited,
  existingReview,
}) => {
  const getButtonText = () => {
    if (isCreating || isUpdating) return "Submitting...";
    if (isEdited) return "Already Edited";
    return existingReview?.review ? "Update Review" : "Submit Review";
  };

  return (
    <div className="mt-8 flex justify-end gap-3">
      <Button variant="outline" onClick={() => onOpenChange(false)}>
        Cancel
      </Button>
      <Button
        className={`px-6 py-2 text-white font-medium rounded-lg shadow-lg transition-all ${
          isEdited
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        }`}
        onClick={handleSubmit}
        disabled={isCreating || isUpdating || isEdited}
      >
        {getButtonText()}
      </Button>
    </div>
  );
};

export default ReviewActions;
