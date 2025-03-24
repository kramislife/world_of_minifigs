import React from "react";
import { useParams } from "react-router-dom";
import Metadata from "@/components/layout/Metadata/Metadata";
import CollectionGrid from "@/components/home/components/CollectionGrid";
import { useCollections } from "@/hooks/Product/useCollections";

const SubCollectionsPage = () => {
  const { id: collectionId } = useParams();
  const {
    subCollections,
    collectionDetails,
    handleSubCollectionClick,
    isLoading,
  } = useCollections(false, collectionId);

  return (
    <>
      <Metadata
        title={
          collectionDetails?.collection?.name
            ? `${collectionDetails.collection.name}`
            : "Sub-Collections"
        }
      />
      <section className="p-4">
        <h2 className="text-3xl text-gray-300 font-extrabold mb-4 pt-6 header-text flex items-center gap-2 py-5">
          <div className="w-1 h-8 bg-red-500 rounded mr-2" />
          <span>{collectionDetails?.collection?.name}</span>
        </h2>

        <CollectionGrid
          collections={subCollections}
          onCollectionClick={handleSubCollectionClick}
          isInView={true}
          isLoading={isLoading}
        />
      </section>
    </>
  );
};

export default SubCollectionsPage;
