import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";

const OrderCardSkeleton = () => (
  <div className="rounded-lg border border-brand-end/50 bg-brand-dark/20 overflow-hidden">
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="hidden sm:block h-8 w-28 rounded-full" />
      </div>
    </div>

    <div className="p-4 pt-0">
      {/* Order Details */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4 border-t border-brand-end/50">
        {/* Items Count and Status Badge on Mobile */}
        <div className="flex items-center justify-between gap-2 order-2 sm:order-1 w-full sm:w-auto">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="sm:hidden h-8 w-28 rounded-full" />
        </div>

        {/* Price */}
        <div className="flex justify-between sm:block order-1 sm:order-2">
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  </div>
);

// Mobile dropdown skeleton to mimic MobileOrderStatusDropdown
const MobileDropdownSkeleton = () => (
  <div className="w-full flex items-center justify-between p-3 bg-brand-dark/20 rounded-lg border border-brand-end/50 mb-5">
    <div className="flex items-center gap-2">
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-5 w-40" />
    </div>
    <Skeleton className="h-4 w-4" />
  </div>
);

// Header skeleton component
const OrdersHeaderSkeleton = () => (
  <div className="flex flex-row items-center justify-between gap-4 mb-8">
    <Skeleton className="h-8 w-40" />
    <Skeleton className="h-5 w-32" />
  </div>
);

const MyOrdersSkeleton = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create array of different lengths for responsive grids
  const skeletonCards = [...Array(4)];

  return (
    <div className="px-5 py-8">
      {/* Header Skeleton */}
      <OrdersHeaderSkeleton />

      {/* Tabs Skeleton - Responsive */}
      <Tabs defaultValue="loading">
        {isMobile ? (
          <MobileDropdownSkeleton />
        ) : (
          <TabsList className="grid grid-cols-7 gap-2 bg-gray-900/50">
            <Skeleton className="h-8" />
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-8" />
            ))}
            <Skeleton className="h-8" />
          </TabsList>
        )}

        <TabsContent value="loading" className="mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {skeletonCards.map((_, index) => (
              <OrderCardSkeleton key={index} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyOrdersSkeleton;
