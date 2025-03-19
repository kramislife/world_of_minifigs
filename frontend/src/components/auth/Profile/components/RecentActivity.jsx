import { Package, Star, Clock } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useProfileData } from "@/hooks/Profile/useProfileData";

const RecentActivity = ({ orders }) => {
  const { formatDate, getActivityDetails } = useProfileData();

  const getActivityIcon = (type) => {
    switch (type) {
      case "order":
        return <Package className="w-5 h-5" />;
      case "review":
        return <Star className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const generateActivities = () => {
    if (!orders?.data) return [];

    const activities = [];

    orders.data.forEach((order) => {
      activities.push({
        type: "order",
        title: `Order ${order.orderStatus}`,
        description: `Order #${order._id.slice(-8)} - ${
          order.orderItems.length
        } item${order.orderItems.length > 1 ? "s" : ""}`,
        status: order.orderStatus,
        date: order.createdAt,
        amount: order.totalPrice,
      });

      if (order.isReviewed) {
        activities.push({
          type: "review",
          title: "Review Posted",
          description: `Reviewed order #${order._id.slice(-8)}`,
          date: order.updatedAt,
        });
      }
    });

    return activities.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const activities = generateActivities();

  return (
    <Card className="bg-darkBrand border-none">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-light">
              Recent Activity
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Your latest orders and reviews
            </p>
          </div>
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
            View all
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.slice(0, 5).map((activity, index) => {
              const { icon, color, statusColor } = getActivityDetails(
                activity.type,
                activity.status
              );
              return (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer"
                >
                  <div className={`p-2.5 rounded-lg ${color}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-light font-medium">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {activity.description}
                        </p>
                        <span className="text-xs text-gray-500 mt-2 block">
                          {formatDate(activity.date)}
                        </span>
                      </div>
                      {activity.amount && (
                        <span className={`text-sm font-medium ${statusColor}`}>
                          ${activity.amount.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No recent activity</p>
            <p className="text-sm text-gray-500 mt-1">
              Your recent orders and reviews will appear here
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Start Shopping
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
