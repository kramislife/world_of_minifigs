import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

const TableLayout = ({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  renderPagination,
  pageSize,
  setPageSize,
}) => {
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater(table.getState().pagination);
        setPageSize(newState.pageSize);
        setPageIndex(newState.pageIndex);
      }
    },
    manualPagination: false,
    pageCount: Math.ceil(data.length / pageSize),
  });

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-brand-end/50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-12 text-background text-center"
                    style={{
                      width: header.column.columnDef.size
                        ? `${header.column.columnDef.size}px`
                        : "auto",
                      minWidth: header.column.columnDef.minSize || "auto",
                      maxWidth: header.column.columnDef.maxSize || "auto",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-brand-end/30 hover:bg-brand-dark cursor-pointer text-center last:border-b-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="py-5 text-sm text-background whitespace-nowrap"
                      style={{
                        width: cell.column.columnDef.size
                          ? `${cell.column.columnDef.size}px`
                          : "auto",
                        minWidth: cell.column.columnDef.minSize || "auto",
                        maxWidth: cell.column.columnDef.maxSize || "auto",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headerGroups[0].headers.length}
                  className="px-6 py-8 text-center text-gray-300"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {renderPagination && renderPagination(table)}
    </>
  );
};

export default TableLayout;
