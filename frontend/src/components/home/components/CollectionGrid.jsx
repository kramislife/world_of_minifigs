import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  PlaceholderImage,
  FallbackMessage,
} from "@/components/product/shared/FallbackStates";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CollectionGridSkeleton from "@/components/layout/skeleton/Home/CollectionGridSkeleton";

// A grid layout to view the collections in three column card layout
const CollectionGrid = ({
  collections,
  onCollectionClick,
  showViewAll = false,
  isError,
  isLoading,
  type = "default", // Can be "browse", "collections", or "sub-collections"
  collectionName = "", // For sub-collections title
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <CollectionGridSkeleton type={type} />;
  }

  if (isError) {
    return (
      <FallbackMessage
        title="Error Loading Collections"
        message="There was a problem loading the collections. Please try again later."
      />
    );
  }

  if (!collections?.length) {
    return (
      <FallbackMessage
        title="No Collections Available"
        message="We're refreshing our collections—check back soon for exciting new arrivals!"
      />
    );
  }

  const renderTitle = () => {
    switch (type) {
      case "browse":
        return (
          <h2 className="text-3xl font-extrabold text-center py-5">
            Browse by Collections
          </h2>
        );
      case "collections":
        return (
          <h2 className="text-3xl text-gray-300 font-extrabold py-5 header-text flex items-center gap-2">
            <div className="w-1 h-8 bg-accent rounded mr-2" />
            <span>Our Collections</span>
          </h2>
        );
      case "sub-collections":
        return (
          <h2 className="text-3xl text-gray-300 font-extrabold py-5 header-text flex items-center gap-2">
            <div className="w-1 h-8 bg-accent rounded mr-2" />
            <span>{collectionName}</span>
          </h2>
        );
      default:
        return null;
    }
  };

  return (
    <section>
      {renderTitle()}

      {showViewAll && (
        <div className="flex items-center justify-center mb-5">
          <Button variant="accent" onClick={() => navigate("/collections")}>
            View All Collections
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {collections.map((collection) => (
          <div
            key={collection._id}
            onClick={() => onCollectionClick(collection)}
          >
            <Card className="group relative rounded-lg border border-accent overflow-hidden cursor-pointer">
              <CardContent className="p-0">
                {/* Fixed aspect ratio container */}
                <div className="relative aspect-[16/9]">
                  {collection.image?.url ? (
                    <img
                      src={collection.image.url}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-start flex flex-col items-center justify-center">
                      <PlaceholderImage />
                    </div>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />

                  {/* Title overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-lg font-semibold text-center text-background">
                      {collection.name}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid;
