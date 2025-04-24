import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const OrderStatusTimeline = ({ order, filteredOrderStatus }) => {
  return (
    <Card >
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
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
                    ? `bg-brand-dark/50 ${step.color}`
                    : "bg-brand-dark/50 text-gray-400"
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
      </CardContent>
    </Card>
  );
};

export default OrderStatusTimeline;
