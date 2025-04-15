import { Eye, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const createUserColumns = (
  handleEdit,
  handleDelete,
  handleViewDetails
) => [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.original.name}</span>
        {row.original.isCurrentUser && (
          <span className="ml-2 text-xs text-blue-600">(You)</span>
        )}
      </div>
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Username",
    accessorKey: "username",
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => {
      // Capitalize first letter of role
      const role =
        row.original.role.charAt(0).toUpperCase() + row.original.role.slice(1);
      return (
        <Badge
          variant={
            role === "Admin"
              ? "purple"
              : role === "Customer"
              ? "info"
              : role === "Seller"
              ? "warning"
              : role === "Employee"
              ? "purple"
              : "destructive"
          }
        >
          {role}
        </Badge>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <Badge variant={row.original.isSuspended ? "destructive" : "success"}>
        {row.original.isSuspended ? "Suspended" : "Active"}
      </Badge>
    ),
  },
  {
    header: "Verified",
    accessorKey: "is_verified",
    cell: ({ row }) => (
      <Badge variant={row.original.is_verified ? "success" : "secondary"}>
        {row.original.is_verified ? "Verified" : "Unverified"}
      </Badge>
    ),
  },
  {
    header: "Last Login",
    accessorKey: "last_login",
    cell: ({ row }) => new Date(row.original.last_login).toLocaleString(),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => handleEdit(row.original)}
          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
          title="Edit User"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => handleDelete(row.original)}
          className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Delete User"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
