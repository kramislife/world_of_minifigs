import React, { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useProductFilters } from "@/hooks/Product/useProductFilters";

const FilterAccordion = ({
  categories,
  openCategories,
  onCategoriesChange,
  selectedFilters,
  onFilterChange,
  products,
}) => {
  const {
    expandedItems,
    currentCategory,
    setExpandedItems,
    setCurrentCategory,
    getDisplayName,
    getSubItems,
    getSubItemCount,
    calculateFilterCounts,
  } = useProductFilters({ categories });

  const filterCounts = useMemo(
    () => calculateFilterCounts(categories, products),
    [categories, products]
  );

  const handleFilterClick = (key, value) => {
    onFilterChange(key, value);
  };

  const handleBackClick = () => {
    setCurrentCategory(null);
  };

  const handleCategoryClick = (key, categoryId) => {
    setCurrentCategory({ key, id: categoryId });
  };

  const renderCategoryContent = (key, category) => {
    if (currentCategory && currentCategory.key === key) {
      // Render sub-items view for the selected category
      return (
        <div>
          <div className="px-2 pb-4 pt-2 border-b border-gray-700">
            <button
              onClick={handleBackClick}
              className="flex items-center text-white hover:text-red-400"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span className="text-md font-semibold">
                {
                  category.find((cat) => cat.value === currentCategory.id)
                    ?.label
                }
              </span>
            </button>
          </div>

          <div className="bg-darkBrand p-2">
            {getSubItems(key, currentCategory.id).map((subItem) => {
              const subItemCount = getSubItemCount(products, subItem);
              const filterKey =
                key === "product_category"
                  ? "product_sub_categories"
                  : "product_sub_collections";

              return (
                <label
                  key={subItem._id}
                  className={`flex items-center justify-between p-4 group cursor-pointer ${
                    subItemCount === 0
                      ? "opacity-50 pointer-events-none"
                      : "hover:bg-brand/50 rounded-md"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${filterKey}-${subItem._id}`}
                      checked={selectedFilters[filterKey]?.includes(
                        subItem._id
                      )}
                      onCheckedChange={() =>
                        handleFilterClick(filterKey, subItem._id)
                      }
                      disabled={subItemCount === 0}
                      className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-red-400">
                      {subItem.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    ({subItemCount})
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      );
    }

    // Render normal category content
    return (
      <AccordionContent className="p-3 bg-darkBrand">
        {category.length > 0 ? (
          category.map((option) => {
            const hasSubItems =
              key === "product_category" || key === "product_collection";
            const subItems = hasSubItems ? getSubItems(key, option.value) : [];
            const subItemsTotal = subItems.reduce(
              (sum, subItem) => sum + getSubItemCount(products, subItem),
              0
            );
            const itemCount = hasSubItems
              ? subItemsTotal
              : filterCounts[key]?.[option.value] || 0;

            return (
              <div key={option.value} className="relative">
                <div
                  className={`flex items-center justify-between py-2 px-2 rounded-sm group
                    ${
                      itemCount === 0
                        ? "opacity-50 pointer-events-none"
                        : "hover:bg-brand"
                    }`}
                >
                  <div className="flex-1">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        id={`${key}-${option.value}`}
                        checked={selectedFilters[key]?.includes(option.value)}
                        onCheckedChange={() =>
                          handleFilterClick(key, option.value)
                        }
                        disabled={itemCount === 0}
                        className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-red-400 py-2">
                        {option.label}
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    {!hasSubItems && (
                      <span className="text-sm text-gray-400">
                        ({itemCount})
                      </span>
                    )}
                    {hasSubItems && itemCount > 0 && (
                      <button
                        onClick={() => handleCategoryClick(key, option.value)}
                        className="p-1 hover:bg-red-600 rounded-full text-gray-400 hover:text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-4 text-center">
            <span className="text-sm text-gray-500">
              <AlertCircle className="w-4 h-4 text-red-500" />
              No {getDisplayName(key).toLowerCase()} available
            </span>
          </div>
        )}
      </AccordionContent>
    );
  };

  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        defaultValue="price"
        collapsible
        className="space-y-2"
      >
        {Object.entries(categories).map(([key, category]) => (
          <AccordionItem
            key={key}
            value={key}
            className="border border-gray-700 rounded-md my-2 bg-brand"
          >
            <AccordionTrigger className="px-4 py-3 transition-colors group hover:no-underline rounded-md">
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-white group-hover:text-red-400">
                  {getDisplayName(key)}
                </span>
              </div>
            </AccordionTrigger>
            {renderCategoryContent(key, category)}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FilterAccordion;
