import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useGetCategoryQuery,
  useGetSubCategoriesQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProductCategories = ({ formData, onCheckboxChange }) => {
  const {
    data: categoryData,
    isError: isCategoryError,
    error: categoryError,
  } = useGetCategoryQuery();
  const {
    data: subCategoryData,
    isError: isSubCategoryError,
    error: subCategoryError,
  } = useGetSubCategoriesQuery();

  const [expandedCategories, setExpandedCategories] = useState({});
  const dropdownRefs = useRef({});

  useEffect(() => {
    if (isCategoryError) {
      toast.error(categoryError?.data?.message);
    }
    if (isSubCategoryError) {
      toast.error(subCategoryError?.data?.message);
    }
  }, [isCategoryError, isSubCategoryError, categoryError, subCategoryError]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(dropdownRefs.current).forEach(([categoryId, ref]) => {
        if (ref && !ref.contains(event.target)) {
          setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSubCategoriesForCategory = (categoryId) => {
    return (
      subCategoryData?.sub_categories?.filter(
        (subCategory) => subCategory.category?._id === categoryId
      ) || []
    );
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  if (!categoryData?.categories || categoryData.categories.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-5">
          <Label className="text-lg font-semibold">Product Categories</Label>
        </div>
        <Link to="/admin/new-category">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg space-y-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <Plus size={24} className="text-gray-400" />
            <p className="text-gray-500 text-center">
              No categories available. Click to add categories.
            </p>
          </div>
        </Link>
      </div>
    );
  }

  if (isCategoryError) {
    return (
      <div className="flex items-center gap-2 text-red-500 p-4 border rounded-lg">
        <AlertCircle size={20} />
        <p>Error loading categories. Please try again later.</p>
      </div>
    );
  }

  return (
    <Card className="w-full shadow-none border-none">
      <CardContent className="p-0">
        <Label className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          Product Categories
        </Label>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryData?.categories.map((category) => {
            const isChecked = formData.productCategories?.includes(
              category._id
            );
            const subCategories = getSubCategoriesForCategory(category._id);
            const hasSubCategories = subCategories.length > 0;
            const isExpanded = expandedCategories[category._id];

            return (
              <div
                key={category._id}
                className="relative group"
                ref={(el) => (dropdownRefs.current[category._id] = el)}
              >
                <div
                  className={`flex items-center gap-3 p-4 rounded-lg 
                    ${
                      isChecked
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                    } 
                    border hover:bg-blue-50 cursor-pointer transition-all duration-200 ease-in-out
                    ${hasSubCategories ? "hover:shadow-md" : ""}`}
                  onClick={() =>
                    hasSubCategories && toggleCategory(category._id)
                  }
                >
                  <Checkbox
                    id={category._id}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      onCheckboxChange(
                        "productCategories",
                        category._id,
                        checked
                      )
                    }
                    className={`h-4 w-4 transition-colors duration-200
                      ${isChecked ? "text-blue-600" : "text-gray-400"}
                      hover:text-blue-600`}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Label
                    htmlFor={category._id}
                    className={`text-sm flex-1 cursor-pointer font-medium
                      ${isChecked ? "text-blue-700" : "text-gray-700"}
                      group-hover:text-blue-700 transition-colors duration-200`}
                  >
                    {category.name}
                  </Label>
                  {hasSubCategories && (
                    <ChevronRight
                      className={`h-4 w-4 transition-all duration-200
                        ${isChecked ? "text-blue-600" : "text-gray-400"}
                        group-hover:text-blue-600
                        ${isExpanded ? "rotate-90" : ""}`}
                    />
                  )}
                </div>

                {/* Sub-categories Dropdown */}
                {isExpanded && hasSubCategories && (
                  <div className="absolute z-10 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 animate-in fade-in-0 zoom-in-95">
                    {subCategories.map((subCategory) => {
                      const isSubChecked =
                        formData.productSubCategories?.includes(
                          subCategory._id
                        );
                      return (
                        <div
                          key={subCategory._id}
                          className={`flex items-center gap-3 p-3 
                            ${isSubChecked ? "bg-blue-50" : "bg-white"} 
                            hover:bg-blue-50 transition-colors duration-200`}
                        >
                          <Checkbox
                            id={subCategory._id}
                            checked={isSubChecked}
                            onCheckedChange={(checked) =>
                              onCheckboxChange(
                                "productSubCategories",
                                subCategory._id,
                                checked
                              )
                            }
                            className={`h-4 w-4 transition-colors duration-200
                              ${
                                isSubChecked ? "text-blue-600" : "text-gray-400"
                              }
                              hover:text-blue-600`}
                          />
                          <Label
                            htmlFor={subCategory._id}
                            className={`text-sm cursor-pointer
                              ${
                                isSubChecked
                                  ? "text-blue-700 font-medium"
                                  : "text-gray-600"
                              }
                              hover:text-blue-700 transition-colors duration-200`}
                          >
                            {subCategory.name}
                          </Label>
                        </div>
                      );
                    })}
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

export default ProductCategories;
