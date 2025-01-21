import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetCollectionQuery,
  useGetSubCollectionsQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import Metadata from "@/components/layout/Metadata/Metadata";
import { CategoryFallback } from "@/components/product/shared/FallbackStates";
import CollectionGrid from "./CollectionGrid";

const CollectionsPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetCollectionQuery();
  const { data: subCollectionsData } = useGetSubCollectionsQuery();

  const collections = data?.collections?.filter((c) => !c.isFeatured) || [];

  if (isError) {
    toast.error(error?.data?.message);
  }

  const handleCollectionClick = (collection) => {
    const hasSubCollections = subCollectionsData?.subcollections?.some(
      (sub) => sub.collection?._id === collection._id
    );
    navigate(
      hasSubCollections
        ? `/collections/${collection._id}`
        : `/products?product_collection=${collection._id}`
    );
  };

  if (isLoading) {
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
