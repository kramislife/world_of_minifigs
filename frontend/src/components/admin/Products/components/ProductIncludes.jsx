import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const INCLUDES = ['Brick Guide and Instructions', 'Minifigures'];

const INCLUDES_COLORS = {
  Instructions: 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300',
  Minifigures: 'bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300',
};

const DEFAULT_COLOR = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';

const ProductIncludes = ({ formData, onCheckboxChange }) => {
  return (
    <section className="space-y-6">
      <Label className="text-lg font-semibold">Product Includes</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {INCLUDES.map((item) => {
          const isChecked = formData.productIncludes.includes(item);
          return (
            <div
              key={item}
              className={`flex items-center space-x-3 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                isChecked ? (INCLUDES_COLORS[item] || DEFAULT_COLOR) : DEFAULT_COLOR
              }`}
            >
              <Checkbox
                id={item}
                checked={isChecked}
                onCheckedChange={(checked) =>
                  onCheckboxChange('productIncludes', item, checked)
                }
                className="w-5 h-5 border-gray-300 rounded focus:ring focus:ring-opacity-50"
              />
              <Label
                htmlFor={item}
                className="text-sm font-medium cursor-pointer flex-1"
              >
                {item}
              </Label>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductIncludes;
