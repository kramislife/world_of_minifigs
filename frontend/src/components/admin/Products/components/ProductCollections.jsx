import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useGetCollectionQuery,
  useGetSubCollectionsQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { ChevronRight, AlertCircle, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

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

  const [expandedCollections, setExpandedCollections] = useState({});
  const dropdownRefs = useRef({});

  useEffect(() => {
    if (isCollectionError) {
      toast.error(collectionError?.data?.message);
    }
    if (isSubCollectionError) {
      toast.error(subCollectionError?.data?.message);
    }
  }, [
    isCollectionError,
    isSubCollectionError,
    collectionError,
    subCollectionError,
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(dropdownRefs.current).forEach(([collectionId, ref]) => {
        if (
          ref &&
          !ref.contains(event.target) &&
          !event.target.closest(".collection-item")
        ) {
          setExpandedCollections((prev) => ({
            ...prev,
            [collectionId]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSubCollectionsForCollection = (collectionId) => {
    return (
      subCollectionData?.subcollections?.filter(
        (subCollection) => subCollection.collection?._id === collectionId
      ) || []
    );
  };

  const toggleCollection = (collectionId) => {
    setExpandedCollections((prev) => ({
      ...prev,
      [collectionId]: !prev[collectionId],
    }));
  };

  const getCollectionNameArray = (name) => {
    return name.split(",").map((item) => item.trim());
  };

  const isSubCollectionChecked = (subCollectionId) => {
    return formData.productSubCollections?.includes(subCollectionId);
  };

  const handleSubCollectionChange = (
    collectionId,
    subCollectionId,
    checked
  ) => {
    // First, handle the subcollection change
    onCheckboxChange("productSubCollections", subCollectionId, checked);

    // If checking a subcollection, ensure the parent collection is also checked
    if (checked && !formData.productCollections?.includes(collectionId)) {
      onCheckboxChange("productCollections", collectionId, true);
    }

    // If unchecking a subcollection, check if we should uncheck the parent
    if (!checked) {
      // Get all subcollections for this collection
      const subCollections = getSubCollectionsForCollection(collectionId);
      // Check if any other subcollections are still selected
      const hasOtherSelectedSubCollections = subCollections.some(
        (subCol) =>
          formData.productSubCollections?.includes(subCol._id) &&
          subCol._id !== subCollectionId
      );

      // If no other subcollections are selected, uncheck the parent collection
      if (!hasOtherSelectedSubCollections) {
        onCheckboxChange("productCollections", collectionId, false);
      }
    }
  };

  if (!collectionData?.collections || collectionData.collections.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-lg font-semibold">Product Collections</Label>
        </div>
        <Link to="/admin/new-collection">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg space-y-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <Plus size={24} className="text-gray-400" />
            <p className="text-gray-500 text-center">
              No collections available. Click to add collections.
            </p>
          </div>
        </Link>
      </div>
    );
  }

  if (isCollectionError) {
    return (
      <div className="flex items-center gap-2 text-red-500 p-4 border rounded-lg">
        <AlertCircle size={20} />
        <p>Error loading collections. Please try again later.</p>
      </div>
    );
  }

  return (
    <Card className="w-full shadow-none border-none">
      <CardContent className="p-0">
        <Label className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          Product Collections
        </Label>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collectionData?.collections?.map((collection) => {
            const isChecked = formData.productCollections?.includes(
              collection._id
            );
            const subCollections = getSubCollectionsForCollection(
              collection._id
            );
            const hasSubCollections = subCollections.length > 0;
            const isExpanded = expandedCollections[collection._id];
            const collectionNames = getCollectionNameArray(collection.name);

            return (
              <div
                key={collection._id}
                className="relative group collection-item"
                ref={(el) => (dropdownRefs.current[collection._id] = el)}
              >
                <div
                  className={`flex items-center gap-3 p-4 rounded-lg 
                    ${
                      isChecked
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                    } 
                    border hover:bg-blue-50 cursor-pointer transition-all duration-200 ease-in-out
                    ${hasSubCollections ? "hover:shadow-md" : ""}`}
                  onClick={() =>
                    hasSubCollections && toggleCollection(collection._id)
                  }
                >
                  <Checkbox
                    id={collection._id}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      onCheckboxChange(
                        "productCollections",
                        collection._id,
                        checked
                      )
                    }
                    className={`h-4 w-4 transition-colors duration-200
                      ${isChecked ? "text-blue-600" : "text-gray-400"}
                      hover:text-blue-600`}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex-1">
                    {collectionNames.map((name, idx) => (
                      <Label
                        key={idx}
                        htmlFor={collection._id}
                        className={`text-sm cursor-pointer font-medium block
                          ${isChecked ? "text-blue-700" : "text-gray-700"}
                          group-hover:text-blue-700 transition-colors duration-200`}
                      >
                        {name}
                      </Label>
                    ))}
                  </div>
                  {hasSubCollections && (
                    <ChevronRight
                      className={`h-4 w-4 transition-all duration-200
                        ${isChecked ? "text-blue-600" : "text-gray-400"}
                        group-hover:text-blue-600
                        ${isExpanded ? "rotate-90" : ""}`}
                    />
                  )}
                </div>

                {/* Sub-collections Dropdown */}
                {isExpanded && hasSubCollections && (
                  <div className="absolute z-10 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="max-h-[250px] overflow-y-auto">
                      {subCollections.map((subCollection) => (
                        <div
                          key={subCollection._id}
                          className="flex items-center gap-3 p-3 mx-1 rounded-md"
                        >
                          <Checkbox
                            id={subCollection._id}
                            checked={formData.productSubCollections?.includes(
                              subCollection._id
                            )}
                            onCheckedChange={(checked) =>
                              handleSubCollectionChange(
                                collection._id,
                                subCollection._id,
                                checked
                              )
                            }
                            className={`h-4 w-4 transition-colors duration-200
                              ${
                                formData.productSubCollections?.includes(
                                  subCollection._id
                                )
                                  ? "text-blue-600"
                                  : "text-gray-400"
                              }
                              hover:text-blue-600`}
                          />
                          <Label
                            htmlFor={subCollection._id}
                            className="text-sm cursor-pointer"
                          >
                            {subCollection.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCollections;
