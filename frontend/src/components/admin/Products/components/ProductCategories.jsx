import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetCategoryQuery } from "@/redux/api/productApi";
import { toast } from "react-toastify";

const CATEGORY_COLORS = {
  0: "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300",
  1: "bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300",
  2: "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300",
};

const DEFAULT_COLOR =
  "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";

const ProductCategories = ({ formData, onCheckboxChange }) => {
  const { data, isError, error } = useGetCategoryQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  return (
    <section className="space-y-6">
      <Label className="text-lg font-semibold">Product Categories</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data?.categories.map((category) => {
          const isChecked = formData.productCategories.includes(category._id);
          return (
            <div
              key={category._id}
              className={`flex items-center space-x-3 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                isChecked ? CATEGORY_COLORS[0] : DEFAULT_COLOR
              }`}
            >
              <Checkbox
                id={category._id}
                name={category._id}
                checked={isChecked}
                onCheckedChange={(checked) =>
                  onCheckboxChange("productCategories", category._id, checked)
                }
                className="w-5 h-5 border-gray-300 rounded focus:ring focus:ring-opacity-50"
              />
              <Label
                htmlFor={category._id}
                className="text-sm font-medium cursor-pointer flex-1"
              >
                {category.name}
              </Label>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductCategories;
