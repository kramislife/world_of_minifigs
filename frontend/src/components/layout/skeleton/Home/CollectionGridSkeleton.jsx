import { Skeleton } from "@/components/ui/skeleton";

const CollectionGridSkeleton = ({ type = "default" }) => {
  const renderTitleSkeleton = () => {
    switch (type) {
      case "browse":
        return (
          <div className="flex justify-center mb-4 pt-6">
            <Skeleton className="h-10 w-64" />
          </div>
        );
      case "collections":
      case "sub-collections":
        return (
          <div className="flex items-center gap-2 mb-4 pt-6">
            <Skeleton className="w-1 h-8 bg-red-500/20" />
            <Skeleton className="h-10 w-64" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      {renderTitleSkeleton()}

      {type === "browse" && (
        <div className="flex items-center justify-center pb-10">
          <Skeleton className="h-10 w-36" /> {/* View All button skeleton */}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[...Array(type === "browse" ? 9 : 6)].map((_, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden border border-accent/20"
          >
            <div className="relative aspect-[16/9]">
              <Skeleton className="w-full h-full absolute" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <Skeleton className="h-6 w-3/4 mx-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionGridSkeleton;
