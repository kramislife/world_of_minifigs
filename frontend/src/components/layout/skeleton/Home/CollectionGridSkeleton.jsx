import { Skeleton } from "@/components/ui/skeleton";

const CollectionGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto my-8">
      {[...Array(6)].map((_, index) => (
        <div key={index}>
          <div className="overflow-hidden bg-gradient-r border-none rounded-lg h-[280px] relative">
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <Skeleton className="h-6 w-3/4 mx-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionGridSkeleton;
