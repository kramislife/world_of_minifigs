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
      <div className="text-sm text-gray-200">
        {totalRows > 0 ? (
          <>
            Showing <span className="text-accent">{startRow}</span> to{" "}
            <span className="text-accent">{endRow}</span> of {totalRows} entries
          </>
        ) : (
          "No entries to show"
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
          className="px-4 py-2 border border-brand-end rounded-md text-sm font-medium text-white 
                     hover:bg-brand-end/50"
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!getCanNextPage()}
          className="px-4 py-2 border border-brand-end rounded-md text-sm font-medium text-white 
                     hover:bg-brand-end/50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
