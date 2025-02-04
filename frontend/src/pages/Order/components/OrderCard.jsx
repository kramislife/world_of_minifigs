import React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { orderStatus } from "@/constant/orderStatus";

const OrderCard = ({ order, onClick }) => {
  const status = orderStatus.find(
    (s) => s.value === order.orderStatus
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cursor-pointer"
      onClick={() => onClick(order._id)}
    >
      <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6 text-emerald-400" />
              <CardTitle className="text-xl font-bold text-white">
                Order #{order._id}
              </CardTitle>
            </div>
            <div
              className={`px-4 py-2 rounded-full ${status?.color} ${status?.bgColor}`}
            >
              <div className="flex items-center gap-2">
                {status?.icon && <status.icon />}
                <span>{order.orderStatus}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-400">
                Ordered on {format(new Date(order.createdAt), "PPP")}
              </p>
              <p className="text-gray-300">Items: {order.orderItems.length}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-400">
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