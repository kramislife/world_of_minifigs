import React from "react";
import { ChevronLeft } from "lucide-react";
import SubItemFilter from "./SubItemFilter";

const SubCategoryFilter = ({
  categoryKey,
  categoryName,
  subItems,
  selectedFilters,
  productsForCounting,
  onFilterChange,
  onBackClick,
}) => (
  <div>
    <div className="px-2 pb-4 pt-2 border-b border-brand-end/50">
      <button
        onClick={onBackClick}
        className="flex items-center text-background hover:text-accent"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        <span className="text-md font-semibold">{categoryName}</span>
      </button>
    </div>

    {subItems.map((subItem) => {
      const filterKey =
        categoryKey === "product_category"
          ? "product_sub_categories"
          : "product_sub_collections";

      const count =
        productsForCounting?.filter((product) => {
          if (categoryKey === "product_category") {
            return product.product_sub_categories?.some(
              (sub) => sub._id === subItem._id
            );
          } else {
            return product.product_sub_collections?.some(
              (sub) => sub._id === subItem._id
            );
          }
        }).length || 0;

      return (
        <SubItemFilter
          key={subItem._id}
          subItem={subItem}
          filterKey={filterKey}
          isChecked={selectedFilters[filterKey]?.includes(subItem._id)}
          count={count}
          onFilterChange={onFilterChange}
        />
      );
    })}
  </div>
);

export default SubCategoryFilter;
