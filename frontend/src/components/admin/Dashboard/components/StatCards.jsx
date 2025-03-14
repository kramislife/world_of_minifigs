import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  CreditCard,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboardApi";

const StatCards = () => {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formatPaymentMethod = (method) => {
    return method === "stripe"
      ? "Stripe"
      : method === "paypal"
      ? "PayPal"
      : method;
  };

  const cards = [
    {
      title: "Total Sales",
      value: `$${stats?.stats?.totalSales.toFixed(2)}`,
      icon: <DollarSign className="h-8 w-8 text-green-400" />,
      change: stats?.stats?.monthOverMonthGrowth,
      changeText: "vs last month",
      changeColor:
        stats?.stats?.thisMonth >= stats?.stats?.lastMonth
          ? "text-green-400"
          : "text-red-400",
    },
    {
      title: "Total Orders",
      value: stats?.stats?.totalValidOrders.toString(),
      icon: <ShoppingCart className="h-8 w-8 text-blue-400" />,
      change: stats?.stats?.deliveredRate,
      changeText: "delivered",
      changeColor: "text-green-400",
    },
    {
      title: "Total Products",
      value: stats?.stats?.totalProducts.toString(),
      icon: <Package className="h-8 w-8 text-purple-400" />,
      change: stats?.stats?.lowStockPercentage,
      changeText: "low in stock",
      changeColor: "text-yellow-400",
    },
    {
      title: "Total Customers",
      value: stats?.stats?.customerStats?.totalCustomers.toString(),
      icon: <Users className="h-8 w-8 text-yellow-400" />,
      change: stats?.stats?.activeCustomerPercentage,
      changeText: "active users",
      changeColor: "text-green-400",
    },
    {
      title: "Refunds Issued",
      value: stats?.stats?.totalRefunds.toString(),
      icon: <TrendingUp className="h-8 w-8 text-red-400" />,
      change: stats?.stats?.refundRate,
      changeText: "refund rate",
      changeColor: "text-red-400",
    },
    {
      title: "Popular Payment",
      value: formatPaymentMethod(stats?.stats?.popularPayment?.method || "N/A"),
      icon: <CreditCard className="h-8 w-8 text-indigo-400" />,
      change: stats?.stats?.popularPayment?.percentage || 0,
      changeText: "usage rate",
      changeColor: "text-blue-400",
      tooltip: stats?.stats?.popularPayment?.breakdown
        ?.map(
          (payment) =>
            `${formatPaymentMethod(payment.method)}: ${payment.percentage}%`
        )
        .join("\n"),
    },
  ];

  return (
    <div className="grid gap-5 mb-8 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>
              <Card className="bg-darkBrand border-none hover:bg-darkBrand/90 transition-colors">
                <CardContent className="flex justify-between items-center p-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-300">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {card.value}
                    </p>
                    <p className="text-xs">
                      <span className={`font-bold ${card.changeColor}`}>
                        {card.change}%{" "}
                      </span>
                      <span className="text-gray-400">{card.changeText}</span>
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-500/10">
                    {card.icon}
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            {card.tooltip && (
              <TooltipContent>
                <div className="text-sm whitespace-pre-line">
                  Payment Method Breakdown:
                  {"\n"}
                  {card.tooltip}
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default StatCards;
