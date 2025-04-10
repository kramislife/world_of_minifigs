import React from "react";
import { Filter } from "lucide-react";
import FilterAccordion from "@/components/product/FilterAccordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileFilters = ({
  isFilterOpen,
  setIsFilterOpen,
  filterOptions,
  openCategories,
  setOpenCategories,
  selectedFilters,
  onFilterChange,
  productData,
  sortedProducts,
}) => {
  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 hover:text-accent">
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[350px] bg-brand-start pt-12">
        <SheetHeader>
          <SheetTitle className="text-left text-white flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </SheetTitle>
        </SheetHeader>
        <div className="pt-2 overflow-y-auto scrollbar-none h-full">
          <FilterAccordion
            categories={filterOptions}
            openCategories={openCategories}
            onCategoriesChange={setOpenCategories}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            products={productData?.allProducts || []}
            groupedProducts={sortedProducts || []}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;
