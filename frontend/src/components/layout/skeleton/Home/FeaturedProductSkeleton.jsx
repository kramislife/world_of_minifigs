import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProductSkeleton = () => (
  <section className="pt-5">
    <div className="max-w-[1920px] mx-auto">
      {/* Title skeleton */}

      <Skeleton className="h-10 w-72 mx-auto my-5" />
      {/* Featured collections grid */}
      <div className="space-y-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="relative overflow-hidden group">
            {/* Collection image skeleton */}
            <Skeleton className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-none" />

            {/* Overlay content skeleton */}
            <div className="absolute inset-0 flex items-center justify-center bg-darkBrand/20">
              <div className="text-center space-y-4">
                <Skeleton className="h-8 w-48 mx-auto" />
                <Skeleton className="h-10 w-44 mx-auto rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProductSkeleton;
