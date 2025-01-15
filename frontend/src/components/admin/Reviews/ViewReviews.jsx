import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Eye, Trash2, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "@/components/admin/shared/table/SearchBar";
import ShowEntries from "@/components/admin/shared/table/ShowEntries";
import TableLayout from "@/components/admin/shared/table/TableLayout";
import Pagination from "@/components/admin/shared/table/Pagination";
import Metadata from "@/components/layout/Metadata/Metadata";

const ViewReviews = () => {
  const [data] = useState([
    {
      id: 1,
      productName: "Wireless Headphones",
      customerName: "John Doe",
      rating: 5,
      date: "2024-03-20",
      status: "Published",
    },
    {
      id: 2,
      productName: "Smart Watch",
      customerName: "Jane Smith",
      rating: 4,
      date: "2024-03-19",
      status: "Pending",
    },
    {
      id: 3,
      productName: "Smart Watch",
      customerName: "Jane Smith",
      rating: 4,
      date: "2024-03-19",
      status: "Pending",
    },
    {
      id: 4,
      productName: "Smart Watch",
      customerName: "Jane Smith",
      rating: 4,
      date: "2024-03-19",
      status: "Pending",
    },
    {
      id: 5,
      productName: "Smart Watch",
      customerName: "Jane Smith",
      rating: 4,
      date: "2024-03-19",
      status: "Pending",
    },
  ]);

  const [globalFilter, setGlobalFilter] = useState("");

  // Render star rating component
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center gap-1 justify-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`${
              index < rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Product",
        accessorKey: "productName",
      },
      {
        header: "Customer",
        accessorKey: "customerName",
      },
      {
        header: "Rating",
        accessorKey: "rating",
        cell: ({ row }) => <RatingStars rating={row.original.rating} />,
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              row.original.status === "Published"
                ? "bg-green-100 text-green-800"
                : ""
            }
            ${
              row.original.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : ""
            }
            ${
              row.original.status === "Rejected"
                ? "bg-red-100 text-red-800"
                : ""
            }
          `}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleViewDetails(row.original)}
              className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
              title="View Details"
            >
              <Eye size={18} />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
              title="Delete Review"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  // Handler functions
  const handleViewDetails = (review) => {
    console.log("View details for review:", review);
  };

  const handleDelete = (review) => {
    console.log("Delete review:", review);
  };

  return (
    <>
      <Metadata title="Reviews" />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-light tracking-tight">
            Review Management
          </h1>
          <p className="text-gray-200/70 text-md">
            Manage your product reviews
          </p>
        </div>

        <Card className="bg-darkBrand border-none">
          <CardContent className="p-10">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
              <ShowEntries
                value={table.getState().pagination.pageSize}
                onChange={table.setPageSize}
              />
              <SearchBar
                value={globalFilter}
                onChange={setGlobalFilter}
                placeholder="Search reviews..."
              />
            </div>

            <TableLayout
              headerGroups={table.getHeaderGroups()}
              rows={table.getRowModel().rows}
              flexRender={flexRender}
            />

            <Pagination table={table} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ViewReviews;
