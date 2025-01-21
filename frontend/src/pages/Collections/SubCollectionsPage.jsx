import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCollectionDetailsQuery,
  useGetSubCollectionsQuery,
} from "@/redux/api/productApi";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import Metadata from "@/components/layout/Metadata/Metadata";
import { Button } from "@/components/ui/button";
import { CategoryFallback } from "@/components/product/shared/FallbackStates";
import { ArrowLeft } from "lucide-react";
import CollectionGrid from "./CollectionGrid";

const SubCollectionsPage = () => {
  const navigate = useNavigate();
  const { id: collectionId } = useParams();

  const { data: collectionDetails, isLoading: isCollectionLoading } =
    useGetCollectionDetailsQuery(collectionId);
  const { data: subCollectionsData, isLoading: isSubCollectionsLoading } =
    useGetSubCollectionsQuery();

  const isLoading = isCollectionLoading || isSubCollectionsLoading;

  const handleSubCollectionClick = (subCollection) => {
    navigate(`/products?product_sub_collections=${subCollection._id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const subCollections =
    subCollectionsData?.subcollections?.filter(
      (sub) => sub.collection?._id === collectionId
    ) || [];

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
                  {/* <Button
                    variant="ghost"
                    className="p-2 hover:bg-transparent rounded-full mr-2"
                    onClick={() => navigate("/collections")}
                  >
                    <ArrowLeft className="h-6 w-6 text-red-500" />
                  </Button> */}
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
