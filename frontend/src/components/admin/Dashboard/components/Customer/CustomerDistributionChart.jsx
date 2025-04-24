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
      legend: {
        display: false, // Hide default legends
      },
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

  const legends = [
    {
      color: chartColors.success.base,
      label: "Active",
      value: customerStats?.activeCustomers || 0,
      description: "Made at least one purchase",
    },
    {
      color: chartColors.primary.base,
      label: "New",
      value: customerStats?.newCustomers || 0,
      description: "Registered within 30 days",
    },
    {
      color: chartColors.danger.base,
      label: "Inactive",
      value: customerStats?.inactiveCustomers || 0,
      description: "No purchases, inactive for over 30 days",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-background">
          Customer Distribution
        </CardTitle>
        <CardDescription className="text-gray-200">
          <div className="grid gap-3 mt-2">
            {legends.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-200">{item.label}</span>
                </div>

                <span className="text-xs text-gray-400">
                  ({item.description})
                </span>
              </div>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] relative flex items-center justify-center">
          <BaseChart
            type="doughnut"
            data={customerTypeData}
            options={doughnutOptions}
          />
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">Total Customers: </span>
          <span className="text-lg font-semibold text-background">
            {customerStats?.totalCustomers || 0}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDistributionChart;
