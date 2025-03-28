import React from "react";
import { motion } from "framer-motion";
import { featuredProductAnimations } from "@/hooks/Animation/animationConfig";
import {
  CategoryFallback,
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
      <CategoryFallback
        title="Error Loading Featured Collections"
        message="There was a problem loading the featured collections. Please try again later."
      />
    );

  // Show fallback state when no collections are available
  if (!featuredCollections?.length) {
    return (
      <CategoryFallback
        title="No Featured Collections Available"
        message="We're currently updating our featured collections. Please check back later for exciting new products."
      />
    );
  }

  return (
    <div className="max-w-[1920px] mx-auto pt-4">
      <motion.h2
        initial="visible"
        animate="visible"
        variants={featuredProductAnimations.titleVariants}
        className="text-3xl font-extrabold text-center header-text py-6"
      >
        Featured Collections
      </motion.h2>
      <motion.div
        initial="visible"
        animate="visible"
        variants={featuredProductAnimations.containerVariants}
        className="grid gap-2 pt-4"
      >
        {/* Show featured collections */}
        {featuredCollections.map((collection) => (
          <motion.div
            key={collection._id}
            variants={featuredProductAnimations.imageVariants}
            className="relative overflow-hidden group cursor-pointer"
            onClick={() => handleCollectionClick(collection)}
          >
            <AspectRatio ratio={16 / 6} className="w-full">
              {/* Show collection image */}
              {collection.image?.url ? (
                <motion.img
                  src={collection.image.url}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              ) : (
                // Show placeholder image if collection image is not available
                <PlaceholderImage />
              )}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-brand-start/50 flex items-center justify-center opacity-0 group-hover:opacity-100"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">{collection.name}</h3>
                  <Button variant="accent">
                    {subCollectionsData?.subcollections?.some(
                      (sub) => sub?.collection?._id === collection._id
                    )
                      ? "View Sub-Collections"
                      : "View Collection"}
                  </Button>
                </div>
              </motion.div>
            </AspectRatio>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedProducts;
