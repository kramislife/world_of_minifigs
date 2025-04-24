import React from "react";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import FilterAccordion from "@/components/product/FilterAccordion";

const MobileFilters = ({
  isFilterOpen,
  setIsFilterOpen,
  filterOptions,
  selectedFilters,
  onFilterChange,
  productData,
  sortedProducts,
}) => {
  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-inherit hover:text-accent text-lg"
        >
          <Filter className="h-8 w-8" />
          <span>Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent rounded-lg">
              <Filter size={20}/>
            </div>
            <SheetTitle className="m-0 sticky top-0 z-50">
              Product Filters
            </SheetTitle>
          </div>
          <SheetDescription className="sr-only">
            Filter your products by various categories, collections, and
            attributes.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <FilterAccordion
              categories={filterOptions}
              selectedFilters={selectedFilters}
              onFilterChange={onFilterChange}
              products={productData?.allProducts || []}
              groupedProducts={sortedProducts || []}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;
