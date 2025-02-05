import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import CollectionGrid from "@/pages/Collections/CollectionGrid";
import { CategoryFallback } from "@/components/product/shared/FallbackStates";
import { collectionsAnimations } from "@/hooks/Animation/animationConfig";
import { useCollections } from '@/hooks/Product/useCollections';

const Collections = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Custom hook to get all collections
  const { collections, handleCollectionClick } = useCollections(false);

  // Limit to 6 collections for homepage display
  const limitedCollections = collections.slice(0, 6);

  return (
    <section ref={ref} className="p-4">
      {limitedCollections.length > 0 ? (
        <>
          <motion.h2
            variants={collectionsAnimations.titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6 header-text"
          >
            Browse by Collections
          </motion.h2>

          <motion.div
            variants={collectionsAnimations.buttonVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center justify-center pb-10"
          >
            <button
              className="py-2 px-6 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700"
              onClick={() => navigate("/collections")}
            >
              View All Collections
            </button>
          </motion.div>

          <CollectionGrid
            collections={limitedCollections}
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
  );
};

export default Collections;
