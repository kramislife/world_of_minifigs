import React from "react";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import Metadata from "@/components/layout/Metadata/Metadata";
import { CategoryFallback } from "@/components/product/shared/FallbackStates";
import CollectionGrid from "./CollectionGrid";
import { useCollections } from '@/hooks/Product/useCollections';

// A page to view all collections when the "View All Collections" button on the Home Page is clicked
const CollectionsPage = () => {
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
      <section className="p-4">
        {collections.length > 0 ? (
          <>
            <h2 className="text-3xl text-gray-300 font-extrabold mb-4 pt-6 header-text flex items-center gap-2 py-5">
              <div className="w-1 h-8 bg-red-500 rounded mr-2" />
              <span>Our Collections</span>
            </h2>

            <CollectionGrid
              collections={collections}
              onCollectionClick={handleCollectionClick}
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
