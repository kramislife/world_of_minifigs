import React from "react";
import {
  useGetCollectionQuery,
  useGetSubCollectionsQuery,
} from "@/redux/api/productApi";
import DropdownSelection from "@/components/admin/shared/DropdownSelection";

const ProductCollections = ({ formData, onCheckboxChange }) => {
  const {
    data: collectionData,
    isError: isCollectionError,
    error: collectionError,
  } = useGetCollectionQuery();
  const {
    data: subCollectionData,
    isError: isSubCollectionError,
    error: subCollectionError,
  } = useGetSubCollectionsQuery();

  const getSubCollectionsForCollection = (collectionId) => {
    return (
      subCollectionData?.subcollections?.filter(
        (subCollection) => subCollection.collection?._id === collectionId
      ) || []
    );
  };

  return (
    <DropdownSelection
      title="Product Collections"
      mainData={collectionData?.collections}
      subData={subCollectionData?.subcollections}
      formData={formData}
      onCheckboxChange={onCheckboxChange}
      mainField="productCollections"
      subField="productSubCollections"
      getSubItems={getSubCollectionsForCollection}
      isError={isCollectionError || isSubCollectionError}
      error={collectionError || subCollectionError}
      addNewLink="/admin/new-collection"
    />
  );
};

export default ProductCollections;
