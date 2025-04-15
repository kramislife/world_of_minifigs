import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DashboardSkeleton = () => {
  return (
    <div className="p-5 space-y-5">
      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-3">
          <Skeleton className="h-9 w-64 md:w-96" />
          <Skeleton className="h-5 w-48 md:w-72" />
        </div>
        <Skeleton className="h-10 w-full md:w-[220px]" />
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid gap-3 mb-5 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Card key={index} className="bg-brand-dark/50 border-brand-end/50">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <div className="mt-4">
                <Skeleton className="h-2 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="space-y-5">
        {/* Monthly Trend Chart Skeleton */}
        <Card className="bg-brand-dark/50 border-brand-end/50">
          <CardHeader>
            <Skeleton className="h-7 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        {/* Monthly Comparison Chart Skeleton */}
        <Card className="bg-brand-dark/50 border-brand-end/50">
          <CardHeader>
            <Skeleton className="h-7 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        {/* Month over Month Chart Skeleton */}
        <Card className="bg-brand-dark/50 border-brand-end/50">
          <CardHeader>
            <Skeleton className="h-7 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <Skeleton className="h-[300px] w-full" />
              </div>
              <Card className="bg-brand-dark/50 border-brand-end/50">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                  <Skeleton className="h-16 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-4 w-36" />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
