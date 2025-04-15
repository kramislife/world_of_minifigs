import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = ({ showDiscount = false }) => {
  return (
    <div className="bg-brand-dark/50 rounded-2xl overflow-hidden h-full flex flex-col">
      {/* Optional Discount Badge */}
      {showDiscount && (
        <div className="absolute top-4 right-4 z-10">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      )}
      
      {/* Product Image */}
      <div className="relative">
        <Skeleton className="w-full aspect-square rounded-none" />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-5 flex-grow">
        <Skeleton className="h-6 w-3/4" /> {/* Title */}
        
        {/* Price and Rating */}
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex items-baseline justify-between">
            <Skeleton className="h-8 w-24" /> {/* Price */}
            <Skeleton className="h-4 w-16" /> {/* Original price */}
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Skeleton key={j} className="h-4 w-4" /> // Stars
                ))}
              </div>
              <Skeleton className="h-4 w-12" /> {/* Review count */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;