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

  const productFields = [
    {
      id: "name",
      label: "Product Name",
      icon: <Package className="h-5 w-5 text-blue-600" />,
      colSpan: "col-span-2",
      type: "text",
      placeholder: "Enter product name",
      onChange: onChange,
    },
  ];

  const identifierFields = [
    {
      id: "itemID",
      label: "Item ID",
      type: "text",
      placeholder: "Enter Item ID",
      onChange: onChange,
    },
    {
      id: "partID",
      label: "Part ID",
      type: "text",
      placeholder: "Enter Part ID",
      onChange: onChange,
    },
  ];

  const numericFields = [
    {
      id: "price",
      label: "Price",
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      type: "number",
      min: "0",
      step: "0.01",
      placeholder: "0.00",
      onChange: handleNumericInput,
    },
    {
      id: "discount",
      label: "Discount",
      icon: <Percent className="h-5 w-5 text-orange-600" />,
      type: "number",
      min: "0",
      max: "100",
      step: "0.01",
      placeholder: "0.00",
      onChange: handleNumericInput,
    },
    {
      id: "stock",
      label: "Stock",
      icon: <Box className="h-5 w-5 text-purple-600" />,
      type: "number",
      min: "0",
      step: "1",
      placeholder: "0",
      onChange: handleNumericInput,
    },
  ];

  const renderField = (field) => (
    <div key={field.id} className={`space-y-2 ${field.colSpan || ""}`}>
      <Label
        htmlFor={field.id}
        className="flex items-center gap-2 text-lg font-semibold"
      >
        {field.icon}
        {field.label}
      </Label>
      <Input
        id={field.id}
        name={field.id}
        type={field.type}
        value={formData[field.id]}
        onChange={field.onChange}
        placeholder={field.placeholder}
        min={field.min}
        max={field.max}
        step={field.step}
        onWheel={field.type === "number" ? (e) => e.target.blur() : undefined}
      />
    </div>
  );

  return (
    <section className="space-y-5">
      {/* Product Name and Color */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
        {productFields.map(renderField)}
        <div className="pt-5 md:pt-0">
          <ProductColors
            formData={formData}
            onCheckboxChange={onCheckboxChange}
          />
        </div>
      </div>

      {/* Item ID and Part ID */}
      <div className="grid grid-cols-2 gap-6">
        {identifierFields.map(renderField)}
      </div>

      {/* Product Price, Discount, and Stock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {numericFields.map(renderField)}
      </div>
    </section>
  );
};

export default BasicInformation;
