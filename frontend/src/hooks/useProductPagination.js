import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sortProducts } from '@/hooks/productSort';

export const useProductPagination = (products, currentSort, itemsPerPage = 9) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const sortedProducts = useMemo(() => {
    return sortProducts(products || [], currentSort);
  }, [products, currentSort]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((sortedProducts?.length || 0) / itemsPerPage);

  return {
    currentPage,
    paginatedProducts,
    totalPages,
    sortedProducts,
  };
};
