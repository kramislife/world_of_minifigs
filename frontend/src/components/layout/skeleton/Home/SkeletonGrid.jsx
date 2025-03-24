import { Skeleton } from "@/components/ui/skeleton";

const SkeletonGrid = () => (
  <div className="p-4">
    <Skeleton className="h-8 w-64 mx-auto mb-4 mt-6" />
    <Skeleton className="h-10 w-32 mx-auto mb-10" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 py-5">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[300px] w-full rounded-2xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonGrid;
