import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "@/redux/api/orderApi";
import { format } from "date-fns";
import {
  Package2,
  Truck,
  CreditCard,
  AlertCircle,
  BadgeCheck,
  User,
  Mail,
  Phone,
  StickyNote,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CancelOrderDialog from "./components/CancelOrderDialog";
import Metadata from "@/components/layout/Metadata/Metadata";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { orderStatus } from "@/constant/orderStatus";

const Order = () => {
  const { id } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(id);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
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
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Helper function to get status config
  const getStatusConfig = (status) => {
    return (
      orderStatus.find((s) => s.value === status) || {
        color: "text-gray-400",
        bgColor: "bg-gray-500/20",
        icon: AlertCircle,
      }
    );
  };

  return (
    <>
      <Metadata title={`Order #${order.data._id}`} />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="px-4 py-8"
      >
        <div className="space-y-6">
          {/* Order Header */}
          <Card className="bg-brand/80 border-gray-600/50">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-950 border border-blue-800">
                    {React.createElement(
                      getStatusConfig(order.data.orderStatus).icon,
                      {
                        className: `w-6 h-6 ${
                          getStatusConfig(order.data.orderStatus).color
                        }`,
                      }
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <CardTitle className="text-2xl font-bold text-white">
                        Order #{order.data._id}
                      </CardTitle>
                      <div
                        className={`px-3 py-1 rounded-full ${
                          getStatusConfig(order.data.orderStatus).bgColor
                        } border border-${getStatusConfig(
                          order.data.orderStatus
                        ).color.replace("text-", "")}/30`}
                      >
                        <span
                          className={`text-sm font-medium ${
                            getStatusConfig(order.data.orderStatus).color
                          }`}
                        >
                          {order.data.orderStatus}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Placed on {format(new Date(order.data.createdAt), "PPP")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400">
                    ${order.data.totalPrice.toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-400">
                    {order.data.orderItems.length}{" "}
                    {order.data.orderItems.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Status Timeline */}
          {order.data.orderStatus !== "Cancelled" && (
            <Card className="bg-brand/80 border-gray-600/50">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center relative">
                  <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-700 -z-10" />
                  {["Pending", "Processing", "Shipped", "Delivered"].map(
                    (step, index) => {
                      const isActive =
                        index <=
                        [
                          "Pending",
                          "Processing",
                          "Shipped",
                          "Delivered",
                        ].indexOf(order.data.orderStatus);
                      const stepConfig = getStatusConfig(step);
                      return (
                        <div
                          key={step}
                          className="flex flex-col items-center gap-2"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200
                          ${
                            isActive
                              ? `${stepConfig.bgColor} ${stepConfig.color}`
                              : "bg-gray-700 text-gray-400"
                          }`}
                          >
                            {React.createElement(stepConfig.icon, {
                              className: "w-5 h-5",
                            })}
                          </div>
                          <span
                            className={`text-sm ${
                              isActive ? stepConfig.color : "text-gray-400"
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>

                {order.data.orderStatus === "Pending" && (
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
          )}

          {/* Cancellation Information */}
          {order.data.orderStatus === "Cancelled" && (
            <Card
              className={`${
                getStatusConfig("Cancelled").bgColor
              } border-red-500/20`}
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
                      Cancelled on{" "}
                      {format(new Date(order.data.cancelledAt), "PPP")}
                    </p>
                    {order.data.cancellationReason && (
                      <p className="mt-2 text-gray-300">
                        Reason: {order.data.cancellationReason}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="bg-brand/80 border-gray-600/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Package2 className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">
                      Order Items
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.data.orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-medium">
                            {item.name}
                          </h4>
                          <div className="mt-2 space-y-1 text-sm text-gray-400">
                            <p>Color: {item.color}</p>
                            <p>Includes: {item.includes}</p>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-emerald-400">
                            ${(item.quantity * item.discountedPrice).toFixed(2)}
                          </p>
                          {item.price > item.discountedPrice && (
                            <p className="text-sm text-gray-400 line-through">
                              ${(item.quantity * item.price).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Details Sidebar */}
            <div className="space-y-6">
              {/* Customer Information */}
              <Card className="bg-brand/80 border-gray-600/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">
                      Customer Details
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-300">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{order.data.user.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{order.data.email}</span>
                    </div>
                    {order.data.user.phone && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{order.data.user.phone}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card className="bg-brand/80 border-gray-600/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">
                      Shipping Details
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-gray-300">
                    <p>{order.data.shippingAddress.address_line1}</p>
                    {order.data.shippingAddress.address_line2 && (
                      <p>{order.data.shippingAddress.address_line2}</p>
                    )}
                    <p>
                      {order.data.shippingAddress.city},{" "}
                      {order.data.shippingAddress.state}{" "}
                      {order.data.shippingAddress.postal_code}
                    </p>
                    <p>{order.data.shippingAddress.country}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="bg-brand/80 border-gray-600/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">
                      Payment Summary
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span>
                        $
                        {(
                          order.data.totalPrice -
                          order.data.taxPrice -
                          order.data.shippingPrice
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span>${order.data.shippingPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Tax</span>
                      <span>${order.data.taxPrice.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-emerald-400">
                          ${order.data.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Notes if any */}
              {order.data.orderNotes && (
                <Card className="bg-brand/80 border-gray-600/50">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <StickyNote className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">
                        Order Notes
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{order.data.orderNotes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        <CancelOrderDialog
          open={showCancelDialog}
          onOpenChange={setShowCancelDialog}
          orderId={order.data._id}
        />
      </motion.div>
    </>
  );
};

export default Order;
