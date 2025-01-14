import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useGetCategoryQuery,
  useGetSubCategoriesQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { AlertCircle, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
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
  const [expandedCategory, setExpandedCategory] = useState({});
  const dropdownRefs = useRef({});

  useEffect(() => {
    if (isCategoryError) {
      toast.error(categoryError?.data?.message);
    }
    if (isSubCategoryError) {
      toast.error(subCategoryError?.data?.message);
    }
  }, [isCategoryError, isSubCategoryError, categoryError, subCategoryError]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(dropdownRefs.current).forEach(([categoryId, ref]) => {
        if (
          ref &&
          !ref.contains(event.target) &&
          !event.target.closest(".category-item")
        ) {
          setExpandedCategory((prev) => ({
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
        (subCategory) => subCategory.category._id === categoryId
      ) || []
    );
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategory((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const getCategoryNameArray = (name) => {
    return name.split(",").map((item) => item.trim());
  };

  const handleSubCategoryChange = (categoryId, subCategoryId, checked) => {
    // Handle subcategory checkbox change
    onCheckboxChange("productSubCategories", subCategoryId, checked);

    // If checking a subcategory, ensure parent category is checked
    if (checked && !formData.productCategory?.includes(categoryId)) {
      onCheckboxChange("productCategory", categoryId, true);
    }

    // If unchecking a subcategory, check if we should uncheck parent
    if (!checked) {
      const subCategories = getSubCategoriesForCategory(categoryId);
      const hasOtherSelectedSubCategories = subCategories.some(
        (subCat) =>
          formData.productSubCategories?.includes(subCat._id) &&
          subCat._id !== subCategoryId
      );

      if (!hasOtherSelectedSubCategories) {
        onCheckboxChange("productCategory", categoryId, false);
      }
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryData?.categories?.map((category) => {
            const productCategories = Array.isArray(formData.productCategory)
              ? formData.productCategory
              : [];

            const isChecked = productCategories.includes(category._id);
            const subCategories = getSubCategoriesForCategory(category._id);
            const hasSubCategories = subCategories.length > 0;
            const isExpanded = expandedCategory[category._id];
            const categoryNames = getCategoryNameArray(category.name);

            return (
              <div
                key={category._id}
                className="relative category-item"
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
                      onCheckboxChange("productCategory", category._id, checked)
                    }
                    className={`h-4 w-4 transition-colors duration-200
                        ${isChecked ? "text-blue-600" : "text-gray-400"}
                        hover:text-blue-600`}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex-1">
                    {categoryNames.map((name, idx) => (
                      <Label
                        key={idx}
                        htmlFor={category._id}
                        className={`text-sm cursor-pointer font-medium block
                      ${isChecked ? "text-blue-700" : "text-gray-700"}
                      group-hover:text-blue-700 transition-colors duration-200`}
                      >
                        {name}
                      </Label>
                    ))}
                  </div>
                  {hasSubCategories && (
                    <ChevronRight
                      className={`h-4 w-4 transition-all duration-200
                      ${isChecked ? "text-blue-600" : "text-gray-400"}
                      group-hover:text-blue-600
                      ${isExpanded ? "rotate-90" : ""}`}
                    />
                  )}
                </div>

                {/* Sub-category Dropdown */}
                {isExpanded && hasSubCategories && (
                  <div className="absolute z-10 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 py-2">
                    <div className="max-h-[250px] overflow-y-auto flex flex-col gap-1">
                      {subCategories.map((subCategory) => {
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
                                id={subCategory._id}
                                checked={formData.productSubCategories?.includes(
                                  subCategory._id
                                )}
                                onCheckedChange={(checked) =>
                                  handleSubCategoryChange(
                                    category._id,
                                    subCategory._id,
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
                        });
                      })}
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
