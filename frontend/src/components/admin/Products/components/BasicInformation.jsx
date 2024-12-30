import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Package, DollarSign, Percent, Box } from "lucide-react";
import ProductColors from "./ProductColors";

const BasicInformation = ({ formData, onChange, onCheckboxChange }) => {
  // Add handler for numeric inputs
  const handleNumericInput = (e) => {
    const { name, value } = e.target;
    // Prevent negative values and ensure proper decimal handling
    const sanitizedValue = value.startsWith("-") ? "" : value;

    // Call the parent onChange with the sanitized value
    onChange({
      target: {
        name,
        value: sanitizedValue,
      },
    });
  };

  return (
    <section className="space-y-6">
      {/* Product Name and Color */}
      <div className="grid grid-cols-3 gap-6">
        {/* Product Name */}
        <div className="col-span-2 space-y-2">
          <Label
            htmlFor="name"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package className="h-5 w-5 text-blue-600" />
            Product Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Enter product name"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
          />
        </div>

        {/* Product Color */}
        <div className="space-y-2">
          <ProductColors
            formData={formData}
            onCheckboxChange={onCheckboxChange}
          />
        </div>
      </div>

      {/* Product Price, Discount, and Stock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Price */}
        <div className="space-y-2">
          <Label
            htmlFor="price"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <DollarSign className="h-5 w-5 text-green-600" />
            Price
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleNumericInput}
            placeholder="0.00"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
            onWheel={(e) => e.target.blur()}
          />
        </div>

        {/* Discount */}
        <div className="space-y-2">
          <Label
            htmlFor="discount"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Percent className="h-5 w-5 text-orange-600" />
            Discount
          </Label>
          <Input
            id="discount"
            name="discount"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={formData.discount}
            onChange={handleNumericInput}
            placeholder="0.00"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
            onWheel={(e) => e.target.blur()}
          />
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <Label
            htmlFor="stock"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Box className="h-5 w-5 text-purple-600" />
            Stock
          </Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formData.stock}
            onChange={handleNumericInput}
            placeholder="0"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
            onWheel={(e) => e.target.blur()}
          />
        </div>
      </div>
    </section>
  );
};

export default BasicInformation;
