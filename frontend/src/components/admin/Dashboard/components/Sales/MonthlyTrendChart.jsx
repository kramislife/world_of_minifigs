import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MonthlyTrendChart = ({ monthlySales, BaseChart, chartColors }) => {
  const lineChartData = {
    labels: monthlySales.map((item) => item.month),
    datasets: [
      {
        label: "Total Sales",
        data: monthlySales.map((item) => item.total),
        borderColor: chartColors.primary.base,
        backgroundColor: chartColors.primary.lighter,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-background text-lg font-semibold">
          Sales Over Time (Last 12 Months)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BaseChart
          type="line"
          data={lineChartData}
          options={{ currency: true }}
        />
      </CardContent>
    </Card>
  );
};

export default MonthlyTrendChart;
