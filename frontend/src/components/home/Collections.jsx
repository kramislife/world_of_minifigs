import React from "react";
import CollectionGrid from "@/components/home/components/CollectionGrid";
import { useCollections } from "@/hooks/Product/useCollections";

const Collections = () => {
  const { collections, handleCollectionClick, isLoading } =
    useCollections(false);
  const limitedCollections = collections.slice(0, 9);

  return (
    <section className="p-5">
      <CollectionGrid
        collections={limitedCollections}
        onCollectionClick={handleCollectionClick}
        isInView={true}
        showViewAll={true}
        isLoading={isLoading}
        type="browse"
      />
    </section>
  );
};

export default Collections;
