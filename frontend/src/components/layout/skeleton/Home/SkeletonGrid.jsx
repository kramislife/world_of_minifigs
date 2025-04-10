import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const SkeletonGrid = () => (
  <div className="p-5">
    <Skeleton className="h-8 w-64 mx-auto my-5" />
    <Skeleton className="h-10 w-32 mx-auto mb-2" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 py-5">
      {[...Array(4)].map((_, i) => (
        <ProductCardSkeleton key={i} showDiscount={i % 2 === 0} />
      ))}
    </div>
  </div>
);

export default SkeletonGrid;
