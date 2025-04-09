import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Header Skeleton - Simplified
const OrderHeaderSkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardHeader className="p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-3 w-24 mt-2" />
          </div>
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
    </CardHeader>
  </Card>
);

// Timeline Skeleton - Minimized
const OrderStatusTimelineSkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardContent className="p-4">
      <div className="flex justify-between">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="w-10 h-10 rounded-full" />
        ))}
      </div>
    </CardContent>
  </Card>
);

// CustomerItems Skeleton - Just one item
const CustomerItemsSkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardHeader>
      <Skeleton className="h-6 w-32" />
    </CardHeader>
    <CardContent>
      <div className="flex gap-3 pb-4">
        <Skeleton className="w-32 h-32 rounded-lg flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-5 w-full max-w-md" />
          <Skeleton className="h-4 w-24 mt-2" />
          <Skeleton className="h-4 w-full max-w-sm mt-4" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// CustomerShipping Skeleton - Simplified
const CustomerShippingSkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardHeader>
      <Skeleton className="h-6 w-36" />
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-5 w-full mt-1" />
        </div>
        <div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-32 mt-1" />
        </div>
        <div>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-20 mt-1" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Customer Skeleton - Compact
const CustomerSkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardHeader>
      <Skeleton className="h-6 w-36" />
    </CardHeader>
    <CardContent className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </CardContent>
  </Card>
);

// PaymentSummary Skeleton - Minimal
const PaymentSummarySkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardHeader>
      <Skeleton className="h-6 w-36" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full mb-2" />
      <div className="border-t border-brand-end/50 pt-3">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
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
