import { useNavigate } from 'react-router-dom';
import {
  useGetCollectionDetailsQuery,
  useGetSubCollectionsQuery,
} from "@/redux/api/productApi";

export const useSubCollections = (collectionId) => {
  const navigate = useNavigate();

  const { data: collectionDetails, isLoading: isCollectionLoading } =
    useGetCollectionDetailsQuery(collectionId);
  const { data: subCollectionsData, isLoading: isSubCollectionsLoading } =
    useGetSubCollectionsQuery();

  const isLoading = isCollectionLoading || isSubCollectionsLoading;

  // Filter subcollections for the current collection
  const subCollections = subCollectionsData?.subcollections?.filter(
    (sub) => sub.collection?._id === collectionId
  ) || [];

  const handleSubCollectionClick = (subCollection) => {
    navigate(`/products?product_sub_collections=${subCollection._id}`);
  };

  return {
    subCollections,
    collectionDetails,
    isLoading,
    handleSubCollectionClick,
  };
};
