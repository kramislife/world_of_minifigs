import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetCollectionQuery,
  useGetSubCollectionsQuery,
  useGetCollectionDetailsQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";

export const useCollections = (featuredOnly = false, collectionId = null) => {
  const navigate = useNavigate();
  const { data, isError, error } = useGetCollectionQuery();
  const { data: collectionDetails, isLoading: isCollectionLoading } =
    useGetCollectionDetailsQuery(collectionId, { skip: !collectionId });
  const {
    data: subCollectionsData,
    isError: isSubError,
    error: subError,
    isLoading: isSubCollectionsLoading,
  } = useGetSubCollectionsQuery();

  const isLoading = isCollectionLoading || isSubCollectionsLoading;

  // Filter collections based on featuredOnly parameter
  const collections =
    data?.collections?.filter((c) =>
      featuredOnly ? c.isFeatured : !c.isFeatured
    ) || [];

  // Filter subcollections for a specific collection if collectionId is provided
  const subCollections = collectionId
    ? subCollectionsData?.subcollections?.filter(
        (sub) => sub.collection?._id === collectionId
      ) || []
    : [];

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to fetch collections");
    }
    if (isSubError) {
      toast.error(subError?.data?.message || "Failed to fetch sub-collections");
    }
  }, [error, isError, subError, isSubError]);

  const handleCollectionClick = (collection) => {
    if (!collection?._id) {
      toast.error("Invalid collection");
      return;
    }

    const hasSubCollections = subCollectionsData?.subcollections?.some(
      (sub) => sub?.collection?._id === collection._id
    );

    navigate(
      hasSubCollections
        ? `/collections/${collection._id}`
        : `/products?product_collection=${collection._id}`
    );
  };

  const handleSubCollectionClick = (subCollection) => {
    navigate(`/products?product_sub_collections=${subCollection._id}`);
  };

  return {
    collections,
    subCollections,
    collectionDetails,
    handleCollectionClick,
    handleSubCollectionClick,
    isError,
    isSubError,
    isLoading,
    subCollectionsData,
  };
};
