import React from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { PlaceholderImage } from "@/components/product/shared/FallbackStates";
import { motion } from "framer-motion";
import { categoryAnimations } from "@/hooks/Animation/animationConfig";

const CollectionGrid = ({ collections, onCollectionClick }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto mb-8"
      variants={categoryAnimations.containerVariants}
      initial="hidden"
      animate="visible"
    >
      {collections.map((collection) => (
        <motion.div
          key={collection._id}
          onClick={() => onCollectionClick(collection)}
          className="cursor-pointer"
          variants={categoryAnimations.cardVariants}
        >
          <Card className="overflow-hidden bg-gradient-r border-none rounded-lg cursor-pointer">
            <div className="relative w-full">
              <motion.div
                initial="initial"
                animate="animate"
                variants={categoryAnimations.imageVariants}
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
                variants={categoryAnimations.overlayVariants}
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
