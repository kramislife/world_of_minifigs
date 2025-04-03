import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useProductFilters } from "@/hooks/Product/useProductFilters";

// Component for rendering a color filter option
const ColorFilterOption = ({ option, count }) => (
  <div className="flex items-center space-x-2">
    <div
      className="w-4 h-4 rounded-full border border-gray-600"
      style={{ backgroundColor: option.code }}
    />
    <span className="text-sm text-gray-300 group-hover:text-accent py-2">
      {option.label}
    </span>
  </div>
);

// Component for rendering a sub-item in the expanded category view
const SubItemOption = ({
  subItem,
  filterKey,
  isChecked,
  count,
  onFilterChange,
}) => (
  <label
    key={subItem._id}
    className={`flex items-center justify-between p-4 group cursor-pointer ${
      count === 0
        ? "opacity-50 pointer-events-none"
        : "hover:bg-brand-end/50 rounded-md"
    }`}
  >
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`${filterKey}-${subItem._id}`}
        checked={isChecked}
        onCheckedChange={() => onFilterChange(filterKey, subItem._id)}
        disabled={count === 0}
        className="border-brand-end data-[state=checked]:bg-accent data-[state=checked]:border-accent"
      />
      <span className="text-sm text-white group-hover:text-accent">
        {subItem.name}
      </span>
    </div>
    <span className="text-sm text-gray-400">({count})</span>
  </label>
);

// Component for rendering a category option in the main view
const CategoryOption = ({
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
    className={`flex items-center justify-between py-2 px-2 rounded-sm group
    ${isDisabled ? "opacity-50 pointer-events-none" : "hover:bg-brand-start"}`}
  >
    <div className="flex-1">
      <label className="flex items-center space-x-2 cursor-pointer">
        <Checkbox
          id={`${filterKey}-${option.value}`}
          checked={isChecked}
          onCheckedChange={() => onFilterChange(filterKey, option.value)}
          disabled={isDisabled}
          className="border-gray-200 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
        />
        {filterKey === "product_color" ? (
          <ColorFilterOption
            option={option}
            isChecked={isChecked}
            isDisabled={isDisabled}
            onChange={() => onFilterChange(filterKey, option.value)}
            count={itemCount}
          />
        ) : (
          <span className="text-sm text-white group-hover:text-accent py-2">
            {option.label}
          </span>
        )}
      </label>
    </div>
    <div className="flex items-center space-x-4">
      {!hasSubItems && (
        <span className="text-sm text-gray-200">({itemCount})</span>
      )}
      {hasSubItems && (
        <button
          onClick={() => onCategoryClick(filterKey, option.value)}
          className="p-1 hover:bg-accent rounded-full text-yellow-300 hover:text-black"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  </div>
);

// Component for rendering the expanded sub-category view
const SubCategoryView = ({
  categoryKey,
  categoryName,
  subItems,
  selectedFilters,
  productsForCounting,
  onFilterChange,
  onBackClick,
}) => (
  <div>
    <div className="px-2 pb-4 pt-2 border-b border-gray-700">
      <button
        onClick={onBackClick}
        className="flex items-center hover:text-accent"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        <span className="text-md font-semibold">{categoryName}</span>
      </button>
    </div>

    <div className="bg-brand-start p-2">
      {subItems.map((subItem) => {
        const filterKey =
          categoryKey === "product_category"
            ? "product_sub_categories"
            : "product_sub_collections";

        // Calculate count of products with this sub-item
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
          <SubItemOption
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
  </div>
);

// Main FilterAccordion component
const FilterAccordion = ({
  categories,
  selectedFilters,
  onFilterChange,
  products,
  groupedProducts,
  colors,
}) => {
  const {
    currentCategory,
    setCurrentCategory,
    getDisplayName,
    getSubItems,
    subCategoriesData,
    subCollectionsData,
  } = useProductFilters({
    categories,
    colorsData: colors,
  });

  // Use groupedProducts for counting when available, fallback to all products
  const productsForCounting =
    groupedProducts?.length > 0 ? groupedProducts : products;

  const handleCategoryClick = (key, categoryId) => {
    setCurrentCategory({ key, id: categoryId });
  };

  const handleBackClick = () => {
    setCurrentCategory(null);
  };

  // Calculate filtered products that match all filters EXCEPT the one being checked
  const getFilteredProductCount = (filterKey, filterValue) => {
    if (!productsForCounting || productsForCounting.length === 0) {
      return 0;
    }

    return productsForCounting.filter((product) => {
      // For this specific calculation, we want to count products that would match
      // if this filter option was selected (ignoring whether it's already selected)

      if (filterKey === "price") {
        const [min, max] = filterValue.split("-").map(Number);
        if (max) {
          return product.price >= min && product.price <= max;
        }
        return product.price >= min; // For "1000+" case
      }

      if (filterKey === "rating") {
        const ratingValue = parseInt(filterValue);
        return Math.floor(product.ratings) === ratingValue;
      }

      if (filterKey === "product_color") {
        return (
          product.product_color?._id === filterValue ||
          product.product_color === filterValue
        );
      }

      if (filterKey === "product_skill_level") {
        return product.product_skill_level?._id === filterValue;
      }

      if (filterKey === "product_designer") {
        return product.product_designer?._id === filterValue;
      }

      if (filterKey === "product_category") {
        return product.product_category?.some((cat) => cat._id === filterValue);
      }

      if (filterKey === "product_collection") {
        return product.product_collection?.some(
          (col) => col._id === filterValue
        );
      }

      return false;
    }).length;
  };

  // Render category content based on whether we're in a subcategory view or main view
  const renderCategoryContent = (key, category) => {
    // If a category is selected, show its sub-items
    if (currentCategory && currentCategory.key === key) {
      const currentCategoryName = category.find(
        (cat) => cat.value === currentCategory.id
      )?.label;

      const subItems = getSubItems(
        key,
        currentCategory.id,
        productsForCounting
      );

      return (
        <SubCategoryView
          categoryKey={key}
          categoryId={currentCategory.id}
          categoryName={currentCategoryName}
          subItems={subItems}
          selectedFilters={selectedFilters}
          productsForCounting={productsForCounting}
          onFilterChange={onFilterChange}
          onBackClick={handleBackClick}
        />
      );
    }

    // Otherwise show the main category list with checkboxes
    return (
      <AccordionContent className="p-3 bg-brand-end/50">
        {category.length > 0 ? (
          category.map((option) => {
            // Check if this category has sub-items
            const hasSubItems =
              (key === "product_category" &&
                subCategoriesData?.sub_categories?.some(
                  (sub) => sub.category?._id === option.value
                )) ||
              (key === "product_collection" &&
                subCollectionsData?.subcollections?.some(
                  (sub) => sub.collection?._id === option.value
                ));

            // Get correct count based on current filters
            const itemCount = getFilteredProductCount(key, option.value);
            const isDisabled = itemCount === 0;

            return (
              <CategoryOption
                key={option.value}
                option={option}
                filterKey={key}
                isChecked={selectedFilters[key]?.includes(option.value)}
                hasSubItems={hasSubItems}
                itemCount={itemCount}
                isDisabled={isDisabled}
                onFilterChange={onFilterChange}
                onCategoryClick={handleCategoryClick}
              />
            );
          })
        ) : (
          <div className="py-4 text-center">
            <span className="text-sm text-gray-500">
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
            className="border border-brand-end rounded-md my-2 bg-brand-start"
          >
            <AccordionTrigger className="px-4 py-3 transition-colors group hover:no-underline rounded-md">
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-white group-hover:text-accent">
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
