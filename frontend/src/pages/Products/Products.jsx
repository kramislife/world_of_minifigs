import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import CustomPagination from "@/components/product/shared/CustomPagination";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useProductQueries } from "@/hooks/useProductQueries";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useProductPagination } from "@/hooks/useProductPagination";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentSort, setCurrentSort] = useState("date_desc");
  const scrollToTop = useScrollToTop();

  // Fetch all product data
  const { productData, isProductLoading, productError, filterData } =
    useProductQueries(searchParams);

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

  // Handle pagination and sorting
  const { currentPage, paginatedProducts, totalPages } = useProductPagination(
    productData?.allProducts,
    currentSort
  );

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

  // Loading state
  if (isProductLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Metadata title="Products" />
      <div className="mx-auto px-4 py-8">
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
                <SheetTitle className="text-white text-left">
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
            totalProducts={productData?.filteredProductCount || 0}
            currentProducts={productData?.products?.length || 0}
            currentSort={currentSort}
            onSortChange={handleSortChange}
            hideProductCount={true}
            minimal={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-2">
          {/* Desktop Filter */}
          <div className="hidden lg:block col-span-1 border border-gray-600 rounded-xl shadow-lg p-4 sticky top-24 h-[85vh]">
            <div className="flex items-center mb-4 space-x-2">
              <Filter className="h-6 w-6 text-white" />
              <h2 className="text-xl font-bold text-white">Filters</h2>
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
                totalProducts={productData?.filteredProductCount || 0}
                currentProducts={productData?.products?.length || 0}
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
            </div>
            {paginatedProducts && paginatedProducts.length > 0 ? (
              <ProductSection products={paginatedProducts} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <h3 className="text-3xl font-semibold text-gray-300 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-400 text-center py-2">
                  Try refreshing the page or check back later for new
                  products.
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
