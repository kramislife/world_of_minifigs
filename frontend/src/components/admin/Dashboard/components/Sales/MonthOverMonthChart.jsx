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
    <Card>
      <CardHeader>
        <CardTitle className="text-background text-lg font-semibold">
          Month-over-Month Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center md:grid md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <BaseChart
              type="bar"
              data={comparisonData}
              options={{ currency: true }}
            />
          </div>
          <Card className="w-full">
            <CardContent className="flex flex-col items-center p-5">
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
                <div className="text-gray-200 text-sm font-medium">
                  Growth Rate
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4"></div>

              <Card
                className={`w-full border-none ${
                  stats.growthPercentage >= 0
                    ? "bg-green-400/10"
                    : "bg-red-400/10"
                }`}
              >
                <CardContent className="p-3 text-center">
                  <p
                    className={`text-sm leading-relaxed ${
                      stats.growthPercentage >= 0
                        ? "text-green-300"
                        : "text-red-300"
                    }`}
                  >
                    {stats.growthDescription}
                  </p>
                </CardContent>
              </Card>

              <div className="mt-4 text-xs text-gray-200 text-center">
                Based on total sales volume
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthOverMonthChart;
