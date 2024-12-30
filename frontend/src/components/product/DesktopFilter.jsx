import React from "react";
import { Filter } from "lucide-react";
import FilterAccordion from "./FilterAccordion";

const DesktopFilter = ({ categories, openCategories, onCategoriesChange }) => {
  return (
    <div className="hidden lg:block col-span-1 border border-gray-600 rounded-xl shadow-lg p-4 sticky top-24 h-[85vh]">
      <div className="flex items-center mb-4 space-x-2">
        <Filter className="h-6 w-6 text-white" />
        <h2 className="text-xl font-bold text-white">Filters</h2>
      </div>
      
      <div className="max-h-[75vh] overflow-y-auto pr-2">
        <FilterAccordion 
          categories={categories}
          openCategories={openCategories}
          onCategoriesChange={onCategoriesChange}
        />
      </div>
    </div>
  );
};

export default DesktopFilter;