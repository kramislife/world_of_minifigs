import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ViewLayoutSkeleton = ({ title = "Items", columnCount = 5 }) => {
  return (
    <div className="py-6 px-2">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 md:h-9 w-48 md:w-64" />
          <Skeleton className="h-5 w-64 md:w-80 hidden md:block" />
        </div>
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>

      {/* Card Section */}
      <Card className="bg-brand-start border-brand-end/50">
        <CardContent className="p-5">
          {/* Controls Row */}
          <div className="flex flex-row justify-between items-center gap-4 md:gap-6 mb-10">
            {/* Show Entries Skeleton */}
            <Skeleton className="h-8 w-40" />
            {/* Search Bar Skeleton */}
            <div className="relative flex items-center">
              <Skeleton className="h-8 w-28 md:hidden rounded-md" />
              <Skeleton className="hidden md:block h-10 w-[300px] rounded-md" />
            </div>
          </div>

          {/* Table Skeleton */}
          <div className="overflow-x-auto scrollbar-none">
            <div className="min-w-[640px]">
              {" "}
              {/* Minimum width for mobile */}
              {/* Table Header */}
              <div className="border-b border-brand-end">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-4 py-4">
                  {Array(columnCount)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton
                        key={`header-${i}`}
                        className={`h-6 ${
                          i === columnCount ? "w-24" : "w-full"
                        }`}
                      />
                    ))}
                </div>
              </div>
              {/* Table Rows */}
              {Array(5)
                .fill(0)
                .map((_, rowIndex) => (
                  <div
                    key={`row-${rowIndex}`}
                    className="border-b border-brand-end/30"
                  >
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-4 py-4">
                      {Array(columnCount)
                        .fill(0)
                        .map((_, colIndex) => (
                          <Skeleton
                            key={`cell-${rowIndex}-${colIndex}`}
                            className={`h-5 ${
                              colIndex === columnCount ? "w-24" : "w-full"
                            }`}
                          />
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Pagination Skeleton */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Showing X to Y of Z entries */}
            <Skeleton className="h-5 w-48 md:w-64" />

            {/* Pagination buttons */}
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20 rounded-md" />
              <Skeleton className="h-9 w-20 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewLayoutSkeleton;
