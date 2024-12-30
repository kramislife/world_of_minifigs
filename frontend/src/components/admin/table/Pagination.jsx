const Pagination = ({ table }) => {
  const {
    getState,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    getFilteredRowModel,
  } = table;

  const { pageIndex, pageSize } = getState().pagination;
  const totalRows = getFilteredRowModel().rows.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-light/80">
        {totalRows > 0 ? (
          <>
            Showing {startRow} to {endRow} of {totalRows} entries
          </>
        ) : (
          "No entries to show"
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
          className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-light 
                     hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!getCanNextPage()}
          className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-light 
                     hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
