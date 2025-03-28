import { Skeleton } from "@/components/ui/skeleton";

const SkeletonGrid = () => (
  <div className="p-4">
    <Skeleton className="h-8 w-64 mx-auto mb-4 mt-6" />
    <Skeleton className="h-10 w-32 mx-auto mb-10" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-5">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-brand-end rounded-2xl overflow-hidden shadow-xl h-full"
        >
          {/* Product Image */}
          <Skeleton className="w-full aspect-square rounded-none" />

          {/* Product Info */}
          <div className="p-5 flex flex-col gap-5">
            <Skeleton className="h-6 w-3/4" /> {/* Title */}
            {/* Price and Rating */}
            <div className="flex flex-col gap-3 mt-auto">
              <div className="flex items-baseline justify-between">
                <Skeleton className="h-8 w-24" /> {/* Price */}
                <Skeleton className="h-4 w-16" /> {/* Original price */}
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className="h-4 w-4" /> // Stars
                    ))}
                  </div>
                  <Skeleton className="h-4 w-12" /> {/* Review count */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonGrid;
