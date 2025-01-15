import React, { useRef } from "react";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterAccordion from "../FilterAccordion";
import useClickOutside from "@/hooks/Common/useClickOutside";

const MobileFilter = ({
  isOpen,
  onOpenChange,
  categories,
  openCategories,
  onCategoriesChange,
}) => {
  const sheetRef = useRef(null);

  useClickOutside(sheetRef, onOpenChange, isOpen);

  return (
    <div className="lg:hidden mb-4">
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <button className="flex items-center space-x-2 bg-brand px-4 py-2 rounded-lg">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </SheetTrigger>
        <SheetContent
          ref={sheetRef}
          side="left"
          className="w-[300px] bg-darkBrand border-gray-800"
        >
          <SheetHeader>
            <SheetTitle className="text-white text-left">Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6 overflow-y-auto scrollbar-none h-full">
            <FilterAccordion
              categories={categories}
              openCategories={openCategories}
              onCategoriesChange={onCategoriesChange}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilter;
