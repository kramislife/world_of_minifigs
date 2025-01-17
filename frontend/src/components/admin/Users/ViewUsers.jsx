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

const ViewUsers = () => {
  const [data] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Customer",
      status: "Active",
      joinDate: "2024-03-20",
      lastLogin: "2024-03-25",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2024-03-15",
      lastLogin: "2024-03-24",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2024-03-15",
      lastLogin: "2024-03-24",
    },
    {
      id: 4,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2024-03-15",
      lastLogin: "2024-03-24",
    },
    {
      id: 5,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2024-03-15",
      lastLogin: "2024-03-24",
    },
  ]);

  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Role",
        accessorKey: "role",
        cell: ({ row }) => (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              row.original.role === "Admin"
                ? "bg-purple-100 text-purple-800"
                : ""
            }
            ${
              row.original.role === "Customer"
                ? "bg-blue-100 text-blue-800"
                : ""
            }
          `}
          >
            {row.original.role}
          </span>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              row.original.status === "Active"
                ? "bg-green-100 text-green-800"
                : ""
            }
            ${
              row.original.status === "Inactive"
                ? "bg-gray-100 text-gray-800"
                : ""
            }
            ${
              row.original.status === "Suspended"
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
        header: "Join Date",
        accessorKey: "joinDate",
        cell: ({ row }) => new Date(row.original.joinDate).toLocaleDateString(),
      },
      {
        header: "Last Login",
        accessorKey: "lastLogin",
        cell: ({ row }) =>
          new Date(row.original.lastLogin).toLocaleDateString(),
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
              onClick={() => handleEdit(row.original)}
              className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
              title="Edit User"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
              title="Delete User"
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
  const handleViewDetails = (user) => {
    console.log("View details for user:", user);
  };

  const handleEdit = (user) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (user) => {
    console.log("Delete user:", user);
  };

  return (
    <>
      <Metadata title="Users" />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-light tracking-tight">
            User Management
          </h1>
          <p className="text-gray-200/70 text-md">Manage your system users</p>
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
                placeholder="Search users..."
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

export default ViewUsers;
