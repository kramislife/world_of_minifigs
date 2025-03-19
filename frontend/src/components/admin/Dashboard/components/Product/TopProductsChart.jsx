import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TopProductsChart = ({ topProducts, BaseChart, chartColors }) => {
  const topProductsData = {
    labels:
      topProducts?.map((product) => {
        const name = product.name;
        const colorName = product.color_name;
        return `${name} - ${colorName}`;
      }) || [],
    datasets: [
      {
        label: "Total Sales ($)",
        data: topProducts?.map((product) => product.totalSales) || [],
        backgroundColor: chartColors.primary.light,
        borderColor: chartColors.primary.base,
        borderWidth: 1,
      },
      {
        label: "Units Sold",
        data: topProducts?.map((product) => product.quantity) || [],
        backgroundColor: chartColors.secondary.light,
        borderColor: chartColors.secondary.base,
        borderWidth: 1,
      },
    ],
  };

  const topProductsOptions = {
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          callback: function (value) {
            const label = this.getLabelForValue(value);
            const words = label.split(" - ");
            return words;
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          callback: (value) => `$${value.toLocaleString()}`,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            if (label.includes("Sales")) {
              return `${label}: $${value.toLocaleString()}`;
            }
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-light text-lg font-semibold">
          Top 10 Selling Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BaseChart
          type="bar"
          data={topProductsData}
          options={topProductsOptions}
        />
      </CardContent>
    </Card>
  );
};

export default TopProductsChart;
