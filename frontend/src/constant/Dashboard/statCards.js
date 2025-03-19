import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  CreditCard,
} from "lucide-react";

export const formatPaymentMethod = (method) => {
  return method === "stripe"
    ? "Stripe"
    : method === "paypal"
    ? "PayPal"
    : method;
};

export const getStatCardConfig = (stats) => [
  {
    title: "Total Sales",
    value: `$${stats?.totalSales.toFixed(2)}`,
    icon: DollarSign,
    color: "text-green-400",
    change: stats?.monthOverMonthGrowth,
    changeText: "vs last month",
    changeColor:
      stats?.thisMonth >= stats?.lastMonth ? "text-green-400" : "text-red-400",
  },
  {
    title: "Total Orders",
    value: stats?.totalValidOrders.toString(),
    icon: ShoppingCart,
    color: "text-blue-400",
    change: stats?.deliveredRate,
    changeText: "delivered",
    changeColor: "text-green-400",
  },
  {
    title: "Total Products",
    value: stats?.totalProducts.toString(),
    icon: Package,
    color: "text-purple-400",
    change: stats?.lowStockPercentage,
    changeText: "low in stock",
    changeColor: "text-yellow-400",
  },
  {
    title: "Total Customers",
    value: stats?.customerStats?.totalCustomers.toString(),
    icon: Users,
    color: "text-yellow-400",
    change: stats?.activeCustomerPercentage,
    changeText: "active users",
    changeColor: "text-green-400",
  },
  {
    title: "Refunds Issued",
    value: stats?.totalRefunds.toString(),
    icon: TrendingUp,
    color: "text-red-400",
    change: stats?.refundRate,
    changeText: "refund rate",
    changeColor:
      (stats?.refundRate || 0) <= 20
        ? "text-green-400"
        : (stats?.refundRate || 0) <= 40
        ? "text-yellow-400"
        : "text-red-400",
  },
  {
    title: "Popular Payment",
    value: formatPaymentMethod(stats?.popularPayment?.method || "N/A"),
    icon: CreditCard,
    color: "text-indigo-400",
    change: stats?.popularPayment?.percentage || 0,
    changeText: "usage rate",
    changeColor: "text-blue-400",
    tooltip: stats?.popularPayment?.breakdown
      ?.map(
        (payment) =>
          `${formatPaymentMethod(payment.method)}: ${payment.percentage}%`
      )
      .join("\n"),
  },
];
