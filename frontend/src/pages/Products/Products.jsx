import React from "react";
import { useNavigate } from "react-router-dom";
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
import { useProductQueries } from "@/hooks/Product/useProductQueries";
import { useProductFilters } from "@/hooks/Product/useProductFilters";
import { useProductPagination } from "@/hooks/Product/useProductPagination";
import ProductsSkeleton from "@/components/layout/skeleton/Products/ProductsSkeleton";

const Products = () => {
  const navigate = useNavigate();

  // Get products data and filtering options
  const {
    productData,
    isProductLoading,
    productError,
    filterData,
    groupedProducts,
  } = useProductQueries();

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

  // Product navigation handler
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
              <button className="flex items-center gap-2 hover:text-accent">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[350px] bg-brand-start">
              <SheetHeader>
                <SheetTitle className=" text-left text-white">
                  Filters
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 overflow-y-auto scrollbar-none h-full">
                <FilterAccordion
                  categories={filterOptions}
                  openCategories={openCategories}
                  onCategoriesChange={setOpenCategories}
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChangeAndCloseSheet}
                  products={productData?.allProducts || []}
                  groupedProducts={sortedProducts || []}
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
                groupedProducts={sortedProducts || []}
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
