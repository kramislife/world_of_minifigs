import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "@/redux/api/orderApi";
import { format } from "date-fns";
import {
  Loader2,
  Package,
  Truck,
  CreditCard,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CancelOrderDialog from "./components/CancelOrderDialog";

const Order = () => {
  const { id } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(id);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

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
              Error loading order: {error.message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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

  const getStatusIcon = (status) => {
    const icons = {
      processing: <Clock className="w-5 h-5" />,
      shipped: <Truck className="w-5 h-5" />,
      delivered: <CheckCircle2 className="w-5 h-5" />,
      cancelled: <AlertCircle className="w-5 h-5" />,
    };
    return icons[status.toLowerCase()] || <Package className="w-5 h-5" />;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      <div className="space-y-8">
        {/* Order Status Timeline */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center relative">
              <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-700 -z-10" />
              {["Confirmed", "Processing", "Shipped", "Delivered"].map(
                (step, index) => (
                  <div key={step} className="flex flex-col items-center gap-2">
                    <div
                      className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${
                      index <=
                      [
                        "confirmed",
                        "processing",
                        "shipped",
                        "delivered",
                      ].indexOf(order.data.orderStatus.toLowerCase())
                        ? "bg-emerald-400"
                        : "bg-gray-700"
                    }
                  `}
                    >
                      <BadgeCheck className="w-5 h-5 text-gray-900" />
                    </div>
                    <span className="text-sm text-gray-400">{step}</span>
                  </div>
                )
              )}
            </div>

            {order.data.orderStatus.toLowerCase() === "pending" && (
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

        {/* Order Header - enhanced */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 text-emerald-400" />
                <CardTitle className="text-2xl font-bold text-white">
                  Order #{order.data._id}
                </CardTitle>
              </div>
              <div
                className={`px-4 py-2 rounded-full ${getStatusColor(
                  order.data.orderStatus
                )} bg-gray-800/50`}
              >
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.data.orderStatus)}
                  <span>{order.data.orderStatus}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Payment: {order.data.paymentInfo.method}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Status: {order.data.orderStatus}</span>
                </div>
                <p className="text-gray-400">
                  Ordered on {format(new Date(order.data.createdAt), "PPP")}
                </p>
              </div>
              <div className="text-right space-y-2">
                <p className="text-gray-300">
                  Items: {order.data.orderItems.length}
                </p>
                <p className="text-2xl font-bold text-emerald-400">
                  ${order.data.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items - enhanced */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-400" />
            Order Items
          </h2>
          <div className="space-y-4">
            {order?.data?.orderItems?.map((item, index) => (
              <motion.div
                key={item?._id || index}
                variants={itemVariants}
                className="group flex items-center gap-6 p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200 border border-gray-700/50"
              >
                <div className="relative">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-32 h-32 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                    {item?.quantity || 0}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-white font-medium text-lg">
                    {item?.name || "Unnamed Item"}
                  </h3>
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-400">
                      SKU: {item?._id || "N/A"}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-400">
                      ${(item?.price || 0).toFixed(2)} per item
                    </span>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(
                      item?.status || "pending"
                    )} bg-gray-800/50`}
                  >
                    {getStatusIcon(item?.status || "pending")}
                    <span>{item?.status || "Pending"}</span>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-lg font-semibold text-emerald-400">
                    ${((item?.quantity || 0) * (item?.discountedPrice || 0)).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">
                    Qty: {item?.quantity || 0}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              Shipping Information
            </h2>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-gray-300">
                    {order.data.shippingAddress.street}
                  </p>
                  <p className="text-gray-300">
                    {order.data.shippingAddress.city},{" "}
                    {order.data.shippingAddress.state}{" "}
                    {order.data.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-300">
                    {order.data.shippingAddress.country}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              Order Summary
            </h2>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${order.data.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>${order.data.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>${order.data.taxPrice.toFixed(2)}</span>
                </div>
                {order.data.discountPrice > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-${order.data.discountPrice.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${order.data.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <CancelOrderDialog
          open={showCancelDialog}
          onOpenChange={setShowCancelDialog}
          orderId={order.data._id}
        />
      </div>
    </motion.div>
  );
};

export default Order;
