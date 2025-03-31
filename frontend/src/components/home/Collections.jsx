import React from "react";
import CollectionGrid from "@/components/home/components/CollectionGrid";
import { useCollections } from "@/hooks/Product/useCollections";

const Collections = () => {
  const { collections, handleCollectionClick, isLoading } =
    useCollections(false);
  const limitedCollections = collections.slice(0, 9);

  return (
    <div className="p-4">
      <CollectionGrid
        collections={limitedCollections}
        onCollectionClick={handleCollectionClick}
        isInView={true}
        showViewAll={true}
        isLoading={isLoading}
        type="browse"
      />
    </div>
  );
};

export default Collections;
