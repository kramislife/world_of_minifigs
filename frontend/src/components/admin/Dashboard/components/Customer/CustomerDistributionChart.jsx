import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const CustomerDistributionChart = ({
  customerStats,
  BaseChart,
  chartColors,
}) => {
  const customerTypeData = {
    labels: ["Active Customers", "New Customers", "Inactive Customers"],
    datasets: [
      {
        data: [
          customerStats?.activeCustomers || 0,
          customerStats?.newCustomers || 0,
          customerStats?.inactiveCustomers || 0,
        ],
        backgroundColor: [
          chartColors.success.light,
          chartColors.primary.light,
          chartColors.danger.light,
        ],
        borderColor: [
          chartColors.success.base,
          chartColors.primary.base,
          chartColors.danger.base,
        ],
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
          Customer Distribution
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm">
          Active: Made at least one purchase
          <br />
          New: Registered within 30 days (no purchases)
          <br />
          Inactive: No purchases, registered over 30 days ago
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative">
          <BaseChart
            type="doughnut"
            data={customerTypeData}
            options={doughnutOptions}
          />
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">Total Customers: </span>
          <span className="text-lg font-semibold text-white">
            {customerStats?.totalCustomers || 0}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDistributionChart;
