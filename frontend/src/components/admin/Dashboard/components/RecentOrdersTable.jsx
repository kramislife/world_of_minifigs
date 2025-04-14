import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableLayout from "@/components/admin/shared/table/TableLayout";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const RecentOrdersTable = ({ recentOrders }) => {
  if (!recentOrders) return null;

  const getStatusVariant = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Pending":
        return "warning";
      case "Processing":
        return "info";
      case "Shipped":
        return "primary";
      case "Cancelled":
        return "destructive";
      case "On Hold":
        return "muted";
      case "To Review":
        return "accent";
      default:
        return "secondary";
    }
  };

  const columns = [
    {
      header: "Order ID",
      accessorKey: "orderId",
      cell: ({ row }) => (
        <span className="font-medium">#{row.original.orderId}</span>
      ),
    },
    {
      header: "Customer",
      accessorKey: "customerName",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.customerName}</span>
        </div>
      ),
    },
    {
      header: "Products",
      accessorKey: "products",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.products[0]?.name}
          {row.original.products.length > 1
            ? ` +${row.original.products.length - 1} more`
            : ""}
        </span>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <span className="font-medium">${row.original.amount.toFixed(2)}</span>
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => (
        <span className="font-medium">
          {format(new Date(row.original.date), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const variant = getStatusVariant(row.original.status);
        return <Badge variant={variant}>{row.original.status}</Badge>;
      },
    },
  ];

  const tableData =
    recentOrders?.map((order) => ({
      orderId: order._id,
      customerName: order.user?.name || "Unknown User",
      customerEmail: order.user?.email || "N/A",
      products: order.orderItems.map((item) => ({
        name: item.product?.product_name || "Unknown Product",
      })),
      amount: order.totalPrice,
      date: order.createdAt,
      status: order.orderStatus,
    })) || [];

  return (
    <Card className="bg-brand-dark/50 border border-brand-end/50">
      <CardHeader>
        <CardTitle className="text-white text-lg font-semibold">
          Recent Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TableLayout
          data={tableData}
          columns={columns}
          pageSize={5}
          setPageSize={() => {}}
          globalFilter=""
          setGlobalFilter={() => {}}
        />
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable;
