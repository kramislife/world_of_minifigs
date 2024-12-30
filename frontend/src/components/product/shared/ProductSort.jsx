import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductSort = ({
  totalProducts,
  currentProducts,
  currentSort,
  onSortChange,
  className,
  hideProductCount = false,
  minimal = false,
}) => {
  const sortOptions = [
    { value: "name_asc", label: "Name: A to Z" },
    { value: "name_desc", label: "Name: Z to A" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "date_asc", label: "Date: Oldest to Newest" },
    { value: "date_desc", label: "Date: Newest to Oldest" },
  ];

  return (
    <div
      className={`flex items-center justify-between ${
        !minimal && "mb-4"
      } ${className}`}
    >
      {!hideProductCount && (
        <div className="text-md text-gray-400">
          Showing <span className="text-white">{currentProducts}</span> of{" "}
          <span className="text-white">{totalProducts}</span> products
        </div>
      )}
      <div className={`flex items-center ${!minimal && "gap-2"}`}>
        {!minimal && <span className="text-sm">Sort by:</span>}
        <Select value={currentSort} onValueChange={onSortChange}>
          <SelectTrigger className="w-[220px] bg-darkBrand border-gray-700 text-gray-300">
            <SelectValue placeholder="Select sorting" />
          </SelectTrigger>
          <SelectContent className="bg-darkBrand border-gray-700">
            {sortOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductSort;
