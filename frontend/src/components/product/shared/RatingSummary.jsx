import React from "react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/product/shared/StarRating";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const RatingSummary = ({ averageRating, totalReviews }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center text-background mb-5">
          <BarChart3 className="w-5 h-5 mr-2 text-accent" />
          Overall Rating
        </CardTitle>
        <CardDescription className="text-center space-y-5">
          <div className="text-5xl font-bold text-background">
            {averageRating}
            <span className="text-3xl text-gray-400">/5.0</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <StarRating rating={Number(averageRating)} size="lg" />
          </div>
          <div className="text-gray-400">
            ({totalReviews}) {totalReviews === 1 ? "review" : "reviews"}
          </div>
        </CardDescription>
      </CardHeader>

      {/* <CardContent className="space-y-4">
        <Button variant="accent" className="w-full">
          Write a Review
        </Button>
        <p className="text-sm text-gray-400 text-center">
          Share your experience to help other collectors
        </p>
      </CardContent> */}
    </Card>
  );
};

export default RatingSummary;
