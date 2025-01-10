import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useGetCategoryQuery,
  useGetSubCategoriesQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { AlertCircle, Plus, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const ProductCategories = ({ formData, onChange }) => {
  const {
    data: categoryData,
    isError: isCategoryError,
    error: categoryError,
  } = useGetCategoryQuery();
  const { data: subCategoryData } = useGetSubCategoriesQuery();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    if (isCategoryError) {
      toast.error(categoryError?.data?.message);
    }
  }, [isCategoryError, categoryError]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(dropdownRefs.current).forEach(([categoryId, ref]) => {
        if (ref && !ref.contains(event.target)) {
          setExpandedCategory((prev) => (prev === categoryId ? null : prev));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSubCategoriesForCategory = (categoryId) => {
    return (
      subCategoryData?.sub_categories?.filter(
        (subCat) => subCat.category._id === categoryId
      ) || []
    );
  };

  const onCheckboxChange = (field, value, checked) => {
    const currentValues = formData[field] || [];
    let newValues;

    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }

    onChange({ target: { name: field, value: newValues } });
  };

  if (!categoryData?.categories || categoryData.categories.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categoryData?.categories?.map((category) => {
            const hasSubCategories =
              getSubCategoriesForCategory(category._id).length > 0;
            const isExpanded = expandedCategory === category._id;

            return (
              <div
                key={category._id}
                className="relative"
                ref={(el) => (dropdownRefs.current[category._id] = el)}
              >
                <div
                  className={`flex items-center justify-between p-4 rounded-lg shadow-sm cursor-pointer
                    ${
                      formData.productCategory === category._id
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    } hover:shadow-md transition-shadow`}
                  onClick={() =>
                    hasSubCategories &&
                    setExpandedCategory(isExpanded ? null : category._id)
                  }
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={category._id}
                      checked={formData.productCategory === category._id}
                      onCheckedChange={(checked) =>
                        onCheckboxChange(
                          "productCategory",
                          category._id,
                          checked
                        )
                      }
                      onClick={(e) => e.stopPropagation()}
                      className={`h-4 w-4 ${
                        formData.productCategory === category._id
                          ? "text-blue-600"
                          : "text-gray-400"
                      } hover:text-blue-600`}
                    />
                    <Label htmlFor={category._id} className="cursor-pointer">
                      {category.name}
                    </Label>
                  </div>
                  {hasSubCategories && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Sub-categories Dropdown */}
                {isExpanded && hasSubCategories && (
                  <div className="absolute z-10 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95">
                    <div className="max-h-[250px] overflow-y-auto">
                      {getSubCategoriesForCategory(category._id).map(
                        (subCategory) => {
                          const subCategoryNames = subCategory.name
                            .split(",")
                            .map((name) => name.trim());

                          return subCategoryNames.map((name, nameIdx) => {
                            const subCategoryId = `${subCategory._id}-${nameIdx}`;
                            const isSubChecked =
                              formData.productSubCategories?.includes(
                                subCategoryId
                              );

                            return (
                              <div
                                key={subCategoryId}
                                className={`flex items-center gap-3 p-3 mx-1 rounded-md
                                  ${isSubChecked ? "bg-blue-50" : "bg-white"}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Checkbox
                                  id={subCategoryId}
                                  checked={isSubChecked}
                                  onCheckedChange={(checked) =>
                                    onCheckboxChange(
                                      "productSubCategories",
                                      subCategoryId,
                                      checked
                                    )
                                  }
                                  className={`h-4 w-4 transition-colors duration-200
                                    ${
                                      isSubChecked
                                        ? "text-blue-600"
                                        : "text-gray-400"
                                    }
                                    hover:text-blue-600`}
                                />
                                <Label
                                  htmlFor={subCategoryId}
                                  className={`text-sm cursor-pointer flex-1
                                    ${
                                      isSubChecked
                                        ? "text-blue-700 font-medium"
                                        : "text-gray-600"
                                    }
                                    hover:text-blue-700 transition-colors duration-200`}
                                >
                                  {name}
                                </Label>
                              </div>
                            );
                          });
                        }
                      )}
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

export default ProductCategories;
