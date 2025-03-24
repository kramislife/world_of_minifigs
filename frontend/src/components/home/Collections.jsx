import React from "react";
import CollectionGrid from "@/components/home/components/CollectionGrid";
import { useCollections } from "@/hooks/Product/useCollections";

const Collections = () => {
  const { collections, handleCollectionClick, isLoading } =
    useCollections(false);
  const limitedCollections = collections.slice(0, 9);

  return (
    <div className="p-4">
      <h2 className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6">
        Browse by Collections
      </h2>
      <CollectionGrid
        collections={limitedCollections}
        onCollectionClick={handleCollectionClick}
        isInView={true}
        showViewAll={true}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Collections;
