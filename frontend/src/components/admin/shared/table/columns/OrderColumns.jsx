import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const createOrderColumns = ({ onViewDetails }) => [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Customer",
    accessorKey: "user",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.user?.name || "N/A"}</span>
      </div>
    ),
  },
  {
    header: "Items",
    accessorKey: "totalItems",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.totalItems}</span>
      </div>
    ),
  },
  {
    header: "Payment Method",
    accessorKey: "paymentInfo",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium">
          {row.original.paymentInfo?.method || "N/A"}
        </span>
      </div>
    ),
  },
  {
    header: "Total",
    accessorKey: "totalPrice",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">
          ${row.original.totalPrice?.toFixed(2)}
        </span>
      </div>
    ),
  },
  {
    header: "Order Status",
    accessorKey: "orderStatus",
    cell: ({ row }) => {
      const statusVariantMap = {
        Pending: "warning",
        Processing: "info",
        Shipped: "category",
        Delivered: "success",
        Cancelled: "destructive",
        "On Hold": "secondary",
        "Pre-Order": "accent",
      };

      return (
        <div className="flex justify-center gap-1">
          <Badge
            variant={statusVariantMap[row.original.orderStatus] || "default"}
          >
            {row.original.orderStatus}
          </Badge>
        </div>
      );
    },
  },
  {
    header: "Date",
    accessorKey: "createdAt",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewDetails(row.original)}
          className="text-blue-600 p-0 hover:bg-transparent hover:scale-110 transition-all duration-300"
        >
          <Eye className="h-5 w-5" />
        </Button>
      </div>
    ),
  },
];
