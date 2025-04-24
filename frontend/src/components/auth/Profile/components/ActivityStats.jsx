import { useNavigate } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartSheet from "@/components/layout/header/CartSheet";

const ActivityStats = ({ stats }) => {
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
      isClickable: stats.cartItems > 0,
      isCartTrigger: true,
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
    <Card className="bg-brand-dark/50 border-none">
      <CardContent className="p-5">
        {activities.map((activity, index) => {
          const ActivityContent = (
            <div
              className={`flex justify-between items-center p-4 rounded-lg transition-all duration-300 ${
                activity.isClickable
                  ? "hover:bg-brand-dark/50 cursor-pointer hover:border-brand-end/50"
                  : "cursor-default"
              } border border-transparent`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${activity.bgColor}`}>
                  {activity.icon}
                </div>
                <span className="text-gray-200 font-medium">
                  {activity.label}
                </span>
              </div>
              <span className={`text-2xl font-bold ${activity.textColor}`}>
                {activity.value}
              </span>
            </div>
          );

          return (
            <div key={index}>
              {activity.isCartTrigger ? (
                <Sheet>
                  <SheetTrigger asChild>{ActivityContent}</SheetTrigger>
                  <CartSheet />
                </Sheet>
              ) : (
                <div onClick={activity.onClick}>{ActivityContent}</div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ActivityStats;
