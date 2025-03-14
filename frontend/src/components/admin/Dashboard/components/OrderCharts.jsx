import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboardApi";
import { orderStatus } from "@/constant/orderStatus";

const OrderCharts = () => {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const orderStatusData = {
    labels: orderStatus.map((status) => status.label),
    datasets: [
      {
        label: "Order Count",
        data: orderStatus.map(
          (status) => stats?.orderStatusCount?.[status.value] || 0
        ),
        backgroundColor: orderStatus.map((status) =>
          status.bgColor.replace("/20", "/60")
        ),
        borderColor: orderStatus.map((status) =>
          status.color.replace("text-", "").replace("-400", "")
        ),
        borderWidth: 1,
        borderRadius: 4,
        maxBarThickness: 40,
      },
    ],
  };

  const dailyOrdersData = {
    labels: stats?.dailyOrders?.map((day) => day.date) || [],
    datasets: [
      {
        label: "Total Orders",
        data: stats?.dailyOrders?.map((day) => day.count) || [],
        backgroundColor: "rgba(96, 165, 250, 0.6)",
        borderColor: "#60A5FA",
        borderWidth: 1,
        borderRadius: 4,
        maxBarThickness: 40,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          padding: 10,
          font: { size: 11 },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          padding: 5,
          font: { size: 11 },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
          font: { size: 11 },
          padding: 20,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "rgba(255, 255, 255, 0.9)",
        bodyColor: "rgba(255, 255, 255, 0.9)",
        padding: 12,
        displayColors: true,
      },
    },
  };

  return (
    <>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card className="bg-darkBrand border-gray-800 shadow-lg hover:bg-darkBrand/90 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">
              Order Status Distribution
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Current status of all orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar data={orderStatusData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

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
              <Bar data={dailyOrdersData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OrderCharts;
