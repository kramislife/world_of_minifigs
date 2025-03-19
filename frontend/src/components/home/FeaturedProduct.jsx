import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { featuredProductAnimations } from "@/hooks/Animation/animationConfig";
import {
  CategoryFallback,
  PlaceholderImage,
} from "@/components/product/shared/FallbackStates";
import { useCollections } from "@/hooks/Product/useCollections";

const FeaturedProducts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Custom hook to get top two featured collections
  const {
    collections: featuredCollections,
    handleCollectionClick,
    subCollectionsData,
  } = useCollections(true);

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-[1920px] mx-auto">
        {featuredCollections.length > 0 ? (
          <>
            <motion.h2
              variants={featuredProductAnimations.titleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-3xl text-gray-300 font-extrabold mb-8 text-center header-text"
            >
              Featured Collections
            </motion.h2>
            <motion.div
              variants={featuredProductAnimations.containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid gap-6 pt-4"
            >
              {/* Show featured collections */}
              {featuredCollections.map((collection) => (
                <motion.div
                  key={collection._id}
                  variants={featuredProductAnimations.imageVariants}
                  className="relative overflow-hidden group"
                  onClick={() => handleCollectionClick(collection)}
                >
                  {/* Show collection image */}
                  {collection.image?.url ? (
                    <motion.img
                      src={collection.image.url}
                      alt={collection.name}
                      className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                  ) : (
                    // Show placeholder image if collection image is not available
                    <PlaceholderImage height="h-[400px] sm:h-[500px] md:h-[600px]" />
                  )}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-darkBrand/50 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {collection.name}
                      </h3>
                      <button className="bg-red-600 hover:bg-button/85 text-white px-6 py-2 rounded-md transition-colors duration-200">
                        {subCollectionsData?.subcollections?.some(
                          (sub) => sub?.collection?._id === collection._id
                        )
                          ? "View Sub-Collections"
                          : "View Collection"}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <CategoryFallback
            title="No Featured Collections Available"
            message="We're currently updating our featured collections. Please check back later for exciting new products."
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
