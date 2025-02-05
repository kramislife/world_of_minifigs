import React from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import Metadata from "@/components/layout/Metadata/Metadata";
import { CategoryFallback } from "@/components/product/shared/FallbackStates";
import CollectionGrid from "./CollectionGrid";
import { useSubCollections } from "@/hooks/Product/useSubCollections";

const SubCollectionsPage = () => {
  const { id: collectionId } = useParams();

  // Custom hook to get subcollections for a specific collection
  const {
    subCollections,
    collectionDetails,
    isLoading,
    handleSubCollectionClick,
  } = useSubCollections(collectionId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Metadata
        title={
          collectionDetails?.collection?.name
            ? `${collectionDetails.collection.name} Sub-Collections`
            : "Sub-Collections"
        }
      />
      <section className="p-4">
        {subCollections.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pt-5">
              <div className="flex items-center">
                <div className="flex items-center">
                  <h2 className="text-3xl font-bold">
                    {collectionDetails?.collection?.name}
                  </h2>
                </div>
              </div>
            </div>

            <CollectionGrid
              collections={subCollections}
              onCollectionClick={handleSubCollectionClick}
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
