import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CategoryFilter from "./shared/CategoryFilter";
import SubCategoryFilter from "./shared/SubCategoryFilter";
import { useProductFilters } from "@/hooks/Product/useProductFilters";

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
    getFilteredProductCount,
    subCategoriesData,
    subCollectionsData,
  } = useProductFilters({
    categories,
    colorsData: colors,
    products: groupedProducts?.length > 0 ? groupedProducts : products,
    selectedFilters,
  });

  const handleCategoryClick = (key, categoryId) => {
    setCurrentCategory({ key, id: categoryId });
  };

  const handleBackClick = () => {
    setCurrentCategory(null);
  };

  const renderCategoryContent = (key, category) => {
    const productsToCount =
      groupedProducts?.length > 0 ? groupedProducts : products;

    if (currentCategory && currentCategory.key === key) {
      const currentCategoryName = category.find(
        (cat) => cat.value === currentCategory.id
      )?.label;

      const subItems = getSubItems(key, currentCategory.id);

      return (
        <SubCategoryFilter
          categoryKey={key}
          categoryName={currentCategoryName}
          subItems={subItems}
          selectedFilters={selectedFilters}
          productsForCounting={productsToCount}
          onFilterChange={onFilterChange}
          onBackClick={handleBackClick}
        />
      );
    }

    return (
      <AccordionContent className="p-0 bg-brand-start border-t border-brand-end">
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

            const itemCount = getFilteredProductCount(
              key,
              option.value,
              productsToCount
            );
            const isDisabled = itemCount === 0;

            return (
              <CategoryFilter
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
            <span className="text-sm text-gray-300">
              No {getDisplayName(key).toLowerCase()} available
            </span>
          </div>
        )}
      </AccordionContent>
    );
  };

  return (
    <Accordion type="single" defaultValue="price" collapsible>
      {Object.entries(categories).map(([key, category]) => (
        <AccordionItem
          key={key}
          value={key}
          className="border border-brand-end rounded-md bg-brand-start"
        >
          <AccordionTrigger className="text-base font-semibold text-background [&>svg]:text-background">
            {getDisplayName(key)}
          </AccordionTrigger>
          {renderCategoryContent(key, category)}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FilterAccordion;
