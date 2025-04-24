import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const INCLUDES = ["Brick Guide and Instructions", "Minifigures"];

const INCLUDES_COLORS = {
  Instructions: "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300",
  Minifigures:
    "bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300",
};

const DEFAULT_COLOR =
  "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";

const ProductIncludes = ({ formData, onCheckboxChange }) => {
  // Test empty state
  // const testIncludes = [];

  if (!INCLUDES || INCLUDES.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-lg font-semibold">Product Includes</Label>
        </div>
        <Link to="/admin/new-includes">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg space-y-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <Plus size={24} className="text-gray-400" />
            <p className="text-gray-500 text-center">
              No includes available. Click to add includes.
            </p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <Card className="w-full shadow-none border-none bg-transparent">
      <CardContent className="p-0">
        <Label className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          Product Includes
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INCLUDES.map((item) => {
            const isChecked = formData.productIncludes.includes(item);
            return (
              <div
                key={item}
                className={`flex items-center space-x-3 p-4 rounded-lg border hover:shadow-sm transition-shadow ${
                  isChecked
                    ? INCLUDES_COLORS[item] || DEFAULT_COLOR
                    : DEFAULT_COLOR
                }`}
              >
                <Checkbox
                  id={item}
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    onCheckboxChange("productIncludes", item, checked)
                  }
                  className="border-black data-[state=checked]:bg-accent data-[state=checked]:border-accent"
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
      </CardContent>
    </Card>
  );
};

export default ProductIncludes;
