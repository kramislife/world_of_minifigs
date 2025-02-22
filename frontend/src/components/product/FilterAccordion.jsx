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
  selectedFilters,
  onFilterChange,
  products,
  colors,
}) => {
  const {
    currentCategory,
    setCurrentCategory,
    getDisplayName,
    getSubItems,
    calculateFilterCounts,
    subCategoriesData,
    subCollectionsData,
  } = useProductFilters({
    categories,
    colorsData: colors,
  });

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
      // Get pre-sorted sub-items
      const subItems = getSubItems(key, currentCategory.id, products);

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
            {subItems.map((subItem) => {
              const filterKey =
                key === "product_category"
                  ? "product_sub_categories"
                  : "product_sub_collections";

              // Calculate count based on products that have this sub-item
              const count =
                products?.filter((product) => {
                  if (key === "product_category") {
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
                <label
                  key={subItem._id}
                  className={`flex items-center justify-between p-4 group cursor-pointer ${
                    count === 0
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
                      disabled={count === 0}
                      className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-red-400">
                      {subItem.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">({count})</span>
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
              (key === "product_category" &&
                subCategoriesData?.sub_categories?.some(
                  (sub) => sub.category?._id === option.value
                )) ||
              (key === "product_collection" &&
                subCollectionsData?.subcollections?.some(
                  (sub) => sub.collection?._id === option.value
                ));

            // Calculate item count based on filter type
            let itemCount;
            if (key !== "product_category" && key !== "product_collection") {
              // For non-category/collection filters
              itemCount =
                products?.filter((product) => {
                  if (key === "price") {
                    const [min, max] = option.value.split("-").map(Number);
                    if (max) {
                      return product.price >= min && product.price <= max;
                    }
                    return product.price >= min; // For "1000+" case
                  }
                  if (key === "rating") {
                    const ratingValue = parseInt(option.value);
                    return Math.floor(product.ratings) === ratingValue;
                  }
                  if (key === "product_color") {
                    return (
                      product.product_color?._id === option.value ||
                      product.product_color === option.value
                    );
                  }
                  if (key === "product_skill_level") {
                    return product.product_skill_level?._id === option.value;
                  }
                  if (key === "product_designer") {
                    return product.product_designer?._id === option.value;
                  }
                  return product[key] === option.value;
                }).length || 0;
            } else if (!hasSubItems) {
              // For categories/collections without sub-items
              itemCount =
                products?.filter((product) => {
                  if (key === "product_category") {
                    return product.product_category?.some(
                      (cat) => cat._id === option.value
                    );
                  }
                  if (key === "product_collection") {
                    return product.product_collection?.some(
                      (col) => col._id === option.value
                    );
                  }
                  return false;
                }).length || 0;
            }

            return (
              <div key={option.value} className="relative">
                <div
                  className={`flex items-center justify-between py-2 px-2 rounded-sm group
                    ${
                      ((!hasSubItems && key === "product_category") ||
                        (!hasSubItems && key === "product_collection") ||
                        (key !== "product_category" &&
                          key !== "product_collection")) &&
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
                        disabled={
                          ((!hasSubItems && key === "product_category") ||
                            (!hasSubItems && key === "product_collection") ||
                            (key !== "product_category" &&
                              key !== "product_collection")) &&
                          itemCount === 0
                        }
                        className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                      {key === "product_color" ? (
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-600"
                            style={{ backgroundColor: option.code }}
                          />
                          <span className="text-sm text-gray-300 group-hover:text-red-400 py-2">
                            {option.label}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-300 group-hover:text-red-400 py-2">
                          {option.label}
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    {((key !== "product_category" &&
                      key !== "product_collection") ||
                      (!hasSubItems &&
                        (key === "product_category" ||
                          key === "product_collection"))) && (
                      <span className="text-sm text-gray-400">
                        ({itemCount})
                      </span>
                    )}
                    {hasSubItems &&
                      (key === "product_category" ||
                        key === "product_collection") && (
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
            <span className="text-sm text-gray-500 ">
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
