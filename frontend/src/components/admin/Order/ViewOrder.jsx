import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "@/components/admin/shared/table/SearchBar";
import ShowEntries from "@/components/admin/shared/table/ShowEntries";
import TableLayout from "@/components/admin/shared/table/TableLayout";
import Pagination from "@/components/admin/shared/table/Pagination";
import Metadata from "@/components/layout/Metadata/Metadata";

const ViewOrder = () => {
  // Sample data
  const [data] = useState([
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      customerName: "John Doe",
      date: "2024-03-20",
      total: 299.99,
      status: "Pending",
      paymentStatus: "Paid",
      items: [{ name: "Product 1", quantity: 2, price: 149.99 }],
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      customerName: "Jane Smith",
      date: "2024-03-19",
      total: 159.99,
      status: "Delivered",
      paymentStatus: "Paid",
      items: [{ name: "Product 2", quantity: 1, price: 159.99 }],
    },
    {
      id: 3,
      orderNumber: "ORD-2024-002",
      customerName: "Jane Smith",
      date: "2024-03-19",
      total: 159.99,
      status: "Delivered",
      paymentStatus: "Paid",
      items: [{ name: "Product 2", quantity: 1, price: 159.99 }],
    },
    {
      id: 4,
      orderNumber: "ORD-2024-002",
      customerName: "Jane Smith",
      date: "2024-03-19",
      total: 159.99,
      status: "Delivered",
      paymentStatus: "Paid",
      items: [{ name: "Product 2", quantity: 1, price: 159.99 }],
    },
    {
      id: 5,
      orderNumber: "ORD-2024-002",
      customerName: "Jane Smith",
      date: "2024-03-19",
      total: 159.99,
      status: "Delivered",
      paymentStatus: "Paid",
      items: [{ name: "Product 2", quantity: 1, price: 159.99 }],
    },
  ]);

  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      {
        header: "Order Number",
        accessorKey: "orderNumber",
      },
      {
        header: "Customer Name",
        accessorKey: "customerName",
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
      },
      {
        header: "Total",
        accessorKey: "total",
        cell: ({ row }) => `$${row.original.total.toFixed(2)}`,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              row.original.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : ""
            }
            ${
              row.original.status === "Delivered"
                ? "bg-green-100 text-green-800"
                : ""
            }
            ${
              row.original.status === "Cancelled"
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
        header: "Payment Status",
        accessorKey: "paymentStatus",
        cell: ({ row }) => (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              row.original.paymentStatus === "Paid"
                ? "bg-green-100 text-green-800"
                : ""
            }
            ${
              row.original.paymentStatus === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : ""
            }
            ${
              row.original.paymentStatus === "Failed"
                ? "bg-red-100 text-red-800"
                : ""
            }
          `}
          >
            {row.original.paymentStatus}
          </span>
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-3">
            <button
              onClick={() => handleViewDetails(row.original)}
              className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
              title="View Details"
            >
              <Eye size={18} />
            </button>
            <button
              onClick={() => handleUpdateStatus(row.original)}
              className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors"
              title="Update Status"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
              title="Delete Order"
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
  const handleViewDetails = (order) => {
    console.log("View details for order:", order);
  };

  const handleUpdateStatus = (order) => {
    console.log("Update status for order:", order);
  };

  const handleDelete = (order) => {
    console.log("Delete order:", order);
  };

  return (
    <>
      <Metadata title="Orders" />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-light tracking-tight">
            Order Management
          </h1>
          <p className="text-gray-200/70 text-md">
            Manage your customer orders
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
                placeholder="Search orders..."
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

export default ViewOrder;
