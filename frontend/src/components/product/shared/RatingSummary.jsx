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

const RatingSummary = ({ averageRating, totalReviews }) => {
  return (
    <Card className="bg-brand-dark/50 border-brand-end/50">
      <CardHeader>
        <CardTitle className="text-center">
          <div className="text-4xl font-bold text-white">
            {averageRating}
            <span className="text-xl text-gray-400">/5.0</span>
          </div>
        </CardTitle>
        <CardDescription className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <StarRating rating={Number(averageRating)} size="lg" />
          </div>
          <div className="text-gray-400">
            ({totalReviews}) {totalReviews === 1 ? "review" : "reviews"}
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button variant="buyNow">Write a Review</Button>
        <p className="text-sm text-gray-400 text-center">
          Share your experience to help other collectors
        </p>
      </CardContent>
    </Card>
  );
};

export default RatingSummary;
