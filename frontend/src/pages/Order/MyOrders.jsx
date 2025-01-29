import React from "react";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import Metadata from "@/components/layout/Metadata/Metadata";

const MyOrders = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md bg-red-500/10 border-red-500/20">
          <CardContent className="pt-6">
            <div className="text-center text-red-400">
              Error loading orders: {error.message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    const icons = {
      processing: <Clock className="w-5 h-5" />,
      shipped: <Truck className="w-5 h-5" />,
      delivered: <CheckCircle2 className="w-5 h-5" />,
      cancelled: <AlertCircle className="w-5 h-5" />,
    };
    return icons[status.toLowerCase()] || <Package className="w-5 h-5" />;
  };

  const getStatusColor = (status) => {
    const statusColors = {
      processing: "text-yellow-400",
      shipped: "text-blue-400",
      delivered: "text-green-400",
      cancelled: "text-red-400",
    };
    return statusColors[status.toLowerCase()] || "text-gray-400";
  };

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (!data || !data.data || data.data.length === 0) {
    return (
      <>
        <Metadata title="My Orders" />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-white">My Orders</h1>
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center text-gray-400">
                You haven't placed any orders yet.
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Metadata title="My Orders" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-white">My Orders</h1>
        <div className="grid gap-6">
          {data.data.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="cursor-pointer"
              onClick={() => handleOrderClick(order._id)}
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
                      className={`px-4 py-2 rounded-full ${getStatusColor(
                        order.orderStatus
                      )} bg-gray-800/50`}
                    >
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.orderStatus)}
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
                      <p className="text-gray-300">
                        Items: {order.orderItems.length}
                      </p>
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
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
