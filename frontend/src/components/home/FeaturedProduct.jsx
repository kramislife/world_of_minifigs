import React from "react";
import {
  FallbackMessage,
  PlaceholderImage,
} from "@/components/product/shared/FallbackStates";
import { useCollections } from "@/hooks/Product/useCollections";
import { Button } from "@/components/ui/button";
import FeaturedProductSkeleton from "@/components/layout/skeleton/Home/FeaturedProductSkeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const FeaturedProducts = () => {
  // Custom hook to get top two featured collections
  const {
    collections: featuredCollections,
    handleCollectionClick,
    subCollectionsData,
    isLoading,
    isError,
  } = useCollections(true);

  // Show loading state
  if (isLoading) {
    return <FeaturedProductSkeleton />;
  }

  if (isError)
    return (
      <FallbackMessage
        title="Error Loading Featured Collections"
        message="There was a problem loading the featured collections. Please try again later."
      />
    );

  // Show fallback state when no collections are available
  if (!featuredCollections?.length) {
    return (
      <FallbackMessage
        title="No Featured Collections Available"
        message="We're currently updating our featured collections. Please check back later for exciting new products."
      />
    );
  }

  return (
    <section className="pt-3">
      <h2 className="text-3xl font-extrabold text-center py-5">
        Featured Collections
      </h2>
      <div className="space-y-2">
        {/* Show featured collections */}
        {featuredCollections.map((collection) => (
          <div
            key={collection._id}
            className="relative overflow-hidden group cursor-pointer"
            onClick={() => handleCollectionClick(collection)}
          >
            <AspectRatio ratio={16 / 6}>
              {/* Show collection image */}
              {collection.image?.url ? (
                <img
                  src={collection.image.url}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                // Show placeholder image if collection image is not available
                <PlaceholderImage width="w-64" />
              )}
              <div className="absolute inset-0 bg-brand-start/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">{collection.name}</h3>
                  <Button variant="accent" className="w-full">
                    {subCollectionsData?.subcollections?.some(
                      (sub) => sub?.collection?._id === collection._id
                    )
                      ? "View Sub-Collections"
                      : "View Collection"}
                  </Button>
                </div>
              </div>
            </AspectRatio>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
