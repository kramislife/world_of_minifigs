import React from "react";
import { AlertTriangle } from "lucide-react";

const EditWarning = ({ existingReview }) => {

  // Show warning if there's an existing review
  if (!existingReview?.review) return null;

  return (
    <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/50 text-yellow-500">
      <AlertTriangle className="w-5 h-5 mt-0.5" />
      <div className="flex-1 text-sm">
        <p className="font-medium">You are editing an existing review.</p>
        <p className="mt-1 text-yellow-500/80">
          Please note that you can only edit a review once. Any subsequent
          changes will not be allowed.
        </p>
      </div>
    </div>
  );
};

export default EditWarning;
