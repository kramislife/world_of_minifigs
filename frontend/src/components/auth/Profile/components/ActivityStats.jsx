import { ShoppingBag, ShoppingCart, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ActivityStats = ({ stats, setIsCartOpen }) => {
  const navigate = useNavigate();

  const activities = [
    {
      icon: <ShoppingBag className="w-5 h-5 text-purple-400" />,
      label: "Orders",
      value: stats.totalOrders,
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-400",
      onClick: () => stats.totalOrders > 0 && navigate("/my-orders?status=all"),
      isClickable: stats.totalOrders > 0,
    },
    {
      icon: <ShoppingCart className="w-5 h-5 text-blue-400" />,
      label: "Cart Items",
      value: stats.cartItems,
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-400",
      onClick: () => stats.cartItems > 0 && setIsCartOpen(true),
      isClickable: stats.cartItems > 0,
    },
    {
      icon: <Star className="w-5 h-5 text-yellow-400" />,
      label: "Reviews",
      value: stats.reviewsGiven,
      bgColor: "bg-yellow-500/10",
      textColor: "text-yellow-400",
      onClick: () =>
        stats.reviewsGiven > 0 &&
        navigate("/my-orders?status=To%20Review&reviewTab=history"),
      isClickable: stats.reviewsGiven > 0,
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-400" />,
      label: "Total Spend",
      value: `$${stats.totalSpend.toFixed(2)}`,
      bgColor: "bg-green-500/10",
      textColor: "text-green-400",
      isClickable: false,
    },
  ];

  return (
    <Card className="bg-darkBrand border-none">
      <CardContent className="p-5 space-y-2">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
              activity.isClickable
                ? "hover:bg-brand/20 cursor-pointer"
                : "cursor-default"
            }`}
            onClick={activity.onClick}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${activity.bgColor}`}>
                {activity.icon}
              </div>
              <span className="text-light">{activity.label}</span>
            </div>
            <span className={`text-2xl font-semibold ${activity.textColor}`}>
              {activity.value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActivityStats;
