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
      <section className="p-5">
        <CollectionGrid
          collections={subCollections}
          onCollectionClick={handleSubCollectionClick}
          isInView={true}
          isLoading={isLoading}
          type="sub-collections"
          collectionName={collectionDetails?.collection?.name}
        />
      </section>
    </>
  );
};

export default SubCollectionsPage;
