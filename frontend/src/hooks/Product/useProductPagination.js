import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { sortProducts } from "@/hooks/Product/productSort";
import useScrollToTop from "@/hooks/Common/useScrollToTop";

export const useProductPagination = (products, itemsPerPage = 12) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSort = searchParams.get("sort") || "date_desc";
  const scrollToTop = useScrollToTop();

  // Sort products based on URL parameter
  const sortedProducts = useMemo(() => {
    return sortProducts(products || [], currentSort);
  }, [products, currentSort]);

  // Get current page of products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((sortedProducts?.length || 0) / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    setSearchParams(newSearchParams);
    scrollToTop();
  };

  // Handle sort change
  const handleSortChange = (value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", value);
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
    scrollToTop();
  };

  return {
    currentPage,
    currentSort,
    paginatedProducts,
    totalPages,
    sortedProducts,
    handlePageChange,
    handleSortChange,
  };
};
