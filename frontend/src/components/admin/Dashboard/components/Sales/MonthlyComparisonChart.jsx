import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MonthlyComparisonChart = ({ monthlySales, BaseChart, chartColors }) => {
  const barChartData = {
    labels: monthlySales.map((item) => item.month),
    datasets: [
      {
        label: "Sales by Month",
        data: monthlySales.map((item) => item.total),
        backgroundColor: chartColors.primary.light,
        borderColor: chartColors.primary.base,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="bg-brand-dark/50 border border-brand-end/50">
      <CardHeader>
        <CardTitle className="text-white text-lg font-semibold">
          Monthly Sales Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BaseChart
          type="bar"
          data={barChartData}
          options={{ currency: true }}
        />
      </CardContent>
    </Card>
  );
};

export default MonthlyComparisonChart;
