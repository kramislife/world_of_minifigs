import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useGetMeQuery } from "@/redux/api/userApi";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboardApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutDashboard, Package2, ShoppingCart, Users } from "lucide-react";
import BaseChart, { chartColors } from "./components/Charts/BaseChart";
import StatCards from "./components/StatCards";
import SalesCharts from "./components/SalesCharts";
import ProductCharts from "./components/ProductCharts";
import OrderCharts from "./components/OrderCharts";
import CustomerCharts from "./components/CustomerCharts";
import RecentOrdersTable from "./components/RecentOrdersTable";

// Map icon strings to components
const iconComponents = {
  LayoutDashboard,
  Package2,
  ShoppingCart,
  Users,
};

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "overview"
  );
  const { data: userData } = useGetMeQuery();
  const { data: dashboardStats, isLoading } = useGetDashboardStatsQuery();

  // Update URL when tab changes
  const handleTabChange = (value) => {
    setActiveTab(value);
    setSearchParams({ dashboard: value });
  };

  // Set initial tab from URL on mount
  useEffect(() => {
    const tabFromUrl = searchParams.get("dashboard");
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const activeTabData = dashboardStats?.ui.navigationTabs.find(
    (tab) => tab.id === activeTab
  );
  const TabIcon = iconComponents[activeTabData?.icon];

  return (
    <>
      <Metadata title="Dashboard | Admin Panel" />
      <div className="p-6 space-y-6 bg-brand min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-light tracking-wide flex items-center gap-2">
              {dashboardStats.ui.greeting}, {userData?.name || "Admin"}!
            </h2>
            <p className="text-sm font-light text-gray-200/70 tracking-widest">
              Today is {dashboardStats.ui.currentDate} at{" "}
              {dashboardStats.ui.currentTime}
            </p>
          </div>

          <div className="md:self-center">
            <Select value={activeTab} onValueChange={handleTabChange}>
              <SelectTrigger className="w-[220px] bg-darkBrand/60 border-gray-700 text-white hover:bg-blue-600/30 hover:text-white focus:ring-blue-600">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {TabIcon && <TabIcon className="h-4 w-4" />}
                    {activeTabData?.label}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-darkBrand border-gray-700">
                {dashboardStats.ui.navigationTabs.map((tab) => {
                  const Icon = iconComponents[tab.icon];
                  return (
                    <SelectItem
                      key={tab.id}
                      value={tab.id}
                      className="text-white hover:bg-blue-600/30 focus:bg-blue-600 focus:text-white cursor-pointer gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-8">
          {activeTab === "overview" && (
            <>
              <StatCards stats={dashboardStats?.stats} />
              <SalesCharts
                monthlySales={dashboardStats?.monthlySales}
                stats={dashboardStats?.stats}
                BaseChart={BaseChart}
                chartColors={chartColors}
              />
            </>
          )}

          {activeTab === "products" && (
            <ProductCharts
              topProducts={dashboardStats?.topProducts}
              categoryStats={dashboardStats?.categoryStats}
              collectionStats={dashboardStats?.collectionStats}
              lowStockProducts={dashboardStats?.lowStockProducts}
              BaseChart={BaseChart}
              chartColors={chartColors}
            />
          )}

          {activeTab === "orders" && (
            <>
              <OrderCharts
                orderStatusCount={dashboardStats?.orderStatusCount}
                dailyOrders={dashboardStats?.dailyOrders}
                BaseChart={BaseChart}
                chartColors={chartColors}
              />
              <RecentOrdersTable recentOrders={dashboardStats?.recentOrders} />
            </>
          )}

          {activeTab === "customers" && (
            <CustomerCharts
              customerStats={dashboardStats?.customerStats}
              BaseChart={BaseChart}
              chartColors={chartColors}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
