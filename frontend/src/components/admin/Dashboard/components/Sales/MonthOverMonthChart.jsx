import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MonthOverMonthChart = ({
  lastTwoMonths,
  stats,
  BaseChart,
  chartColors,
}) => {
  const comparisonData = {
    labels: [
      lastTwoMonths[0]?.month || "Last Month",
      lastTwoMonths[1]?.month || "This Month",
    ],
    datasets: [
      {
        label: "Sales Comparison",
        data: [lastTwoMonths[0]?.total || 0, lastTwoMonths[1]?.total || 0],
        backgroundColor: [chartColors.gray.light, chartColors.primary.light],
        borderColor: [chartColors.gray.base, chartColors.primary.base],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-light text-lg font-semibold">
          Month-over-Month Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <BaseChart
              type="bar"
              data={comparisonData}
              options={{ currency: true }}
            />
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-800/50 rounded-lg p-6 shadow-lg">
            <div className="text-center mb-4">
              <div
                className={`text-5xl font-bold mb-2 transition-colors ${
                  stats.growthPercentage >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {stats.growthPercentage >= 0 ? "+" : ""}
                {stats.growthPercentage}%
              </div>
              <div className="text-gray-400 text-sm font-medium">
                Growth Rate
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4"></div>

            <div
              className={`text-center px-4 py-3 rounded-lg transition-all transform hover:scale-105 
                ${
                  stats.growthPercentage >= 0
                    ? "bg-green-400/10 text-green-300"
                    : "bg-red-400/10 text-red-300"
                }`}
            >
              <p className="text-sm leading-relaxed">
                {stats.growthDescription}
              </p>
            </div>

            <div className="mt-4 text-xs text-gray-400 text-center">
              Based on total sales volume
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthOverMonthChart;
