import React from "react";
import { Filter } from "lucide-react";
import FilterAccordion from "@/components/product/FilterAccordion";

const DesktopFilters = ({
  filterOptions,
  selectedFilters,
  onFilterChange,
  productData,
  sortedProducts,
}) => {
  return (
    <div className="hidden lg:block border border-brand-end rounded-md p-4 sticky top-24 h-[90vh]">
      <div className="flex items-center mb-4 gap-2">
        <Filter className="h-6 w-6" />
        <h2 className="text-xl font-bold">Filters</h2>
      </div>
      <div className="max-h-[75vh] overflow-y-auto pr-2">
        <FilterAccordion
          categories={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
          products={productData?.allProducts || []}
          groupedProducts={sortedProducts || []}
        />
      </div>
    </div>
  );
};

export default DesktopFilters;
