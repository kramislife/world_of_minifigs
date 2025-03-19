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
    <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-light text-lg font-semibold">
          Monthly Sales Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
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
