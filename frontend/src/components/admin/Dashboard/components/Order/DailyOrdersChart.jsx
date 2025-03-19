import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const DailyOrdersChart = ({ dailyOrders, BaseChart, chartColors }) => {
  const dailyOrdersData = {
    labels: dailyOrders?.map((day) => day.date) || [],
    datasets: [
      {
        label: "Total Orders",
        data: dailyOrders?.map((day) => day.count) || [],
        backgroundColor: chartColors.primary.light,
        borderColor: chartColors.primary.base,
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
          Daily Order Volume
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm">
          Number of orders placed per day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <BaseChart type="bar" data={dailyOrdersData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyOrdersChart;
