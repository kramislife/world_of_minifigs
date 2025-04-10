import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Header Skeleton
const OrderHeaderSkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardHeader className="p-4">
      <div className="flex flex-col gap-2">
        {/* Top Section - Order ID and Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Skeleton className="p-2.5 h-12 w-12 rounded-xl" />
            <div className="min-w-0">
              <Skeleton className="h-6 w-64" />
              <div className="flex flex-col mt-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-32 sm:w-36" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          </div>

          {/* Cancel button skeleton - only on larger screens */}
          <Skeleton className="hidden sm:block h-10 w-32" />
        </div>

        {/* Mobile Cancel Button skeleton */}
        <Skeleton className="sm:hidden h-10 w-full" />
      </div>
    </CardHeader>
  </Card>
);

// Timeline Skeleton
const OrderStatusTimelineSkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardContent className="p-4">
      <div className="flex justify-between items-center">
        {/* Timeline steps */}
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// CustomerItems Skeleton
const CustomerItemsSkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardHeader>
      <div className="flex items-center gap-3">
        <Skeleton className="h-7 w-40" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-3 border-b border-brand-end/50 pb-5 last:border-b-0 last:pb-0"
          >
            {/* Product image skeleton */}
            <div className="relative bg-brand-dark rounded-lg overflow-hidden">
              <Skeleton className="w-32 h-32" />
            </div>

            {/* Product details skeleton */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="hidden sm:block h-5 w-24" />
              </div>

              <div className="flex items-center mt-5 gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>

              <div className="flex flex-col space-y-3 mt-5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// CustomerShipping Skeleton
const CustomerShippingSkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardHeader>
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-36" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        <div className="space-y-2">
          <div>
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-40 mt-3" />
          </div>
          <div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-full mt-1" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-40 mt-1" />
          </div>
          <div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-28 mt-1" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-20 mt-1" />
          </div>
        </div>
      </div>

      {/* Tracking Information Skeleton */}
      <div className="mt-5 border-t border-brand-end/50 pt-5">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
          {[...Array(4)].map((_, index) => (
            <div key={index} className={index >= 2 ? "md:col-span-2" : ""}>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-full mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Order Notes Skeleton */}
      <div className="mt-5 border-t border-brand-end/50 pt-5">
        <div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex gap-2 mt-2">
            <Skeleton className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Customer Skeleton
const CustomerSkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardHeader>
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="h-6 w-36" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index}>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-full mt-1" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// PaymentSummary Skeleton
const PaymentSummarySkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardHeader>
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="h-6 w-36" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="border-t border-brand-end/50 pt-3">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Main OrderSkeleton component
const OrderSkeleton = () => {
  return (
    <div className="px-5 py-8">
      <div className="space-y-5">
        {/* Order Header Skeleton */}
        <OrderHeaderSkeleton />

        {/* Order Status Timeline Skeleton */}
        <OrderStatusTimelineSkeleton />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 space-y-3">
            {/* Customer Items Skeleton */}
            <CustomerItemsSkeleton />

            {/* Customer Shipping Skeleton */}
            <CustomerShippingSkeleton />
          </div>

          <div className="space-y-3 lg:sticky lg:top-24 h-fit">
            {/* Customer Skeleton */}
            <CustomerSkeleton />

            {/* Payment Summary Skeleton */}
            <PaymentSummarySkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;
