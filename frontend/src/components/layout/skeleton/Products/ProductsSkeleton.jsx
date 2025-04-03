import { Skeleton } from "@/components/ui/skeleton";

const ProductsSkeleton = () => {
  return (
    <div className="mx-auto px-4 py-8 bg-brand-end/50">
      {/* Mobile Filter and Sort */}
      <div className="lg:hidden mb-4 flex items-center justify-between">
        <Skeleton className="h-9 w-24" /> {/* Filter button */}
        <Skeleton className="h-9 w-[220px]" /> {/* Sort dropdown */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-2">
        {/* Desktop Filter */}
        <div className="hidden lg:block col-span-1">
          <div className="border border-brand-end rounded-md shadow-lg p-4 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-none">
            <div className="flex items-center mb-4 space-x-2">
              <Skeleton className="h-6 w-24" /> {/* "Filters" text */}
            </div>
            <div className="space-y-4">
              {/* Filter categories */}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-8 w-full" /> {/* Category header */}
                  <div className="space-y-4">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Skeleton className="h-5 w-32" /> {/* Option text */}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid with Sort */}
        <div className="col-span-1 lg:col-span-3">
          {/* Desktop Sort */}
          <div className="hidden lg:block mb-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48" /> {/* Product count */}
              <Skeleton className="h-9 w-[220px]" /> {/* Sort dropdown */}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-brand-start rounded-2xl overflow-hidden shadow-xl h-full"
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

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-24" /> {/* Previous button */}
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-9 w-9" /> // Page numbers
              ))}
              <Skeleton className="h-9 w-24" /> {/* Next button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSkeleton;
