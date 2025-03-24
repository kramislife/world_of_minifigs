import React from "react";
import Metadata from "@/components/layout/Metadata/Metadata";
import CollectionGrid from "@/components/home/components/CollectionGrid";
import { useCollections } from "@/hooks/Product/useCollections";

// A page to view all collections when the "View All Collections" button on the Home Page is clicked
const CollectionsPage = () => {
  const { collections, handleCollectionClick, isLoading } =
    useCollections(false);

  return (
    <>
      <Metadata title="Collections" />
      <section className="p-4">
        <h2 className="text-3xl text-gray-300 font-extrabold mb-4 pt-6 header-text flex items-center gap-2 py-5">
          <div className="w-1 h-8 bg-red-500 rounded mr-2" />
          <span>Our Collections</span>
        </h2>

        <CollectionGrid
          collections={collections}
          onCollectionClick={handleCollectionClick}
          isInView={true}
          isLoading={isLoading}
        />
      </section>
    </>
  );
};

export default CollectionsPage;
