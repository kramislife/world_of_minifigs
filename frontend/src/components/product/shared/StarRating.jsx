import React from "react";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const StarRating = ({
  rating = 0,
  totalStars = 5,
  size = "sm",
  interactive = false,
  onRatingChange = null,
  activeColor = "text-yellow-400",
  inactiveColor = "text-gray-400",
  fillActive = true,
  className = "",
  disabled = false,
}) => {
  // Size mapping
  const sizeMap = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  // Allow direct size value (like size={16}) or use predefined sizes
  const sizeClass =
    typeof size === "string"
      ? sizeMap[size] || sizeMap.sm
      : `w-${size} h-${size}`;

  const handleClick = (selectedRating) => {
    if (interactive && onRatingChange && !disabled) {
      onRatingChange(selectedRating);
    }
  };

  return (
    <div className={`flex ${activeColor} ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isHalf = rating - starValue + 1 < 1 && rating - starValue + 1 > 0;
        const isEmpty = rating - starValue + 1 <= 0;
        const isActive = starValue <= rating;

        return (
          <div
            key={index}
            onClick={() => handleClick(starValue)}
            className={`${interactive && !disabled ? "cursor-pointer" : ""} ${
              disabled ? "opacity-70" : ""
            }`}
          >
            <Star
              className={`${sizeClass} ${
                isActive || isHalf ? activeColor : inactiveColor
              } transition-colors`}
              fill={
                isEmpty
                  ? "none"
                  : isHalf
                  ? "url(#half)"
                  : fillActive
                  ? "currentColor"
                  : "none"
              }
              strokeWidth={1.5}
            >
              {isHalf && (
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
            </Star>
          </div>
        );
      })}
    </div>
  );
};

export const RatingDistribution = ({ distribution = [], totalReviews = 0 }) => (
  <div className="space-y-5">
    {[5, 4, 3, 2, 1].map((stars) => (
      <div key={stars} className="flex items-center">
        <div className="flex items-center w-32">
          <span className="text-background font-medium mr-2">{stars}</span>

          <div className="flex gap-1">
            {[...Array(stars)].map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
              />
            ))}
            {[...Array(5 - stars)].map((_, index) => (
              <Star
                key={index + stars}
                className="w-4 h-4 text-gray-400"
                fill="none"
              />
            ))}
          </div>
        </div>
        <div className="flex-1 relative">
          <Progress
            value={
              totalReviews > 0
                ? (distribution[5 - stars] / totalReviews) * 100
                : 0
            }
            className="h-3 flex-1 bg-brand-end/80 rounded-full"
          />
        </div>
        <div className="w-8 text-right">
          <span className="text-sm text-gray-400 font-medium">
            ({distribution[5 - stars]})
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default StarRating;
