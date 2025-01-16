import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetSubCategoriesQuery,
  useGetSubCollectionsQuery,
  useGetColorsQuery,
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
    product_color: [],
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
  const { data: colorsData, isLoading: isColorsLoading } = useGetColorsQuery();

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
    product_color: (colorsData?.prod_color || []).map((color) => ({
      label: color.name,
      value: color._id,
      code: color.code,
      count: (filterData.products || []).filter(
        (product) =>
          product.product_color?._id === color._id ||
          product.product_color === color._id
      ).length,
    })),
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
      product_color: [],
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
      product_category: "Categories",
      product_collection: "Collections",
      product_color: "Colors",
      product_skill_level: "Skill Levels",
      product_designer: "Designers",
      rating: "Rating",
    };
    return displayNames[key] || key;
  };

  const getSubItemCount = (products = [], subItem) => {
    if (!Array.isArray(products)) return 0;

    return products.filter((product) => {
      if (subItem.category) {
        return product.product_sub_categories?.includes(subItem._id);
      } else if (subItem.collection) {
        return product.product_sub_collections?.includes(subItem._id);
      }
      return false;
    }).length;
  };

  const getSubItems = (key, parentId, products = []) => {
    let items = [];
    if (key === "product_category") {
      items =
        subCategoriesData?.sub_categories?.filter(
          (sub) => sub.category?._id === parentId
        ) || [];
    } else if (key === "product_collection") {
      items =
        subCollectionsData?.subcollections?.filter(
          (sub) => sub.collection?._id === parentId
        ) || [];
    }

    // Add count and sort by count in descending order
    return items
      .map((subItem) => ({
        ...subItem,
        count: getSubItemCount(products, subItem),
      }))
      .sort((a, b) => b.count - a.count);
  };

  const matchesFiltersInCategory = (product, currentCategory) => {
    // Check all other active filters except the current category
    return Object.entries(selectedFilters).every(([category, values]) => {
      // Skip if it's the current category or if no values are selected
      if (category === currentCategory || values.length === 0) {
        return true;
      }

      // Handle price range
      if (category === "price") {
        return values.some((range) => matchesPriceRange(product, range));
      }

      // Handle rating
      if (category === "rating") {
        return values.some((rating) => matchesRating(product, rating));
      }

      // Handle color
      if (category === "product_color") {
        return values.some(
          (colorId) =>
            product.product_color?._id === colorId ||
            product.product_color === colorId
        );
      }

      // Handle other categories
      return values.includes(product[category]);
    });
  };

  const calculateFilterCounts = (categories, products) => {
    const counts = {};

    // Initialize counts
    Object.keys(categories).forEach((categoryKey) => {
      counts[categoryKey] = {};
      categories[categoryKey].forEach((option) => {
        counts[categoryKey][option.value] = 0;
      });
    });

    // If no products, return empty counts
    if (!products || products.length === 0) {
      return counts;
    }

    // Calculate counts for each category
    Object.keys(categories).forEach((categoryKey) => {
      categories[categoryKey].forEach((option) => {
        let count;

        if (option.key === "latest" || option.key === "best_seller") {
          // For special categories (latest and best_seller), count products directly
          count = products.filter(
            (product) => product.product_category?.key === option.key
          ).length;
        } else {
          // For regular categories, use the existing counting logic
          count = products.filter((product) => {
            const matchesCurrentFilter =
              categoryKey === "product_color"
                ? product.product_color?._id === option.value ||
                  product.product_color === option.value
                : categoryKey === "price"
                ? matchesPriceRange(product, option.value)
                : categoryKey === "rating"
                ? matchesRating(product, option.value)
                : product[categoryKey] === option.value;

            return (
              matchesCurrentFilter &&
              matchesFiltersInCategory(product, categoryKey)
            );
          }).length;
        }

        counts[categoryKey][option.value] = count;
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
    isColorsLoading,
  };
};
