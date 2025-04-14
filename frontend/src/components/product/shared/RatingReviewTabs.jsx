import { Button } from "@/components/ui/button";
import React from "react";

const RatingReviewTabs = ({ activeTab, setActiveTab, reviewTabs }) => {
  return (
    <div className="flex flex-wrap gap-2 pb-5">
      {reviewTabs.map((tab) => (
        <Button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-5 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeTab === tab.id
              ? "bg-accent text-black hover:bg-accent/90"
              : "bg-brand-dark/50 text-gray-400 hover:text-accent border border-brand-end/50 hover:bg-inherit"
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default RatingReviewTabs;
