import { Badge } from "@/components/ui/badge";
import { createBaseColumns } from "./BaseColumns";

export const createUserColumns = (handleEdit, handleDelete, isDeleting) => {
  const customColumns = [
    {
      header: "Name",
      accessorKey: "name",
      size: 150,
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
      size: 100,
    },
    {
      header: "Username",
      accessorKey: "username",
      size: 100,
    },
    {
      header: "Role",
      accessorKey: "role",
      size: 100,
      cell: ({ row }) => {
        const role =
          row.original.role.charAt(0).toUpperCase() +
          row.original.role.slice(1);
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
      size: 100,
      cell: ({ row }) => (
        <Badge variant={row.original.isSuspended ? "destructive" : "success"}>
          {row.original.isSuspended ? "Suspended" : "Active"}
        </Badge>
      ),
    },
    {
      header: "Verified",
      accessorKey: "is_verified",
      size: 100,
      cell: ({ row }) => (
        <Badge variant={row.original.is_verified ? "success" : "secondary"}>
          {row.original.is_verified ? "Verified" : "Unverified"}
        </Badge>
      ),
    },
    {
      header: "Last Login",
      accessorKey: "last_login",
    },
  ];

  return createBaseColumns({
    handleEdit,
    handleDelete,
    isDeleting,
    hasImageUpload: false,
    customColumns,
  });
};
