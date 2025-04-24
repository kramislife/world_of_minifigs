import { Button } from "@/components/ui/button";

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
    <div className="mt-5 flex flex-col md:flex-row items-center justify-between gap-4">
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
        <Button
          variant="ghost"
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
          className="border border-brand-end/50 text-background hover:bg-brand-dark/50"
        >
          Previous
        </Button>
        <Button
          variant="ghost"
          onClick={() => nextPage()}
          disabled={!getCanNextPage()}
          className="border border-brand-end/50 text-background hover:bg-brand-dark/50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
