import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    // Always show first page
    items.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`h-9 w-9 rounded-md text-sm transition-colors 
          ${currentPage === 1 
            ? "bg-red-600 text-white" 
            : "hover:bg-red-600/80 text-gray-400"}`}
      >
        1
      </button>
    );

    // Calculate range of visible pages
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3));
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push(
        <span
          key="ellipsis1"
          className="flex h-9 w-9 items-center justify-center text-gray-400"
        >
          <MoreHorizontal className="h-4 w-4" />
        </span>
      );
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`h-9 w-9 rounded-md text-sm transition-colors 
            ${currentPage === i 
              ? "bg-red-600 text-white" 
              : "hover:bg-red-600/80 text-gray-400"}`}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      items.push(
        <span
          key="ellipsis2"
          className="flex h-9 w-9 items-center justify-center text-gray-400"
        >
          <MoreHorizontal className="h-4 w-4" />
        </span>
      );
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`h-9 w-9 rounded-md text-sm transition-colors 
            ${currentPage === totalPages 
              ? "bg-red-600 text-white" 
              : "hover:bg-red-600/80 text-gray-400"}`}
        >
          {totalPages}
        </button>
      );
    }

    return items;
  };

  return (
    <nav className="mx-auto lg:ml-36 flex w-full justify-center my-4 mt-8">
      <div className="flex flex-row items-center gap-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors
            ${currentPage === 1 
              ? "pointer-events-none" 
              : "text-gray-400 hover:bg-red-600/80 hover:text-white"}`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {renderPaginationItems()}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors
            ${currentPage === totalPages 
              ? "pointer-events-none" 
              : "text-gray-400 hover:bg-red-600/80 hover:text-white"}`}
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
};

export default CustomPagination;