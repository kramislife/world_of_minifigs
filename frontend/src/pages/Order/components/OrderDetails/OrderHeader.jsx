import React from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const OrderHeader = ({ order, statusConfig, StatusIcon }) => {
  return (
    <Card className="bg-brand/80 border-gray-600/50">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-950 border border-blue-800">
              <StatusIcon className={`w-6 h-6 ${statusConfig.color}`} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <CardTitle className="text-2xl font-bold text-white">
                  Order #{order._id}
                </CardTitle>
                <div
                  className={`px-3 py-1 rounded-full ${
                    statusConfig.bgColor
                  } border border-${statusConfig.color.replace(
                    "text-",
                    ""
                  )}/30`}
                >
                  <span className={`text-sm font-medium ${statusConfig.color}`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Placed on {format(new Date(order.createdAt), "PPP")}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">
              ${order.totalPrice.toFixed(2)}
            </div>
            <p className="text-sm text-gray-400">
              {order.orderItems.length}{" "}
              {order.orderItems.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default OrderHeader;
