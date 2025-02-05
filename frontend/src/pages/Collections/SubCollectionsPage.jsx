import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import Metadata from "@/components/layout/Metadata/Metadata";
import { CategoryFallback } from "@/components/product/shared/FallbackStates";
import CollectionGrid from "./CollectionGrid";
import { useSubCollections } from "@/hooks/Product/useSubCollections";
import { collectionsAnimations } from "@/hooks/Animation/animationConfig";

const SubCollectionsPage = () => {
  const { id: collectionId } = useParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const {
    subCollections,
    collectionDetails,
    isLoading,
    isError,
    handleSubCollectionClick,
  } = useSubCollections(collectionId);

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CategoryFallback
          title="Error Loading Collections"
          message="There was an error loading the collections. Please try again later."
        />
      </div>
    );
  }

  return (
    <>
      <Metadata
        title={
          collectionDetails?.collection?.name
            ? `${collectionDetails.collection.name}`
            : "Sub-Collections"
        }
      />
      <section ref={ref} className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        ) : subCollections.length > 0 ? (
          <>
            <motion.h2
              variants={collectionsAnimations.titleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-3xl text-gray-300 font-extrabold mb-4 pt-6 header-text flex items-center gap-2 py-5"
            >
              <div className="w-1 h-8 bg-red-500 rounded mr-2" />
              <span>{collectionDetails?.collection?.name}</span>
            </motion.h2>

            <CollectionGrid
              collections={subCollections}
              onCollectionClick={handleSubCollectionClick}
              isInView={isInView}
              animations={collectionsAnimations}
            />
          </>
        ) : (
          <CategoryFallback
            title="No Sub-Collections Available"
            message="We're currently updating our sub-collections. Please check back later for exciting new products."
          />
        )}
      </section>
    </>
  );
};

export default SubCollectionsPage;
