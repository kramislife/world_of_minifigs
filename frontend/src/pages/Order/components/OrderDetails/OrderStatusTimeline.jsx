import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OrderStatusTimeline = ({
  order,
  filteredOrderStatus,
  setShowCancelDialog,
}) => {
  return (
    <Card className="bg-brand/80 border-gray-600/50">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-700 -z-10" />
          {filteredOrderStatus.map((step, index) => {
            const statusValues = filteredOrderStatus.map((s) => s.value);
            const isActive =
              index <= statusValues.indexOf(order.orderStatus) ||
              (order.orderStatus === "Cancelled" && index === 0);

            // Get the icon component
            const StepIcon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200
                ${
                  isActive
                    ? `${step.bgColor} ${step.color}`
                    : "bg-gray-700 text-gray-400"
                }`}
                >
                  <StepIcon className="w-5 h-5" />
                </div>
                <span
                  className={`text-sm ${
                    isActive ? step.color : "text-gray-400"
                  }`}
                >
                  {step.value}
                </span>
              </div>
            );
          })}
        </div>

        {order.orderStatus === "Pending" && (
          <div className="mt-6 flex justify-end">
            <Button
              variant="destructive"
              onClick={() => setShowCancelDialog(true)}
              className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
            >
              Cancel Order
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderStatusTimeline;
