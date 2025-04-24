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
        !minimal && "mb-5"
      } ${className}`}
    >
      {!hideProductCount && (
        <p>
          Showing <span className="text-accent">{currentProducts}</span> of{" "}
          <span>{totalProducts}</span> products
        </p>
      )}
      <div className={`flex items-center ${!minimal && "gap-2"}`}>
        {!minimal && <span className="text-sm">Sort by:</span>}
        <Select value={currentSort} onValueChange={onSortChange}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
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
