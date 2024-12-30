import React, { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const getDisplayName = (key) => {
  const displayNames = {
    price: "Price Range",
    product_category: "Product Categories",
    product_collection: "Collections",
    product_skill_level: "Skill Level",
    product_designer: "Designers",
    rating: "Rating",
  };
  return displayNames[key] || key;
};

const FilterAccordion = ({
  categories,
  openCategories,
  onCategoriesChange,
  selectedFilters,
  onFilterChange,
  products,
}) => {
  const filterCounts = useMemo(() => {
    const counts = {};

    // Initialize counts
    Object.entries(categories).forEach(([categoryKey, category]) => {
      counts[categoryKey] = {};
      category.forEach((option) => {
        counts[categoryKey][option.value] = 0;
      });
    });

    // Count products for each filter option
    products.forEach((product) => {
      // Calculate discounted price using the same logic as ProductCard
      const discountedPrice =
        product?.price && product?.discount
          ? product.price - (product.price * product.discount) / 100
          : product?.price || 0;

      // Price ranges
      if (categories.price) {
        categories.price.forEach((range) => {
          const [min, maxStr] = range.value.split("-");
          const minPrice = Number(min);

          if (range.value === "1000+") {
            if (discountedPrice >= 1000) {
              counts.price[range.value]++;
            }
          } else {
            const maxPrice = Number(maxStr);
            if (discountedPrice >= minPrice && discountedPrice <= maxPrice) {
              counts.price[range.value]++;
            }
          }
        });
      }

      // Categories
      if (categories.product_category && product.product_category) {
        product.product_category.forEach((category) => {
          if (counts.product_category[category._id] !== undefined) {
            counts.product_category[category._id]++;
          }
        });
      }

      // Collections
      if (categories.product_collection && product.product_collection) {
        product.product_collection.forEach((collection) => {
          if (counts.product_collection[collection._id] !== undefined) {
            counts.product_collection[collection._id]++;
          }
        });
      }
      // Skill Level
      if (categories.product_skill_level && product.product_skill_level) {
        const skillLevelId =
          product.product_skill_level?._id ?? product.product_skill_level;
        if (
          skillLevelId &&
          counts.product_skill_level[skillLevelId] !== undefined
        ) {
          counts.product_skill_level[skillLevelId]++;
        }
      }

      // Designer
      if (categories.product_designer && product.product_designer) {
        const designerId =
          product.product_designer?._id ?? product.product_designer;
        if (designerId && counts.product_designer[designerId] !== undefined) {
          counts.product_designer[designerId]++;
        }
      }

      // Rating counts
      if (categories.rating) {
        categories.rating.forEach((ratingOption) => {
          const ratingValue = parseInt(ratingOption.value);
          // Count products with rating within the specific range
          if (ratingValue === 5) {
            // For 5 stars, count only products with rating >= 5
            if (product.ratings >= 5) {
              counts.rating[ratingOption.value]++;
            }
          } else {
            // For other ratings, count products within their range (e.g., 4.0-4.9)
            if (
              product.ratings >= ratingValue &&
              product.ratings < ratingValue + 1
            ) {
              counts.rating[ratingOption.value]++;
            }
          }
        });
      }
    });

    return counts;
  }, [categories, products]);

  const handleFilterClick = (key, value) => {
    const currentFilters = selectedFilters[key] || [];
    const isSelected = currentFilters.includes(value);

    // If the value is already selected, remove it
    // If not, add it to the array
    const newFilters = isSelected
      ? currentFilters.filter((item) => item !== value)
      : [...currentFilters, value];

    // Call onFilterChange with the new array
    onFilterChange(key, newFilters);
  };

  return (
    <Accordion
      type="single"
      defaultValue="price"
      value={openCategories[0]}
      onValueChange={(value) => onCategoriesChange(value ? [value] : [])}
      className="space-y-2"
    >
      {Object.entries(categories).map(([key, category]) => (
        <AccordionItem
          key={key}
          value={key}
          className="border border-gray-700 rounded-md my-2 bg-brand"
        >
          <AccordionTrigger className="px-4 py-3 transition-colors group hover:no-underline rounded-md">
            <span className="font-semibold text-white group-hover:text-red-400">
              {getDisplayName(key)}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3 bg-darkBrand rounded-b-md">
            {category.map((option) => {
              const count = filterCounts[key]?.[option.value] || 0;
              const isDisabled = count === 0;

              return (
                <label
                  key={option.value}
                  htmlFor={`${key}-${option.value}`}
                  className={`flex items-center justify-between py-2 px-2 rounded-md ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-brand group cursor-pointer"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${key}-${option.value}`}
                      checked={selectedFilters[key]?.includes(option.value)}
                      onCheckedChange={() =>
                        !isDisabled && handleFilterClick(key, option.value)
                      }
                      disabled={isDisabled}
                      className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 disabled:opacity-50"
                    />
                    <span
                      className={`text-sm ${
                        isDisabled
                          ? "text-gray-500"
                          : "text-gray-300 group-hover:text-red-400"
                      } py-2`}
                    >
                      {option.label}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">({count})</span>
                </label>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FilterAccordion;
