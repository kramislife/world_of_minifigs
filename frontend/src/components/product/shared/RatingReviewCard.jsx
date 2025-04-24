import React from "react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, ThumbsUp, ThumbsDown } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import StarRating from "@/components/product/shared/StarRating";

const RatingReviewCard = ({ review, handleVote, user }) => {
  if (!review?.productDetails) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3 border-b border-brand-end/50 pb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={review.user?.avatar} />
            <AvatarFallback className="bg-accent text-black font-medium capitalize">
              {review.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-background">
                    {review.user?.name || "Anonymous"}
                  </h4>
                  {review.user?.is_verified && (
                    <Badge variant="success">
                      <BadgeCheck className="w-3 h-3 mr-1" />
                      Verified Buyer
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={review.productDetails.rating} size="sm" />
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-400">
                    {format(new Date(review.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {review.productDetails.reviewText && (
          <p className="text-gray-300">{review.productDetails.reviewText}</p>
        )}

        {review.productDetails.images?.length > 0 && (
          <div className="flex gap-2 my-4 flex-wrap">
            {review.productDetails.images.map((image, index) => (
              <div key={index} className="relative w-24 h-24 sm:w-32 sm:h-32">
                <img
                  src={image.url}
                  alt={`Review ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 pt-3">
          <button
            onClick={() => handleVote(review, "helpful")}
            className={`flex items-center gap-1 text-sm transition-all duration-200 ${
              review.productDetails.helpfulVotes?.includes(user?._id)
                ? "text-emerald-400 scale-105"
                : "text-gray-400 hover:text-background hover:scale-102"
            }`}
          >
            <ThumbsUp
              className={`w-4 h-4 transition-all duration-200 ${
                review.productDetails.helpfulVotes?.includes(user?._id)
                  ? "fill-emerald-400"
                  : "hover:fill-background/20"
              }`}
            />
            <span
              className={`transition-all duration-200 ${
                review.productDetails.helpfulVotes?.includes(user?._id)
                  ? "font-medium"
                  : ""
              }`}
            >
              Helpful ({review.productDetails.helpfulVotes?.length || 0})
            </span>
          </button>
          <button
            onClick={() => handleVote(review, "unhelpful")}
            className={`flex items-center gap-1 text-sm transition-all duration-200 ${
              review.productDetails.unhelpfulVotes?.includes(user?._id)
                ? "text-red-400 scale-105"
                : "text-gray-400 hover:text-background hover:scale-102"
            }`}
          >
            <ThumbsDown
              className={`w-4 h-4 transition-all duration-200 ${
                review.productDetails.unhelpfulVotes?.includes(user?._id)
                  ? "fill-red-400"
                  : "hover:fill-background/20"
              }`}
            />
            <span
              className={`transition-all duration-200 ${
                review.productDetails.unhelpfulVotes?.includes(user?._id)
                  ? "font-medium"
                  : ""
              }`}
            >
              Not Helpful ({review.productDetails.unhelpfulVotes?.length || 0})
            </span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingReviewCard;
