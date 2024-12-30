import React from "react";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";

const IN_STOCK_COLOR = "bg-green-500 text-white";
const OUT_OF_STOCK_COLOR = "bg-red-500 text-white";
const PRE_ORDER_COLOR = "bg-blue-500 text-white";
const DEFAULT_COLOR =
  "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";

const ProductStatus = ({ formData, onChange, onDateChange }) => {
  return (
    <div className="space-y-6">
      {/* Product Status Section */}
      <section>
        <Label className="text-lg font-semibold">Product Status</Label>
        <div className="grid grid-cols-3 gap-4">
          {/* In Stock Option */}
          <label
            htmlFor="inStock"
            className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              formData.status === "In Stock" ? IN_STOCK_COLOR : DEFAULT_COLOR
            }`}
          >
            <input
              type="radio"
              id="inStock"
              name="status"
              value="In Stock"
              checked={formData.status === "In Stock"}
              onChange={onChange}
              className="hidden"
            />
            <span className="text-sm font-medium">In Stock</span>
          </label>

          {/* Out of Stock Option */}
          <label
            htmlFor="outOfStock"
            className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              formData.status === "Out of Stock"
                ? OUT_OF_STOCK_COLOR
                : DEFAULT_COLOR
            }`}
          >
            <input
              type="radio"
              id="outOfStock"
              name="status"
              value="Out of Stock"
              checked={formData.status === "Out of Stock"}
              onChange={onChange}
              className="hidden"
            />
            <span className="text-sm font-medium">Out of Stock</span>
          </label>

          {/* Pre-order Option */}
          <label
            htmlFor="preOrder"
            className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              formData.status === "Pre-order" ? PRE_ORDER_COLOR : DEFAULT_COLOR
            }`}
          >
            <input
              type="radio"
              id="preOrder"
              name="status"
              value="Pre-order"
              checked={formData.status === "Pre-order"}
              onChange={onChange}
              className="hidden"
            />
            <span className="text-sm font-medium">Pre-order</span>
          </label>
        </div>
      </section>

      {/* Pre-order Availability Date Section */}
      {formData.status === "Pre-order" && (
        <section className="space-y-4">
          <Label className="text-lg font-semibold px-3">
            Pre-order Availability Date
          </Label>
          <DatePicker
            selected={formData.preorderDate}
            onChange={(date) => onDateChange("preorderDate", date)} // <-- Ensure this calls onDateChange correctly
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
            className="border rounded-lg p-2 w-full focus:outline-none"
            placeholderText="Select a date"
            showPopperArrow={false}
          />
        </section>
      )}
    </div>
  );
};

export default ProductStatus;
