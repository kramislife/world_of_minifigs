import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useUpdateOrderAdminMutation } from "@/redux/api/orderApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import OrderItems from "./components/OrderItems";
import ShippingDetails from "./components/ShippingDetails";
import OrderStatus from "./components/OrderStatus";
import CustomerInfo from "./components/CustomerInfo";
import PaymentInfo from "./components/PaymentInfo";

const OrderDetailsDialog = ({ isOpen, onClose, order }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updateOrder, { isLoading }] = useUpdateOrderAdminMutation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.orderStatus);
    }
  }, [order]);

  const handleStatusUpdate = async () => {
    try {
      await updateOrder({
        id: order._id,
        orderData: { orderStatus: selectedStatus },
      }).unwrap();
      toast.success("Order status updated successfully");
      setSelectedStatus(selectedStatus);
    } catch (error) {
      toast.error(error.data?.message || "Failed to update order status");
    }
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto scrollbar-none bg-brand-gradient border border-gray-800 rounded-xl py-10 px-6">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between border-b border-gray-500/50 pb-5">
              <div className="space-y-1.5">
                <span className="text-sm font-medium text-gray-400">Order ID</span>
                <p className="text-lg font-bold text-white font-mono">
                  #{order._id}
                </p>
              </div>
              <div className="space-y-1.5 text-left">
                <span className="text-sm font-medium text-gray-400">
                  Order Date
                </span>
                <p className="text-lg font-bold text-white">
                  {format(new Date(order.createdAt), "PPP")}
                </p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <div className="lg:col-span-2 space-y-5">
            <OrderItems orderItems={order.orderItems} />
            <ShippingDetails shippingAddress={order.shippingAddress} />
          </div>

          <div className="space-y-5">
            <OrderStatus
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              order={order}
              user={user}
              handleStatusUpdate={handleStatusUpdate}
              isLoading={isLoading}
            />
            <CustomerInfo user={order.user} email={order.email} />
            <PaymentInfo
              paymentInfo={order.paymentInfo}
              shippingPrice={order.shippingPrice}
              taxPrice={order.taxPrice}
              totalPrice={order.totalPrice}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;