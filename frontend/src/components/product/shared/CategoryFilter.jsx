import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import ColorFilter from "./ColorFilter";

const CategoryFilter = ({
  option,
  filterKey,
  isChecked,
  hasSubItems,
  itemCount,
  isDisabled,
  onFilterChange,
  onCategoryClick,
}) => (
  <div
    className={`flex items-center justify-between p-4 group
    ${isDisabled ? "opacity-50 pointer-events-none" : "hover:bg-brand-end/50"}`}
  >
    <div className="flex-1">
      <Label className="flex items-center gap-2 cursor-pointer">
        <Checkbox
          id={`${filterKey}-${option.value}`}
          checked={isChecked}
          onCheckedChange={() => onFilterChange(filterKey, option.value)}
          disabled={isDisabled}
          className="border-background"
        />
        {filterKey === "product_color" ? (
          <ColorFilter option={option} />
        ) : (
          <span className="text-sm text-background group-hover:text-accent transition-colors">
            {option.label}
          </span>
        )}
      </Label>
    </div>
    <div className="flex items-center space-x-4">
      {!hasSubItems && (
        <span className="text-sm text-background group-hover:text-accent transition-colors">
          ({itemCount})
        </span>
      )}
      {hasSubItems && (
        <button
          onClick={() => onCategoryClick(filterKey, option.value)}
          className="p-1 hover:bg-accent rounded-full text-gray-400 hover:text-foreground transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  </div>
);

export default CategoryFilter;
