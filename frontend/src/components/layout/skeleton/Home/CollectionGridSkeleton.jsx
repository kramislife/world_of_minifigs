import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const CollectionGridSkeleton = ({ type = "default" }) => {
  const renderTitleSkeleton = () => {
    switch (type) {
      case "browse":
        return (
          <div className="flex justify-center">
            <Skeleton className="h-12 w-64 my-5" />
          </div>
        );
      case "collections":
      case "sub-collections":
        return (
          <div className="flex items-center gap-2 py-5">
            <Skeleton className="h-12 w-64" />
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
        <div className="flex items-center justify-center pb-2">
          <Skeleton className="h-10 w-36" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-5">
        {[...Array(type === "browse" ? 9 : 6)].map((_, index) => (
          <Card
            key={index}
            className="group relative rounded-lg border border-accent overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="relative aspect-[16/9]">
                <Skeleton className="w-full h-full absolute" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CollectionGridSkeleton;
