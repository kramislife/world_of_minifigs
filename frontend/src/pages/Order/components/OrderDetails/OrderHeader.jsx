import React from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OrderHeader = ({
  order,
  statusConfig,
  StatusIcon,
  setShowCancelDialog,
}) => {
  return (
    <Card className="bg-brand-dark/20 border border-brand-end/50">
      <CardHeader className="p-4">
        <div className="flex flex-col gap-2">
          {/* Top Section - Order ID and Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-brand-dark border border-brand-end/50">
                <StatusIcon className={`w-7 h-7 ${statusConfig.color}`} />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-base sm:text-lg md:text-xl text-white line-clamp-1">
                  Order #{order._id}
                </CardTitle>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-400">
                      Placed on {format(new Date(order.createdAt), "PPP")}
                    </p>
                    <span className="text-gray-500">•</span>
                    <p className="text-xs text-gray-400">
                      {order.orderItems.length}{" "}
                      {order.orderItems.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancel button - Only visible on larger screens */}
            {order.orderStatus === "Pending" && (
              <Button
                variant="destructive"
                onClick={() => setShowCancelDialog(true)}
                className="hidden sm:flex"
              >
                Cancel Order
              </Button>
            )}
          </div>

          {/* Price - Always at the bottom on mobile, right side on desktop */}
          <div className="flex justify-between items-center sm:absolute sm:top-4 sm:right-4">
            <span className="text-sm text-gray-400 sm:hidden">Total:</span>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-500">
              ${order.totalPrice.toFixed(2)}
            </div>
          </div>

          {/* Mobile Cancel Button */}
          {order.orderStatus === "Pending" && (
            <Button
              variant="destructive"
              onClick={() => setShowCancelDialog(true)}
              className="sm:hidden"
            >
              Cancel Order
            </Button>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default OrderHeader;
