import React from "react";
import RatingReviewCard from "./RatingReviewCard";
import { FallbackMessage } from "@/components/product/shared/FallbackStates";

const RatingReviewList = ({ reviews, activeTab, handleVote, user }) => {
  return (
    <div className="space-y-3">
      {reviews[activeTab].length > 0 ? (
        reviews[activeTab].map((review, index) => (
          <RatingReviewCard
            key={index}
            review={review}
            handleVote={handleVote}
            user={user}
          />
        ))
      ) : (
        <div className="bg-brand-dark/50 border border-brand-end/50 rounded-lg p-5">
          <FallbackMessage
            title="No Reviews Found for the selected filter"
            message="Try selecting a different filter or be the first to leave a review!"
            minHeight="min-h-[300px]"
          />
        </div>
      )}
    </div>
  );
};

export default RatingReviewList;
