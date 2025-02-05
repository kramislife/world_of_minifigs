import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCollectionQuery, useGetSubCollectionsQuery } from '@/redux/api/productApi';
import { toast } from 'react-toastify';

export const useCollections = (featuredOnly = false) => {
  const navigate = useNavigate();
  const { data, isError, error } = useGetCollectionQuery();
  const {
    data: subCollectionsData,
    isError: isSubError,
    error: subError,
  } = useGetSubCollectionsQuery();

  // Filter collections based on featuredOnly parameter
  const collections = data?.collections?.filter(c => 
    featuredOnly ? c.isFeatured : !c.isFeatured
  ) || [];

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || 'Failed to fetch collections');
    }
    if (isSubError) {
      toast.error(subError?.data?.message || 'Failed to fetch sub-collections');
    }
  }, [error, isError, subError, isSubError]);

  const handleCollectionClick = (collection) => {
    if (!collection?._id) {
      toast.error('Invalid collection');
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

  return {
    collections,
    handleCollectionClick,
    isError,
    isSubError,
    subCollectionsData,
  };
};
