import React from "react";
import { useNavigate } from "react-router-dom";
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
    handleFilterChange,
  } = useProductFilters(filterData);

  // Create a wrapper for filter change that closes the sheet
  const handleFilterChangeAndCloseSheet = (key, value) => {
    handleFilterChange(key, value);
    setIsFilterOpen(false);
  };

  // Handle pagination and sorting
  const {
    currentPage,
    currentSort,
    paginatedProducts,
    totalPages,
    sortedProducts,
    handlePageChange,
    handleSortChange,
  } = useProductPagination(groupedProducts);

  // Loading state
  if (isProductLoading) {
    return <ProductsSkeleton />;
  }

  // Display fallback message if no products are found
  if (!sortedProducts || sortedProducts.length === 0) {
    return (
      <FallbackMessage
        title="No Products Found"
        message="Try adjusting your filters or check back later for new products."
      />
    );
  }

  return (
    <>
      <Metadata title="Products" />
      <div className="mx-auto px-4 py-8 bg-brand-start">
        {/* Mobile Filter and Sort */}
        <div className="lg:hidden mb-4 flex items-center justify-between">
          <MobileFilters
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            filterOptions={filterOptions}
            openCategories={openCategories}
            setOpenCategories={setOpenCategories}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChangeAndCloseSheet}
            productData={productData}
            sortedProducts={sortedProducts}
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-2">
          <DesktopFilters
            filterOptions={filterOptions}
            openCategories={openCategories}
            setOpenCategories={setOpenCategories}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChangeAndCloseSheet}
            productData={productData}
            sortedProducts={sortedProducts}
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
            <ProductSection
              products={paginatedProducts}
            />
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
      </div>
    </>
  );
};

export default Products;
