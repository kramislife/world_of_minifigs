import React from "react";
import { useGetColorsQuery } from "@/redux/api/productApi";
import { Label } from "@/components/ui/label";
import { AlertCircle, Plus, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductColors = ({ formData, onCheckboxChange }) => {
  const { data: colorData, isLoading, error } = useGetColorsQuery();

  const handleColorChange = (colorId) => {
    // Clear previous colors and set the new one
    if (formData.productColors?.length > 0) {
      formData.productColors.forEach((oldColorId) => {
        onCheckboxChange("productColors", oldColorId, false);
      });
    }
    onCheckboxChange("productColors", colorId, true);
  };

  if (isLoading) return <div>Loading colors...</div>;

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-500 p-4 border rounded-lg">
        <AlertCircle size={20} />
        <p>Error loading colors. Please try again later.</p>
      </div>
    );
  }

  if (!colorData?.prod_color || colorData.prod_color.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-lg font-semibold">Product Color</Label>
        </div>
        <Link to="/admin/new-color">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg space-y-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <Plus size={24} className="text-gray-400" />
            <p className="text-gray-500 text-center">
              No colors available. Click to add colors.
            </p>
          </div>
        </Link>
      </div>
    );
  }

  // Handle both string ID and object ID cases
  const selectedColor =
    formData.productColors?.[0] || formData.product_color || "";

  // Find the selected color data
  const selectedColorData = colorData.prod_color.find(
    (color) => color._id === selectedColor || color._id === selectedColor?._id
  );

  //   console.log("Selected Color:", selectedColor); // Debug log
  //   console.log("Selected Color Data:", selectedColorData); // Debug log

  return (
    <div className="space-y-2">
      <Label
        htmlFor="productColor"
        className="flex items-center gap-2 text-lg font-semibold"
      >
        <Palette className="h-5 w-5 text-blue-600" />
        Color
      </Label>
      <Select
        value={selectedColorData?._id || ""}
        onValueChange={handleColorChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a color">
            {selectedColorData && (
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: selectedColorData.code }}
                />
                {selectedColorData.name}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {colorData.prod_color.map((color) => (
            <SelectItem
              key={color._id}
              value={color._id}
              className="flex items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: color.code }}
                />
                {color.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductColors;
