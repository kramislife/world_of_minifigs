import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutDashboard, Package2, ShoppingCart, Users } from "lucide-react";

// Dashboard components
import StatCards from "./components/StatCards";
import SalesCharts from "./components/SalesCharts";
import ProductCharts from "./components/ProductCharts";
import OrderCharts from "./components/OrderCharts";
import CustomerCharts from "./components/CustomerCharts";
import RecentOrdersTable from "./components/RecentOrdersTable";

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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Format date and time
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  // Navigation tabs with icons
  const tabs = [
    {
      id: "overview",
      label: "Analytical Overview",
      icon: LayoutDashboard,
    },
    {
      id: "products",
      label: "Product Analytics",
      icon: Package2,
    },
    {
      id: "orders",
      label: "Order Analytics",
      icon: ShoppingCart,
    },
    {
      id: "customers",
      label: "Customer Analytics",
      icon: Users,
    },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <>
      <Metadata title="Dashboard | Admin Panel" />
      <div className="p-6 space-y-6 bg-brand min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          {/* Welcome Section  */}
          <div className="mb-8 space-y-3">
            <h2 className="text-3xl font-bold text-light tracking-wide">
              {(() => {
                const hour = currentTime.getHours();
                if (hour < 12) return "Good Morning";
                if (hour < 17) return "Good Afternoon";
                return "Good Evening";
              })()}
              , Admin!
            </h2>
            <p className="text-sm font-light text-gray-200/70 tracking-widest">
              Today is {formatDate(currentTime)} at {formatTime(currentTime)}
            </p>
          </div>

          {/* Tab navigation as select */}
          <div className="mt-4 md:mt-0">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-[220px] bg-darkBrand/60 border-gray-700 text-white hover:bg-blue-600/30 hover:text-white focus:ring-blue-600 mr-2">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {activeTabData && (
                      <activeTabData.icon className="h-4 w-4" />
                    )}
                    {activeTabData?.label}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-darkBrand border-gray-700">
                {tabs.map((tab) => (
                  <SelectItem
                    key={tab.id}
                    value={tab.id}
                    className="text-white hover:bg-blue-600/30 focus:bg-blue-600 focus:text-white cursor-pointer gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content sections */}
        {activeTab === "overview" && (
          <>
            <StatCards />
            <SalesCharts />
            <RecentOrdersTable />
          </>
        )}

        {activeTab === "products" && (
          <>
            <ProductCharts />
          </>
        )}

        {activeTab === "orders" && (
          <>
            <OrderCharts />
            <RecentOrdersTable />
          </>
        )}

        {activeTab === "customers" && (
          <>
            <CustomerCharts />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
