import React from "react";
import { useSearchParams } from "react-router-dom";
import ProductSection from "@/components/product/ProductSection";
import Metadata from "@/components/layout/Metadata/Metadata";
import ProductSort from "@/components/product/ProductSort";
import CustomPagination from "@/components/product/CustomPagination";
import ProductsSkeleton from "@/components/layout/skeleton/Products/ProductsSkeleton";
import MobileFilters from "@/components/product/shared/MobileFilters";
import DesktopFilters from "@/components/product/shared/DesktopFilter";
import { FallbackMessage } from "@/components/product/shared/FallbackStates";
import { useProductQueries } from "@/hooks/Product/useProductQueries";
import { useProductFilters } from "@/hooks/Product/useProductFilters";
import { useProductPagination } from "@/hooks/Product/useProductPagination";

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("keyword");

  // Get products data and filtering options
  const { productData, isProductLoading, filterData, groupedProducts } =
    useProductQueries();

  // Handle filters
  const {
    filterOptions,
    openCategories,
    selectedFilters,
    isFilterOpen,
    setOpenCategories,
    setIsFilterOpen,
    handleFilterChangeAndCloseSheet,
    filterProducts,
  } = useProductFilters(filterData);

  // Get filtered products
  const filteredGroupedProducts = filterProducts(
    groupedProducts,
    selectedFilters
  );

  // Handle pagination and sorting
  const {
    currentPage,
    currentSort,
    paginatedProducts,
    totalPages,
    sortedProducts,
    handlePageChange,
    handleSortChange,
  } = useProductPagination(filteredGroupedProducts);

  // Loading state
  if (isProductLoading) {
    return <ProductsSkeleton />;
  }

  // Display fallback message if no products are found
  if (!filteredGroupedProducts || filteredGroupedProducts.length === 0) {
    return (
      <FallbackMessage
        title={searchKeyword ? "No Search Results" : "No Products Found"}
        message={
          searchKeyword
            ? `We couldn't find any products matching "${searchKeyword}". Try checking for typos or using more general terms.`
            : "No products available for the selected filters. Please try different filter options."
        }
      />
    );
  }

  return (
    <>
      <Metadata
        title={searchKeyword ? `Search: ${searchKeyword}` : "Products"}
      />

      {/* Mobile Filter and Sort */}
      <div className="lg:hidden flex items-center justify-between p-5">
        <MobileFilters
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          filterOptions={filterOptions}
          openCategories={openCategories}
          setOpenCategories={setOpenCategories}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChangeAndCloseSheet}
          productData={productData}
          sortedProducts={filteredGroupedProducts}
        />
        <ProductSort
          totalProducts={sortedProducts?.length || 0}
          currentProducts={paginatedProducts?.length || 0}
          currentSort={currentSort}
          onSortChange={handleSortChange}
          hideProductCount={true}
          minimal={true}
        />
      </div>

      {/* Desktop Filter and Sort */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 p-5">
        <DesktopFilters
          filterOptions={filterOptions}
          openCategories={openCategories}
          setOpenCategories={setOpenCategories}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChangeAndCloseSheet}
          productData={productData}
          sortedProducts={filteredGroupedProducts}
        />
        <div className="col-span-1 lg:col-span-3">
          <div className="hidden lg:block">
            <ProductSort
              totalProducts={sortedProducts?.length || 0}
              currentProducts={paginatedProducts?.length || 0}
              currentSort={currentSort}
              onSortChange={handleSortChange}
            />
          </div>
          <ProductSection products={paginatedProducts} />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Products;
