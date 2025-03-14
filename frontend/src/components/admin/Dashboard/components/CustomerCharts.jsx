import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboardApi";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const CustomerCharts = () => {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const customerTypeData = {
    labels: ["Active Customers", "New Customers", "Inactive Customers"],
    datasets: [
      {
        data: [
          stats?.customerStats?.activeCustomers || 0,
          stats?.customerStats?.newCustomers || 0,
          stats?.customerStats?.inactiveCustomers || 0,
        ],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)", // Active - green
          "rgba(96, 165, 250, 0.8)", // New - blue
          "rgba(239, 68, 68, 0.8)", // Inactive - red
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(96, 165, 250, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const repeatPurchaseData = {
    labels: ["Repeat Customers", "Single-Order Customers"],
    datasets: [
      {
        data: [
          stats?.purchaseMetrics?.repeatCustomers || 0,
          stats?.purchaseMetrics?.singleOrderCustomers || 0,
        ],
        backgroundColor: [
          "rgba(139, 92, 246, 0.8)", // Purple for repeat
          "rgba(249, 115, 22, 0.8)", // Orange for single
        ],
        borderColor: ["rgba(139, 92, 246, 1)", "rgba(249, 115, 22, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
          padding: 20,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce(
              (acc, curr) => acc + curr,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Distribution Card */}
        <Card className="bg-darkBrand border-gray-800 shadow-lg hover:bg-darkBrand/90 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">
              Customer Distribution
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Active: Made at least one purchase
              <br />
              New: Registered within 30 days (no purchases)
              <br />
              Inactive: No purchases, registered over 30 days ago
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative">
              <Doughnut data={customerTypeData} options={doughnutOptions} />
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-400">Total Customers: </span>
              <span className="text-lg font-semibold text-white">
                {stats?.customerStats?.totalCustomers || 0}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Repeat Purchase Rate Card */}
        <Card className="bg-darkBrand border-gray-800 shadow-lg hover:bg-darkBrand/90 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">
              Repeat Purchase Rate
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Distribution of customers with multiple orders vs single orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 items-center">
              <div className="h-[220px]">
                <Doughnut data={repeatPurchaseData} options={doughnutOptions} />
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  {stats?.purchaseMetrics?.repeatRate?.toFixed(1)}%
                </div>
                <div className="text-gray-300 text-center font-medium">
                  Repeat Purchase Rate
                </div>
                <div className="text-sm text-gray-400 text-center mt-2">
                  {stats?.purchaseMetrics?.repeatCustomers || 0} customers made
                  multiple purchases
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerCharts;
