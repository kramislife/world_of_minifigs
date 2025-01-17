import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "@/redux/api/orderApi";
import { format } from "date-fns";
import { Loader2, Package, Truck, CreditCard, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Order = () => {
  const { id } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(id);

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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8 max-w-6xl"
    >
      <div className="space-y-8">
        {/* Order Header */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6 text-emerald-400" />
              <CardTitle className="text-2xl font-bold text-white">
                Order #{order.data._id}
              </CardTitle>
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

        {/* Order Items */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-400" />
            Order Items
          </h2>
          <div className="space-y-4">
            {order.data.orderItems.map((item, index) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                className="group flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium text-lg">{item.name}</h3>
                  <p className="text-gray-400">
                    ${item.price.toFixed(2)} per item
                  </p>
                  <p className="text-sm text-emerald-400/80">
                    Status: {item.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-emerald-400">
                    ${(item.quantity * item.price).toFixed(2)}
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
                  <span>${order.data.itemsPrice.toFixed(2)}</span>
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
      </div>
    </motion.div>
  );
};

export default Order;