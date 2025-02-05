import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import Metadata from "@/components/layout/Metadata/Metadata";
import { CategoryFallback } from "@/components/product/shared/FallbackStates";
import CollectionGrid from "./CollectionGrid";
import { useCollections } from '@/hooks/Product/useCollections';
import { collectionsAnimations } from "@/hooks/Animation/animationConfig";

// A page to view all collections when the "View All Collections" button on the Home Page is clicked
const CollectionsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { collections, handleCollectionClick, isError } = useCollections(false);

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Metadata title="Collections" />
      <section ref={ref} className="p-4">
        {collections.length > 0 ? (
          <>
            <motion.h2
              variants={collectionsAnimations.titleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-3xl text-gray-300 font-extrabold mb-4 pt-6 header-text flex items-center gap-2 py-5"
            >
              <div className="w-1 h-8 bg-red-500 rounded mr-2" />
              <span>Our Collections</span>
            </motion.h2>

            <CollectionGrid
              collections={collections}
              onCollectionClick={handleCollectionClick}
              isInView={isInView}
              animations={collectionsAnimations}
            />
          </>
        ) : (
          <CategoryFallback
            title="No Collections Available"
            message="We're currently updating our collections. Please check back later for exciting new products."
          />
        )}
      </section>
    </>
  );
};

export default CollectionsPage;
