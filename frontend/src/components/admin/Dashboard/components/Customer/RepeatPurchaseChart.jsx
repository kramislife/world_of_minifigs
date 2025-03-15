import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const RepeatPurchaseChart = ({ customerStats, BaseChart, chartColors }) => {
  const repeatPurchaseData = {
    labels: ["Repeat Customers", "Single-Order Customers"],
    datasets: [
      {
        data: [
          customerStats?.repeatCustomers || 0,
          customerStats?.singleOrderCustomers || 0,
        ],
        backgroundColor: [
          chartColors.secondary.light,
          chartColors.warning.light,
        ],
        borderColor: [chartColors.secondary.base, chartColors.warning.base],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    cutout: "75%",
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce(
              (acc, curr) => acc + curr,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Card className="bg-darkBrand border-gray-800 shadow-lg hover:bg-darkBrand/90 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">
          Repeat Purchase Rate
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm">
          Distribution of customers with multiple orders vs single orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 items-center">
          <div className="h-[220px]">
            <BaseChart
              type="doughnut"
              data={repeatPurchaseData}
              options={doughnutOptions}
            />
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-4xl font-bold text-purple-400 mb-2">
              {customerStats?.repeatRate?.toFixed(1) || "0"}%
            </div>
            <div className="text-gray-300 text-center font-medium">
              Repeat Purchase Rate
            </div>
            <div className="text-sm text-gray-400 text-center mt-2">
              {customerStats?.repeatCustomers || 0} customers made multiple
              purchases
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RepeatPurchaseChart;
