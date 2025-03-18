import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";

const OrderCancelled = ({ order, getStatusConfig }) => {
  return (
    <Card
      className={`${getStatusConfig("Cancelled").bgColor} border-red-500/20`}
    >
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-red-500/20">
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-1">
              Order Cancelled
            </h3>
            <p className="text-gray-400">
              Cancelled on {format(new Date(order.cancelledAt), "PPP")}
            </p>
            {order.cancellationReason && (
              <p className="mt-2 text-gray-300">
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
