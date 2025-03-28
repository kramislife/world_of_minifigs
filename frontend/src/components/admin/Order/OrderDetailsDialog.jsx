import React, { useState, useEffect, useMemo } from "react";
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
  const [shippingInfo, setShippingInfo] = useState({
    courier: "",
    trackingNumber: "",
    trackingLink: "",
    additionalInfo: "",
  });

  // Memoized formatted date
  const formattedDate = useMemo(() => {
    if (!order?.createdAt) return "";
    return format(new Date(order.createdAt), "PPP");
  }, [order?.createdAt]);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.orderStatus);
    }
  }, [order]);

  const handleShippingInfoChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.id]: e.target.value,
    });
  };

  const handleStatusUpdate = async () => {
    // Only include shipping info if status is being changed to "Shipped"
    const updateData = {
      orderStatus: selectedStatus,
      ...(selectedStatus === "Shipped" && { shippingInfo }),
    };

    if (!order || updateData.orderStatus === order.orderStatus) {
      toast.info("No changes made to order status");
      return;
    }

    try {
      const result = await updateOrder({
        id: order._id,
        orderData: updateData,
      }).unwrap();

      if (result.success) {
        toast.success(`Order status updated to ${updateData.orderStatus}`);
        onClose();
      } else {
        throw new Error(result.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.data?.message || "Failed to update order status");
      setSelectedStatus(order.orderStatus);
    }
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto scrollbar-none bg-brand-gradient border border-gray-800 rounded-xl py-10 px-5">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between border-b border-gray-500/50 pb-4">
              <div className="space-y-1">
                <span className="text-sm font-medium text-gray-400">
                  Order ID
                </span>
                <p className="text-lg font-bold text-white font-mono">
                  #{order._id}
                </p>
              </div>
              <div className="space-y-1 text-left">
                <span className="text-sm font-medium text-gray-400">
                  Order Date
                </span>
                <p className="text-lg font-bold text-white">{formattedDate}</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">
          <div className="lg:col-span-3 space-y-4">
            <OrderItems orderItems={order.orderItems} />
            <ShippingDetails
              shippingAddress={order.shippingAddress}
              orderNotes={order.orderNotes}
              shippingInfo={order.shippingInfo}
              orderStatus={order.orderStatus}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-0 space-y-4">
              <OrderStatus
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                order={order}
                user={user}
                handleStatusUpdate={handleStatusUpdate}
                isLoading={isLoading}
                shippingInfo={shippingInfo}
                handleShippingInfoChange={handleShippingInfoChange}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
