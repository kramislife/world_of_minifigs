import React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Package2 } from "lucide-react";
import { orderStatus } from "@/constant/orderStatus";

const OrderCard = ({ order, onClick }) => {
  const status = orderStatus.find((s) => s.value === order.orderStatus);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="cursor-pointer"
      onClick={() => onClick(order._id)}
    >
      <Card className="bg-brand/80 border-gray-600/50 hover:border-gray-500/50 transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-950 border border-blue-800">
                <Package2 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold text-white">
                  #{order._id}
                </CardTitle>
                <p className="text-xs text-gray-400">
                  {format(new Date(order.createdAt), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
            <div
              className={`px-3 py-1.5 rounded-full ${status?.color} ${status?.bgColor} border border-gray-600/50`}
            >
              <div className="flex items-center gap-1.5">
                {status?.icon && <status.icon className="w-4 h-4" />}
                <span className="text-sm font-medium">{order.orderStatus}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Items</p>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-950 border border-blue-800">
                  <Package className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-sm text-white">
                  {order.orderItems.length}{" "}
                  {order.orderItems.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 mb-1">Total Amount</p>
              <p className="text-xl font-bold text-emerald-400">
                ${order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderCard;
