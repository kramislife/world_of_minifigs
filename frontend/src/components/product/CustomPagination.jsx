import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

// Page number button component
const PageButton = ({ pageNumber, isActive, onClick }) => (
  <Button
    variant={isActive ? "accent" : "ghost"}
    size="sm"
    onClick={onClick}
    className={isActive ? "text-black h-9 w-9" : "h-9 w-9 hover:text-black"}
  >
    {pageNumber}
  </Button>
);

// Ellipsis indicator component
const Ellipsis = ({ keyName }) => (
  <span
    key={keyName}
    className="flex h-9 w-9 items-center justify-center text-gray-400"
  >
    <MoreHorizontal className="h-4 w-4" />
  </span>
);

// Navigation button component (Previous/Next)
const NavigationButton = ({ direction, onClick, children }) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onClick}
    className="flex items-center hover:text-black"
  >
    {direction === "previous" && <ChevronLeft className="h-4 w-4" />}
    {children}
    {direction === "next" && <ChevronRight className="h-4 w-4" />}
  </Button>
);

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    // Add first page button
    items.push(
      <PageButton
        key={1}
        pageNumber={1}
        isActive={currentPage === 1}
        onClick={() => onPageChange(1)}
      />
    );

    // Calculate middle page range
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

    // Adjust range if we're near the end
    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3));
    }

    // Add first ellipsis if needed
    if (startPage > 2) {
      items.push(<Ellipsis key="ellipsis1" />);
    }

    // Add middle page buttons
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PageButton
          key={i}
          pageNumber={i}
          isActive={currentPage === i}
          onClick={() => onPageChange(i)}
        />
      );
    }

    // Add second ellipsis if needed
    if (endPage < totalPages - 1) {
      items.push(<Ellipsis key="ellipsis2" />);
    }

    // Add last page button (if there's more than one page)
    if (totalPages > 1) {
      items.push(
        <PageButton
          key={totalPages}
          pageNumber={totalPages}
          isActive={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        />
      );
    }

    return items;
  };

  return (
    <nav className="flex w-full justify-center mb-7 mt-3">
      <div className="flex flex-row items-center gap-1">
        {/* Previous page button */}
        {currentPage > 1 && (
          <NavigationButton
            direction="previous"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </NavigationButton>
        )}

        {/* Page number buttons */}
        <div className="flex items-center gap-1">{renderPaginationItems()}</div>

        {/* Next page button */}
        {currentPage < totalPages && (
          <NavigationButton
            direction="next"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </NavigationButton>
        )}
      </div>
    </nav>
  );
};

export default CustomPagination;
