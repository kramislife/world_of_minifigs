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
      color: chartColors.secondary.base,
      label: "Repeat Customers",
      value: customerStats?.repeatCustomers || 0,
      description: "Made multiple purchases",
    },
    {
      color: chartColors.warning.base,
      label: "One-Time Customers",
      value: customerStats?.singleOrderCustomers || 0,
      description: "Made one purchase only",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-background">
          Repeat Purchase Rate
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
                <span className="text-xs text-gray-300">
                  ({item.description})
                </span>
              </div>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex items-center justify-center">
          <BaseChart
            type="doughnut"
            data={repeatPurchaseData}
            options={doughnutOptions}
          />
        </div>
        <Card className="bg-inherit border-none mt-5">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <div className="text-4xl font-bold text-purple-400 mb-2">
              {customerStats?.repeatRate?.toFixed(1) || "0"}%
            </div>
            <div className="text-gray-300 text-center font-medium">
              Repeat Purchase Rate
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default RepeatPurchaseChart;
