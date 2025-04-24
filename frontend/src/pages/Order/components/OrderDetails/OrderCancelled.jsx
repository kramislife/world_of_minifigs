import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { AlertTriangle } from "lucide-react"; // optional icon for visual enhancement

const OrderCancelled = ({ order }) => {
  const formattedDate = format(new Date(order.cancelledAt), "PPP 'at' p");

  return (
    <div className="relative">
      {/* Top colored border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-red-500 rounded-t-md" />

      <Card className="text-background">
        <CardContent className="pt-5">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <AlertTriangle
                className="text-red-400 w-5 h-5"
                aria-hidden="true"
              />
            </div>

            <div>
              <h3 className="text-md md:text-lg font-semibold">
                Order <span className="text-red-400">Cancelled</span> on{" "}
                {formattedDate}
              </h3>

              {order?.cancellationReason ? (
                <p className="mt-2 text-sm text-gray-300">
                  <strong>Reason:</strong> {order.cancellationReason}
                </p>
              ) : (
                <p className="mt-2 text-sm text-gray-300 italic">
                  No reason provided.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderCancelled;
