import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2 } from "lucide-react";
import TableLayout from "@/components/admin/shared/table/TableLayout";

const LowStockTable = ({ lowStockProducts }) => {
  const columns = [
    {
      header: "Product",
      accessorKey: "name",
      cell: (info) => <span className="text-background">{info.getValue()}</span>,
    },
    {
      header: "Current Stock",
      accessorKey: "stock",
      cell: (info) => (
        <span className="text-background">{info.getValue()} units</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "stock",
      cell: (info) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            info.getValue() <= 2
              ? "bg-red-600 text-background"
              : "bg-amber-500/80 text-background"
          }`}
        >
          {info.getValue() <= 2 ? "Critical" : "Low"}
        </span>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-background text-lg font-semibold">
          Low Stock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {lowStockProducts?.length > 0 ? (
          <TableLayout
            data={lowStockProducts}
            columns={columns}
            pageSize={lowStockProducts.length}
            setPageSize={() => {}}
            globalFilter=""
            setGlobalFilter={() => {}}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <Package2 className="h-12 w-12 mb-3 opacity-50" />
            <p className="text-sm">No products with low stock</p>
            <p className="text-xs mt-1 opacity-75">
              All products are well stocked
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LowStockTable;
