import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex text-yellow-400">
      {[1, 2, 3, 4, 5].map((index) => {
        const isHalf = rating - index + 1 < 1 && rating - index + 1 > 0;
        const isEmpty = rating - index + 1 <= 0;
        
        return (
          <Star
            key={index}
            className="w-4 h-4"
            fill={isEmpty ? 'none' : isHalf ? 'url(#half)' : 'currentColor'}
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
        );
      })}
    </div>
  );
};

export default StarRating;