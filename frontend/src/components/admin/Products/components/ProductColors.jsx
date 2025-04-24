import React from "react";
import { useGetColorsQuery } from "@/redux/api/productApi";
import { Label } from "@/components/ui/label";
import { AlertCircle, Palette, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductColors = ({ formData, onCheckboxChange }) => {
  const { data: colorData, error, isLoading } = useGetColorsQuery();

  const handleColorChange = (colorId) => {
    // Clear previous colors and set the new one
    if (formData.productColors?.length > 0) {
      formData.productColors.forEach((oldColorId) => {
        onCheckboxChange("productColors", oldColorId, false);
      });
    }
    onCheckboxChange("productColors", colorId, true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-accent p-4 border rounded-lg">
        <Loader2 className="h-4 w-4 animate-spin" />
        <p>Loading colors...</p>
      </div>
    );
  }

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
      <div className="flex items-center gap-2 text-yellow-500 p-4 border rounded-lg">
        <AlertCircle size={20} />
        <p>No colors available.</p>
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
        <SelectTrigger className="w-full py-6 bg-transparent border">
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
        <SelectContent className="bg-background">
          {colorData.prod_color.map((color) => (
            <SelectItem
              key={color._id}
              value={color._id}
              className="flex items-center gap-2 text-foreground"
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
