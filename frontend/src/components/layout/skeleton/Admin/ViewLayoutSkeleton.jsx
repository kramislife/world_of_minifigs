import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ViewLayoutSkeleton = ({ title = "Items", columnCount = 5 }) => {
  return (
    <div className="py-6 px-2">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-6 w-80" />
        </div>
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>

      {/* Card Section */}
      <Card className="bg-brand-start border-brand-end/30">
        <CardContent className="p-6 md:p-10">
          {/* Controls Row */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-64 rounded-lg" />
          </div>

          {/* Table Skeleton */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="mb-4 border-b border-brand-end/30 pb-4">
                <div className="flex justify-between items-center gap-4">
                  {Array(columnCount)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton
                        key={`header-${i}`}
                        className={`h-8 ${i === 0 ? "w-10" : "flex-1"} rounded`}
                      />
                    ))}
                </div>
              </div>

              {/* Table Rows */}
              {Array(7)
                .fill(0)
                .map((_, rowIndex) => (
                  <div
                    key={`row-${rowIndex}`}
                    className="py-4 border-b border-brand-end/30 flex justify-between items-center gap-4"
                  >
                    {Array(columnCount)
                      .fill(0)
                      .map((_, colIndex) => (
                        <Skeleton
                          key={`cell-${rowIndex}-${colIndex}`}
                          className={`h-6 ${
                            colIndex === 0
                              ? "w-10"
                              : colIndex === columnCount - 1
                              ? "w-24"
                              : "flex-1"
                          } rounded`}
                        />
                      ))}
                  </div>
                ))}
            </div>
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-between items-center mt-8">
            <Skeleton className="h-6 w-48" />
            <div className="flex items-center gap-2">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={`page-${i}`}
                    className="h-9 w-9 rounded"
                  />
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewLayoutSkeleton;
