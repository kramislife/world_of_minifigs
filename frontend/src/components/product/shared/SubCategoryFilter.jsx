import React from "react";
import { Button } from "@/components/ui/button";
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
    <div className="pb-2 px-2 border-b border-brand-end/50">
      <Button
        variant="ghost"
        onClick={onBackClick}
        className="p-0 gap-0 text-background hover:bg-transparent hover:text-accent"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        <span className="text-md font-semibold">{categoryName}</span>
      </Button>
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
