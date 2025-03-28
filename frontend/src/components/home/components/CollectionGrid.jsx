import React from "react";
import { Card } from "@/components/ui/card";
import {
  PlaceholderImage,
  CategoryFallback,
} from "@/components/product/shared/FallbackStates";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { collectionsAnimations } from "@/hooks/Animation/animationConfig";
import CollectionGridSkeleton from "@/components/layout/skeleton/Home/CollectionGridSkeleton";

// A grid layout to view the collections in three column card layout
const CollectionGrid = ({
  collections,
  onCollectionClick,
  isInView,
  showViewAll = false,
  isError,
  isLoading,
}) => {
  const navigate = useNavigate();
  const animations = collectionsAnimations;

  if (isLoading) {
    return <CollectionGridSkeleton />;
  }

  if (isError) {
    return (
      <CategoryFallback
        title="Error Loading Collections"
        message="There was a problem loading the collections. Please try again later."
      />
    );
  }

  if (!collections?.length) {
    return (
      <CategoryFallback
        title="No Collections Available"
        message="We're refreshing our collections—check back soon for exciting new arrivals!"
      />
    );
  }

  return (
    <div className="flex flex-col">
      {showViewAll && (
        <motion.div
          variants={animations.buttonVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center justify-center pb-10"
        >
          <Button variant="accent" onClick={() => navigate("/collections")}>
            View All Collections
          </Button>
        </motion.div>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        variants={animations.containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {collections.map((collection) => (
          <motion.div
            key={collection._id}
            onClick={() => onCollectionClick(collection)}
            variants={animations.cardVariants}
          >
            <Card className="group relative rounded-lg border border-accent overflow-hidden cursor-pointer">
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
                  <h3 className="text-lg font-semibold text-center text-white">
                    {collection.name}
                  </h3>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CollectionGrid;
