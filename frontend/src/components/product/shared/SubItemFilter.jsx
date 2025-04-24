import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const SubItemFilter = ({
  subItem,
  filterKey,
  isChecked,
  count,
  onFilterChange,
}) => (
  <Label
    key={subItem._id}
    className={`flex items-center justify-between p-4 cursor-pointer group
      ${
        count === 0 ? "opacity-50 pointer-events-none" : "hover:bg-brand-end/50"
      }`}
  >
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`${filterKey}-${subItem._id}`}
        checked={isChecked}
        onCheckedChange={() => onFilterChange(filterKey, subItem._id)}
        disabled={count === 0}
        className="border-background"
      />
      <span className="text-sm text-white group-hover:text-accent transition-colors">
        {subItem.name}
      </span>
    </div>
    <span className="text-sm text-gray-400 group-hover:text-accent transition-colors">
      ({count})
    </span>
  </Label>
);

export default SubItemFilter;
