import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { orderStatus } from "@/constant/orderStatus";

const OrderStatusChart = ({ orderStatusCount, BaseChart, chartColors }) => {
  // Filter out "To Review" status
  const filteredOrderStatus = orderStatus.filter(
    (status) => status.value !== "To Review"
  );

  const orderStatusData = {
    labels: filteredOrderStatus.map((status) => status.label),
    datasets: [
      {
        label: "Order Count",
        data: filteredOrderStatus.map(
          (status) => orderStatusCount?.[status.value] || 0
        ),
        backgroundColor: [
          chartColors.warning.light,
          chartColors.success.light,
          chartColors.danger.light,
          chartColors.primary.light,
          chartColors.secondary.light,
        ],
        borderWidth: 1,
        borderRadius: 4,
        maxBarThickness: 40,
      },
    ],
  };

  return (
    <Card className="bg-darkBrand border-gray-800 shadow-lg hover:bg-darkBrand/90 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">
          Order Status Distribution
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm">
          Current status of all orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <BaseChart type="bar" data={orderStatusData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusChart;
