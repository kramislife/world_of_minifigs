import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboardApi";
import TableLayout from "@/components/admin/shared/table/TableLayout";
import { format } from "date-fns";

const RecentOrdersTable = () => {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

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
      cell: ({ row }) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium 
          ${
            row.original.status === "Delivered"
              ? "bg-green-300 text-black"
              : row.original.status === "Cancelled"
              ? "bg-red-300 text-black"
              : row.original.status === "Shipped"
              ? "bg-blue-300 text-black"
              : "bg-yellow-300 text-black"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const tableData =
    stats?.recentOrders?.map((order) => ({
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
    <Card className="bg-darkBrand border-none hover:bg-darkBrand/90 transition-colors p-5">
      <CardHeader className="pb-4">
        <CardTitle className="text-light text-lg font-semibold">
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
