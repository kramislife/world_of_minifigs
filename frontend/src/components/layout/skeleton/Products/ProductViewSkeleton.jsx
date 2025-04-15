import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductViewSkeleton = () => {
  return (
    <>
      {/* Product Details Section */}
      <div className="p-5 bg-brand-start">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left Column - Image Gallery */}
          <div className="w-full">
            <div className="relative flex flex-col-reverse md:flex-row gap-4 h-fit">
              {/* Thumbnails */}
              <div className="w-full md:w-[110px] relative">
                <div className="w-full h-full overflow-y-auto no-scrollbar">
                  <div className="flex flex-row md:flex-col gap-2 md:max-h-[600px]">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <div
                          key={i}
                          className="min-w-[130px] max-w-[130px] md:min-w-0 md:max-w-full"
                        >
                          <div className="pt-[100%] relative">
                            <div className="absolute inset-0 rounded-lg overflow-hidden border border-slate-700">
                              <Skeleton className="w-full h-full" />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="flex-1 relative rounded-lg">
                <div className="w-full pt-[95%] relative">
                  <div className="absolute inset-0">
                    <Skeleton className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="w-full">
            <div className="flex flex-col h-full">
              {/* Product Header */}
              <div className="mb-10">
                <div className="flex flex-col gap-3">
                  {/* Title */}
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-10 w-4/5" />

                    {/* Reviews and ID */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mt-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-40" />
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="flex items-center gap-4 mt-5">
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Availability Status */}
                <Skeleton className="h-6 w-32" />

                {/* Features & Classifications */}
                <div className="flex flex-col gap-5">
                  <Skeleton className="h-5 w-48" />
                  <div className="flex flex-wrap gap-2">
                    {Array(4)
                      .fill()
                      .map((_, i) => (
                        <Skeleton key={i} className="h-5 w-24 rounded-full" />
                      ))}
                  </div>
                </div>

                {/* Color Variants */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-32" />
                  <div className="flex flex-wrap gap-2">
                    {Array(3)
                      .fill()
                      .map((_, i) => (
                        <Skeleton key={i} className="h-6 w-6 rounded-full" />
                      ))}
                  </div>
                </div>

                {/* Product Description */}
                <div className="space-y-3">
                  {Array(3)
                    .fill()
                    .map((_, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Skeleton className="h-7 flex-1" />
                      </div>
                    ))}
                </div>

                {/* Cart Actions */}
                <div className="flex flex-col md:flex-row gap-2">
                  <Skeleton className="h-12 w-full rounded-lg " />
                  <Skeleton className="h-12 w-full rounded-lg " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Specifications Section */}
      <div className="bg-brand-end/50 py-10">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center gap-4 px-4 mb-8">
            <Skeleton className="w-1 h-8" />
            <Skeleton className="h-8 w-48" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-5">
            {Array(4)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-brand-end/30 p-6 rounded-xl border border-brand-end/50"
                >
                  <div className="flex items-center mb-4">
                    <Skeleton className="h-14 w-14 rounded-lg" />
                    <Skeleton className="h-7 w-32 ml-5" />
                  </div>
                  <div className="space-y-3 mb-4 pt-5">
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Product Ratings Section */}
      <div className="bg-brand-start py-10">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center gap-4 px-4 mb-8">
            <Skeleton className="w-1 h-8" />
            <Skeleton className="h-8 w-48" />
          </div>

          {/* Grid Layout for Rating Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mx-5">
            {/* Left Column */}
            <div className="lg:col-span-4 space-y-5">
              {/* Rating Summary Card */}
              <div className="bg-brand-end/30 p-8 rounded-xl border border-brand-end/50">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-16 w-24 mb-2" />
                  <Skeleton className="h-6 w-32 mb-3" />
                  <Skeleton className="h-5 w-20 mb-6" />
                  <Skeleton className="h-12 w-full rounded-md" />
                  <Skeleton className="h-4 w-48 mt-4" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-8 space-y-5">
              {/* Rating Distribution */}
              <div className="bg-brand-end/30 p-8 rounded-xl border border-brand-end/50">
                <Skeleton className="h-7 w-48 mb-6" />
                <div className="space-y-5">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-5 w-6" />
                        <Skeleton className="h-3 flex-1 rounded-full" />
                        <Skeleton className="h-5 w-8" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 mx-5">
            {/* Reviews List */}
            <div className="space-y-6">
              {Array(2)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-brand-end/30 p-6 rounded-xl border border-brand-end/50"
                  >
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-4">
                        <div>
                          <Skeleton className="h-5 w-32 mb-1" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                        <Skeleton className="h-16 w-full" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductViewSkeleton;
