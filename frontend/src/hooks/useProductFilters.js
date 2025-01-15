import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetSubCategoriesQuery,
  useGetSubCollectionsQuery,
} from "@/redux/api/productApi";

export const useProductFilters = (filterData = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCategories, setOpenCategories] = useState(["price"]);
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    product_category: [],
    product_sub_categories: [],
    product_collection: [],
    product_sub_collections: [],
    product_skill_level: [],
    product_designer: [],
    rating: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [currentCategory, setCurrentCategory] = useState(null);

  const {
    categoriesData = {},
    collectionsData = {},
    skillLevelsData = {},
    designersData = {},
    categoriesIsError = false,
    collectionsIsError = false,
    skillLevelsIsError = false,
    designerIsError = false,
    categoriesError = {},
    collectionsError = {},
    skillLevelsError = {},
    designersError = {},
  } = filterData;

  const { data: subCategoriesData, isLoading: isSubCategoriesLoading } =
    useGetSubCategoriesQuery();
  const { data: subCollectionsData, isLoading: isSubCollectionsLoading } =
    useGetSubCollectionsQuery();

  const filterOptions = {
    price: [
      { label: "$0-$100", value: "0-100" },
      { label: "$101-$500", value: "101-500" },
      { label: "$501-$1000", value: "501-1000" },
      { label: "$1000+", value: "1000+" },
    ],
    rating: [
      { label: "5 Stars", value: "5", stars: 5 },
      { label: "4 to 4.9 Stars", value: "4", stars: 4 },
      { label: "3 to 3.9 Stars", value: "3", stars: 3 },
      { label: "2 to 2.9 Stars", value: "2", stars: 2 },
      { label: "1 to 1.9 Stars", value: "1", stars: 1 },
    ],
    product_category:
      categoriesData?.categories?.map((category) => ({
        label: category.name,
        value: category._id,
      })) || [],
    product_collection:
      collectionsData?.collections?.map((collection) => ({
        label: collection.name,
        value: collection._id,
      })) || [],
    product_skill_level:
      skillLevelsData?.skillLevels?.map((level) => ({
        label: level.name,
        value: level._id,
      })) || [],
    product_designer:
      designersData?.designers?.map((designer) => ({
        label: designer.name,
        value: designer._id,
      })) || [],
  };

  useEffect(() => {
    setOpenCategories(Object.keys(filterOptions));
    setSelectedFilters(
      Object.keys(filterOptions).reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {})
    );
  }, []);

  useEffect(() => {
    if (categoriesIsError) {
      toast.error(
        categoriesError?.data?.message || "Failed to load categories."
      );
    }
    if (collectionsIsError) {
      toast.error(
        collectionsError?.data?.message || "Failed to load collections."
      );
    }
    if (skillLevelsIsError) {
      toast.error(
        skillLevelsError?.data?.message || "Failed to load skill levels."
      );
    }
    if (designerIsError) {
      toast.error(designersError?.data?.message || "Failed to load designers.");
    }
  }, [
    categoriesIsError,
    collectionsIsError,
    skillLevelsIsError,
    designerIsError,
  ]);

  // Initialize filters from URL parameters
  useEffect(() => {
    const initialFilters = {
      price: [],
      product_category: [],
      product_sub_categories: [],
      product_collection: [],
      product_sub_collections: [],
      product_skill_level: [],
      product_designer: [],
      rating: [],
    };

    searchParams.forEach((value, key) => {
      if (key in initialFilters) {
        initialFilters[key] = value.split(",").filter(Boolean);
      }
    });

    setSelectedFilters(initialFilters);
  }, [searchParams]);

  const handleFilterChange = (category, value) => {
    // Create new array based on previous filters
    const newFilters = { ...selectedFilters };

    // Initialize the category array if it doesn't exist
    if (!newFilters[category]) {
      newFilters[category] = [];
    }

    // Toggle the value
    if (newFilters[category].includes(value)) {
      newFilters[category] = newFilters[category].filter((v) => v !== value);
    } else {
      newFilters[category] = [...newFilters[category], value];
    }

    setSelectedFilters(newFilters);

    // Update URL params
    const newSearchParams = new URLSearchParams(searchParams);

    // If the filter array is empty, remove the parameter
    if (newFilters[category].length === 0) {
      newSearchParams.delete(category);
    } else {
      newSearchParams.set(category, newFilters[category].join(","));
    }

    // Reset to page 1 when filters change
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

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

  const getSubItems = (key, parentId) => {
    if (key === "product_category") {
      return (
        subCategoriesData?.sub_categories?.filter(
          (sub) => sub.category?._id === parentId
        ) || []
      );
    }
    if (key === "product_collection") {
      return (
        subCollectionsData?.subcollections?.filter(
          (sub) => sub.collection?._id === parentId
        ) || []
      );
    }
    return [];
  };

  const getSubItemCount = (products, subItem) => {
    return products.filter((product) => {
      if (subItem.category) {
        return product.product_sub_categories?.includes(subItem._id);
      } else if (subItem.collection) {
        return product.product_sub_collections?.includes(subItem._id);
      }
      return false;
    }).length;
  };

  const calculateFilterCounts = (categories, products) => {
    const counts = {};

    // Fix: Initialize all filter categories with empty counts
    Object.keys(categories).forEach((categoryKey) => {
      counts[categoryKey] = {};
      categories[categoryKey].forEach((option) => {
        counts[categoryKey][option.value] = 0;
      });
    });

    // Fix: Add handling for empty products array
    if (!products || products.length === 0) {
      return counts;
    }

    // Helper function to check if a product matches selected filters within the same category
    const matchesFiltersInCategory = (
      product,
      currentCategory,
      currentValue
    ) => {
      return Object.entries(selectedFilters).every(
        ([filterKey, filterValues]) => {
          // Skip if:
          // 1. It's the current category we're calculating for
          // 2. No filters are selected for this category
          // 3. It's a different category type (to maintain independent counts)
          if (
            filterKey === currentCategory ||
            filterValues.length === 0 ||
            !isSameFilterCategory(filterKey, currentCategory)
          ) {
            return true;
          }

          // Handle price range
          if (filterKey === "price") {
            return filterValues.some((range) => {
              const [min, max] = range.split("-").map(Number);
              const price = product.price;
              if (max === undefined) {
                return price >= min;
              }
              return price >= min && price <= max;
            });
          }

          // Handle ratings
          if (filterKey === "rating") {
            return filterValues.some((rating) => {
              const ratingNum = Number(rating);
              return Math.floor(product.rating) === ratingNum;
            });
          }

          // Handle categories and subcategories
          if (filterKey === "product_category") {
            return filterValues.some(
              (value) => product.product_category === value
            );
          }
          if (filterKey === "product_sub_categories") {
            return filterValues.some((value) =>
              product.product_sub_categories?.includes(value)
            );
          }

          // Handle collections and subcollections
          if (filterKey === "product_collection") {
            return filterValues.some(
              (value) => product.product_collection === value
            );
          }
          if (filterKey === "product_sub_collections") {
            return filterValues.some((value) =>
              product.product_sub_collections?.includes(value)
            );
          }

          return filterValues.some((value) => product[filterKey] === value);
        }
      );
    };

    // Helper function to determine if two filter keys belong to the same category
    const isSameFilterCategory = (filterKey1, filterKey2) => {
      const categoryGroups = {
        price: ["price"],
        rating: ["rating"],
        categories: ["product_category", "product_sub_categories"],
        collections: ["product_collection", "product_sub_collections"],
        skill_level: ["product_skill_level"],
        designer: ["product_designer"],
      };

      const getGroup = (key) => {
        return Object.entries(categoryGroups).find(([_, keys]) =>
          keys.includes(key)
        )?.[0];
      };

      return getGroup(filterKey1) === getGroup(filterKey2);
    };

    // Calculate counts for each category
    Object.keys(categories).forEach((categoryKey) => {
      categories[categoryKey].forEach((option) => {
        products.forEach((product) => {
          const matchesCurrentFilter =
            categoryKey === "price"
              ? matchesPriceRange(product, option.value)
              : categoryKey === "rating"
              ? matchesRating(product, option.value)
              : product[categoryKey] === option.value;

          if (
            matchesCurrentFilter &&
            matchesFiltersInCategory(product, categoryKey, option.value)
          ) {
            counts[categoryKey][option.value]++;
          }
        });
      });
    });

    return counts;
  };

  // Helper functions for specific filter types
  const matchesPriceRange = (product, range) => {
    const [min, max] = range.split("-").map(Number);
    if (max === undefined) {
      // Handle "1000+" case
      return product.price >= min;
    }
    return product.price >= min && product.price <= max;
  };

  const matchesRating = (product, rating) => {
    return Math.floor(product.rating) === Number(rating);
  };

  // Fix: Add proper cleanup for expandedItems state
  useEffect(() => {
    return () => {
      setExpandedItems({});
      setCurrentCategory(null);
    };
  }, []);

  return {
    filterOptions,
    openCategories,
    selectedFilters,
    isFilterOpen,
    setOpenCategories,
    setIsFilterOpen,
    handleFilterChange,
    expandedItems,
    currentCategory,
    setExpandedItems,
    setCurrentCategory,
    getDisplayName,
    getSubItems,
    getSubItemCount,
    calculateFilterCounts,
    subCategoriesData,
    subCollectionsData,
    isSubCategoriesLoading,
    isSubCollectionsLoading,
  };
};
