import React, { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FilterAccordion from "@/components/product/FilterAccordion";
import ProductSection from "@/components/product/ProductSection";
import Metadata from "@/components/layout/Metadata/Metadata";
import ProductSort from "@/components/product/shared/ProductSort";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CustomPagination from "@/components/product/shared/CustomPagination";
import useScrollToTop from "@/hooks/Common/useScrollToTop";
import { useProductQueries } from "@/hooks/Product/useProductQueries";
import { useProductFilters } from "@/hooks/Product/useProductFilters";
import { useProductPagination } from "@/hooks/Product/useProductPagination";
import ProductsSkeleton from "@/components/layout/skeleton/Products/ProductsSkeleton";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentSort, setCurrentSort] = useState("date_desc");
  const scrollToTop = useScrollToTop();
  const navigate = useNavigate();

  // Fetch all product data
  const {
    productData,
    isProductLoading,
    productError,
    filterData,
    groupedProducts,
  } = useProductQueries(searchParams);

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

  // Handle pagination and sorting with grouped products
  const { currentPage, paginatedProducts, totalPages, sortedProducts } =
    useProductPagination(groupedProducts, currentSort);

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
    setCurrentSort(value);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
    scrollToTop();
  };

  // Add this new handler for image navigation
  const handleImageNavigation = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Loading state
  if (isProductLoading) {
    return <ProductsSkeleton />;
  }

  return (
    <>
      <Metadata title="Products" />
      <div className="mx-auto px-4 py-8 bg-brand-end/50">
        {/* Mobile Filter and Sort */}
        <div className="lg:hidden mb-4 flex items-center justify-between">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 bg-transparent">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[350px] bg-darkBrand border-gray-800"
            >
              <SheetHeader>
                <SheetTitle className=" text-left">
                  Filters
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 overflow-y-auto scrollbar-none h-full">
                <FilterAccordion
                  categories={filterOptions}
                  openCategories={openCategories}
                  onCategoriesChange={setOpenCategories}
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                  products={productData?.allProducts || []}
                />
              </div>
            </SheetContent>
          </Sheet>
          <ProductSort
            totalProducts={sortedProducts?.length || 0}
            currentProducts={paginatedProducts?.length || 0}
            currentSort={currentSort}
            onSortChange={handleSortChange}
            hideProductCount={true}
            minimal={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-2">
          {/* Desktop Filter */}
          <div className="hidden lg:block col-span-1 border border-brand-end rounded-md p-4 sticky top-24 h-[85vh]">
            <div className="flex items-center mb-4 space-x-2">
              <Filter className="h-6 w-6" />
              <h2 className="text-xl font-bold">Filters</h2>
            </div>
            <div className="max-h-[75vh] overflow-y-auto pr-2">
              <FilterAccordion
                categories={filterOptions}
                openCategories={openCategories}
                onCategoriesChange={setOpenCategories}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                products={productData?.allProducts || []}
              />
            </div>
          </div>

          {/* Products Grid with Sort */}
          <div className="col-span-1 lg:col-span-3">
            <div className="hidden lg:block">
              <ProductSort
                totalProducts={sortedProducts?.length || 0}
                currentProducts={paginatedProducts?.length || 0}
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
            </div>
            {paginatedProducts && paginatedProducts.length > 0 ? (
              <ProductSection
                products={paginatedProducts}
                onImageNavigation={handleImageNavigation}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <h3 className="text-3xl font-semibold text-gray-300 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-400 text-center py-2">
                  Try refreshing the page or check back later for new products.
                </p>
              </div>
            )}
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
