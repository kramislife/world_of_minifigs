import React from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { PlaceholderImage } from "@/components/product/shared/FallbackStates";
import { motion } from "framer-motion";

// A grid layout to view the collections in three column card layout
const CollectionGrid = ({ collections, onCollectionClick, isInView, animations }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto mb-8"
      variants={animations.containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {collections.map((collection) => (
        <motion.div
          key={collection._id}
          onClick={() => onCollectionClick(collection)}
          className="cursor-pointer"
          variants={animations.cardVariants}
        >
          <Card className="overflow-hidden bg-gradient-r border-none rounded-lg cursor-pointer">
            <div className="relative w-full">
              <motion.div
                initial="initial"
                animate="animate"
                variants={animations.imageVariants}
              >
                {collection.image?.url ? (
                  <img
                    src={collection.image.url}
                    alt={collection.name}
                    className="w-full h-[360px] object-fill"
                  />
                ) : (
                  <PlaceholderImage />
                )}
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-darkBrand/50"
                initial="initial"
                whileHover="hover"
                variants={animations.overlayVariants}
              />
            </div>

            <div className="relative">
              <CardFooter className="p-4 bg-gradient-to-t from-black/60">
                <h3 className="text-base sm:text-lg font-semibold text-gray-200 text-center w-full hover:scale-105 transition-transform duration-200">
                  {collection.name}
                </h3>
              </CardFooter>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CollectionGrid;
