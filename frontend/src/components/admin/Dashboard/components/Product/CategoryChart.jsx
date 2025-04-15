import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CategoryChart = ({ categoryStats, BaseChart, chartColors }) => {
  const salesByCategoryData = {
    labels: categoryStats?.map((cat) => cat.name) || [],
    datasets: [
      {
        label: "Number of Orders",
        data: categoryStats?.map((cat) => cat.orderCount) || [],
        backgroundColor: [
          chartColors.danger.light,
          chartColors.success.light,
          chartColors.warning.light,
          chartColors.secondary.light,
          chartColors.primary.light,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="bg-brand-dark/50 border border-brand-end/50">
      <CardHeader>
        <CardTitle className="text-white text-lg font-semibold">
          Top 5 Categories by Order Count
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <BaseChart type="bar" data={salesByCategoryData} />
      </CardContent>
    </Card>
  );
};

export default CategoryChart;
