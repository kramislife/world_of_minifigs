import React from "react";
import { AlertTriangle } from "lucide-react";

const EditWarning = ({ existingReview }) => {
  // Show warning if there's an existing review
  if (!existingReview?.review) return null;

  return (
    <div className="flex items-start gap-2 p-3 rounded-lg bg-brand-dark/50 border border-accent text-accent">
      <AlertTriangle className="w-5 h-5" />
      <div className="flex-1 text-sm">
        <p className="font-medium text-base">You are editing an existing review.</p>
        <p className="mt-1 text-gray-300">
          You can only edit your review once. Further modifications will not be
          permitted after the initial update.
        </p>
      </div>
    </div>
  );
};

export default EditWarning;
