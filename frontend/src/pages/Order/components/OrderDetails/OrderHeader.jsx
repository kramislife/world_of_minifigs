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
                <CardTitle className="text-md md:text-lg text-white line-clamp-1 pb-1">
                  Order #{order._id}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-400">
                    Placed on {format(new Date(order.createdAt), "PPP")}
                  </p>
                  <span className="text-gray-500">•</span>
                  <p className="text-sm text-gray-400">
                    {order.orderItems.length}{" "}
                    {order.orderItems.length === 1 ? "item" : "items"}
                  </p>
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

          {/* Mobile Cancel Button */}
          {order.orderStatus === "Pending" && (
            <Button
              variant="destructive"
              onClick={() => setShowCancelDialog(true)}
              className="sm:hidden mt-3"
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
