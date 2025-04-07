import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";

const OrderCancelled = ({ order, getStatusConfig }) => {
  return (
    <Card className="bg-brand-dark/20 border-brand-end/50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          
          <div>
            <h3 className="sm:text-lg md:text-xl text-red-400 mb-1">
              Order Cancelled
            </h3>
            <p className="sm:text-xs md:text-md text-gray-400">
              Cancelled on {format(new Date(order.cancelledAt), "PPP")}
            </p>
            {order.cancellationReason && (
              <p className="mt-2 text-gray-100">
                Reason: {order.cancellationReason}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCancelled;
