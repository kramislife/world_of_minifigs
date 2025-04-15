import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SectionSkeleton = ({ title, height = "h-[200px]" }) => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardHeader>
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-48" /> {/* Title */}
      </div>
    </CardHeader>
    <CardContent>
      {title === "Contact" && (
        <div className="space-y-4">
          <Skeleton className="w-full h-8" /> {/* Email input */}
          <Skeleton className="w-3/4 h-4" /> {/* Email message */}
        </div>
      )}

      {title === "Shipping" && (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-4 border border-brand-end/50 rounded-lg space-y-3"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-full" /> {/* Radio */}
                <Skeleton className="w-48 h-5" /> {/* Address name */}
              </div>
              <div className="lg:ml-6 space-y-2">
                <Skeleton className="w-28 h-4" /> {/* Phone */}
                <Skeleton className="w-full h-4" /> {/* Address */}
              </div>
            </div>
          ))}
        </div>
      )}

      {title === "Payment" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="w-full h-12" /> {/* Card option */}
            <Skeleton className="w-full h-12" /> {/* PayPal option */}
          </div>
          <div className="space-y-4">
            <Skeleton className="w-full h-10" /> {/* Card number */}
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="w-full h-10" /> {/* Expiry */}
              <Skeleton className="w-full h-10" /> {/* CVC */}
            </div>
            <Skeleton className="w-full h-12" /> {/* Pay button */}
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

const OrderItemSkeleton = () => (
  <div className="flex gap-3 items-center pb-5 border-b border-brand-end/50 last:border-0">
    <Skeleton className="w-20 h-20 rounded-lg" /> {/* Product image */}
    <div className="flex-1 flex justify-between items-start">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-5 w-3/4" /> {/* Product name */}
        <Skeleton className="h-4 w-1/2" /> {/* Product details */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24" /> {/* Quantity */}
        </div>
      </div>
      <Skeleton className="h-5 w-20" /> {/* Price */}
    </div>
  </div>
);

const OrderSummarySkeleton = () => (
  <Card className="bg-brand-dark/20 border border-brand-end/50">
    <CardHeader>
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-36" />
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      {[1, 2].map((item) => (
        <OrderItemSkeleton key={item} />
      ))}
      <div className="space-y-4">
        <Skeleton className="w-full h-16" /> {/* Order notes */}
        <div className="space-y-3 pt-4">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" /> {/* Subtotal label */}
            <Skeleton className="h-4 w-24" /> {/* Subtotal amount */}
          </div>
          <div className="flex justify-between pt-5 border-t border-brand-end/50">
            <Skeleton className="h-4 w-16" /> {/* Total label */}
            <Skeleton className="h-4 w-24" /> {/* Total amount */}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CheckoutSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
      {/* Left Column - Forms */}
      <div className="space-y-6">
        <SectionSkeleton title="Contact" />
        <SectionSkeleton title="Shipping" />
        <SectionSkeleton title="Payment" />
      </div>

      {/* Right Column - Order Summary */}
      <div className="lg:sticky lg:top-24 h-fit">
        <OrderSummarySkeleton />
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
