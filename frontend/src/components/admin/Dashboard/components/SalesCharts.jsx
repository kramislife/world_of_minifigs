import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Bar } from "react-chartjs-2";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboardApi";

const SalesCharts = () => {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Get last 12 months of data
  const last12Months = stats?.monthlySales?.slice(-12) || [];

  // Get the last two months' data for comparison
  const lastTwoMonths = last12Months.slice(-2);
  const thisMonth = lastTwoMonths[1]?.total || 0;
  const lastMonth = lastTwoMonths[0]?.total || 0;

  const calculateGrowthPercentage = () => {
    if (lastMonth === 0) return thisMonth > 0 ? 100 : 0;
    return (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(1);
  };

  const lineChartData = {
    labels: last12Months.map((item) => item.month),
    datasets: [
      {
        label: "Total Sales",
        data: last12Months.map((item) => item.total),
        borderColor: "#60A5FA",
        backgroundColor: "rgba(96, 165, 250, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: last12Months.map((item) => item.month),
    datasets: [
      {
        label: "Sales by Month",
        data: last12Months.map((item) => item.total),
        backgroundColor: "rgba(96, 165, 250, 0.6)",
        borderColor: "#60A5FA",
        borderWidth: 1,
      },
    ],
  };

  const comparisonData = {
    labels: [
      lastTwoMonths[0]?.month || "Last Month",
      lastTwoMonths[1]?.month || "This Month",
    ],
    datasets: [
      {
        label: "Sales Comparison",
        data: [lastMonth, thisMonth],
        backgroundColor: [
          "rgba(156, 163, 175, 0.6)",
          "rgba(96, 165, 250, 0.6)",
        ],
        borderColor: ["#9CA3AF", "#60A5FA"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
      x: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "rgba(255, 255, 255, 0.7)" },
      },
    },
    plugins: {
      legend: {
        labels: { color: "rgba(255, 255, 255, 0.7)" },
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <>
      <div className="grid gap-5 mb-8 md:grid-cols-1">
        <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-light text-lg font-semibold">
              Sales Over Time (Last 12 Months)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Line data={lineChartData} options={chartOptions} />
          </CardContent>
        </Card>

        <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-light text-lg font-semibold">
              Monthly Sales Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Bar data={barChartData} options={chartOptions} />
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-light text-lg font-semibold">
              Month-over-Month Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <Bar data={comparisonData} options={chartOptions} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div
                  className={`text-4xl font-bold mb-2 ${
                    calculateGrowthPercentage() >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {calculateGrowthPercentage() >= 0 ? "+" : ""}
                  {calculateGrowthPercentage()}%
                </div>
                <div className="text-gray-300 text-center">
                  Growth from {lastTwoMonths[0]?.month || "last month"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SalesCharts;
