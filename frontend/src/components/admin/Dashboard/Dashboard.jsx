import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useSelector } from "react-redux";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date and time
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // Update line chart styling
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Total Sales",
        data: [1200, 1500, 1800, 2200, 2500, 2900],
        borderColor: "#60A5FA", // Bright blue
        backgroundColor: "rgba(96, 165, 250, 0.1)", // Light blue with transparency
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Enhanced chart options with consistent styling
  const chartBaseOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#E5E7EB", // Light gray text
        },
      },
      title: {
        color: "#E5E7EB",
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#E5E7EB",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#E5E7EB",
        },
      },
    },
  };

  // Update bar chart styling
  const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales by Month",
        data: [2000, 2200, 1800, 2100, 2400, 3000],
        backgroundColor: "rgba(96, 165, 250, 0.6)", // Semi-transparent blue
        borderColor: "#60A5FA",
        borderWidth: 1,
      },
    ],
  };

  // Update top products styling
  const topProductsData = {
    labels: ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5"],
    datasets: [
      {
        label: "Top Products Sales",
        data: [1500, 1200, 1000, 800, 600],
        backgroundColor: "rgba(96, 165, 250, 0.6)",
        borderColor: "#60A5FA",
        borderWidth: 1,
      },
    ],
  };
  const lineChartOptions = {
    ...chartBaseOptions,
    plugins: {
      ...chartBaseOptions.plugins,
      title: {
        ...chartBaseOptions.plugins.title,
        display: true,
        text: "Sales Over Time",
      },
    },
  };

  const barChartOptions = {
    ...chartBaseOptions,
    plugins: {
      ...chartBaseOptions.plugins,
      title: {
        ...chartBaseOptions.plugins.title,
        display: true,
        text: "Monthly Sales",
      },
    },
  };

  const topProductsOptions = {
    ...chartBaseOptions,
    plugins: {
      ...chartBaseOptions.plugins,
      title: {
        ...chartBaseOptions.plugins.title,
        display: true,
        text: "Top Products",
      },
    },
  };

  return (
    <>
      <Metadata title="Dashboard" />
      <div className="mx-auto py-6 px-4">
        {/* Welcome Section  */}
        <div className="mb-8 space-y-3">
          <h2 className="text-3xl font-bold text-light tracking-wide">
            {(() => {
              const hour = currentTime.getHours();
              if (hour < 12) return "Good Morning";
              if (hour < 17) return "Good Afternoon";
              return "Good Evening";
            })()}
            , {user?.name}!
          </h2>
          <p className="text-sm font-light text-gray-200/70 tracking-widest">
            Today is {formatDate(currentTime)} at {formatTime(currentTime)}
          </p>
        </div>

        {/* Stats Cards with enhanced styling */}
        <div className="grid gap-5 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Update each Card component */}
          <Card className="bg-darkBrand border-none hover:bg-darkBrand/90 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-light">
                Total Sales
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-light" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-light py-2">
                $45,231.89
              </div>
              <p className="text-xs text-light/80">+20.1% from last month</p>
            </CardContent>
          </Card>

          {/* Total Orders Card */}
          <Card className="bg-darkBrand border-none hover:bg-darkBrand/90 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-light">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-light" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-light py-2">+2350</div>
              <p className="text-xs text-light/80">+180.1% from last month</p>
            </CardContent>
          </Card>

          {/* Products Card */}
          <Card className="bg-darkBrand border-none hover:bg-darkBrand/90 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-light">
                Products
              </CardTitle>
              <Package className="h-4 w-4 text-light" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-light py-2">+12,234</div>
              <p className="text-xs text-light/80">+19% from last month</p>
            </CardContent>
          </Card>

          {/* Active Users Card */}
          <Card className="bg-darkBrand border-none hover:bg-darkBrand/90 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-light">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-light" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-light py-2">+573</div>
              <p className="text-xs text-light/80">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>

        {/* Graphs Section with enhanced styling */}
        <div className="grid gap-5 mb-8 md:grid-cols-2">
          <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-light text-lg font-semibold">
                Sales Over Time
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Line data={lineChartData} options={lineChartOptions} />
            </CardContent>
          </Card>

          {/* Bar Chart - Sales by Month */}
          <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-light text-lg font-semibold">
                Monthly Sales Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Bar data={barChartData} options={barChartOptions} />
            </CardContent>
          </Card>
        </div>

        {/* Top Products Bar Chart */}
        <div className="grid gap-5 mb-8">
          <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-light text-lg font-semibold">
                Top Selling Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={topProductsData} options={topProductsOptions} />
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders with enhanced table styling */}
        <div className="grid gap-5">
          <Card className="bg-darkBrand border-none hover:bg-darkBrand/90 transition-colors p-5">
            <CardHeader className="pb-10">
              <CardTitle className="text-light text-lg font-semibold">
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b border-gray-200/10 text-center">
                      <th className="h-12 px-6 text-center align-middle font-semibold text-light/90">
                        Order ID
                      </th>
                      <th className="h-12 px-6 text-center align-middle font-semibold text-light/90">
                        Customer
                      </th>
                      <th className="h-12 px-6 text-center align-middle font-semibold text-light/90">
                        Product
                      </th>
                      <th className="h-12 px-6 text-center align-middle font-semibold text-light/90">
                        Amount
                      </th>
                      <th className="h-12 px-6 text-center align-middle font-semibold text-light/90">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-200/10 transition-colors hover:bg-blue-500/10 text-light/80"
                      >
                        <td className="p-4 text-center font-medium text-sm">
                          #OID123{i}
                        </td>
                        <td className="p-4 text-center font-medium text-sm">
                          John Doe
                        </td>
                        <td className="p-4 text-center font-medium text-sm">
                          Product {i + 1}
                        </td>
                        <td className="p-4 text-center font-medium text-sm">
                          $199.99
                        </td>
                        <td className="p-4 text-center">
                          {/* Status cell with dynamic background color */}
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium 
                      ${
                        i % 2 === 0
                          ? "bg-green-300 text-black"
                          : "bg-yellow-300 text-black"
                      }`}
                          >
                            {i % 2 === 0 ? "Shipped" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
