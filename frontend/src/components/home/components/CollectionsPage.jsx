import React from "react";
import Metadata from "@/components/layout/Metadata/Metadata";
import CollectionGrid from "@/components/home/components/CollectionGrid";
import { useCollections } from "@/hooks/Product/useCollections";

// Display all collections when the "View All Collections" button on the Home Page is clicked
const CollectionsPage = () => {
  const { collections, handleCollectionClick, isLoading } =
    useCollections(false);

  return (
    <>
      <Metadata title="Collections" />
      <section className="p-5">
        <CollectionGrid
          collections={collections}
          onCollectionClick={handleCollectionClick}
          isInView={true}
          isLoading={isLoading}
          type="collections"
        />
      </section>
    </>
  );
};

export default CollectionsPage;
