import { Skeleton } from "@/components/ui/skeleton";

const SkeletonBanner = () => {
  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="relative">
        {/* Main banner skeleton */}
        <Skeleton className="w-full aspect-[16/7]" />

        {/* Navigation button skeletons */}
        <Skeleton className="absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 rounded-full" />
        <Skeleton className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 rounded-full" />

        {/* Optional: Content overlay skeleton */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-lg" />
            <Skeleton className="w-48 h-6" />
            <Skeleton className="w-64 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonBanner;
