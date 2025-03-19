import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Metadata from "@/components/layout/Metadata/Metadata";
import CancelOrderDialog from "./components/OrderDetails/CancelOrderDialog";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import OrderHeader from "./components/OrderDetails/OrderHeader";
import OrderStatusTimeline from "./components/OrderDetails/OrderStatusTimeline";
import OrderCancelled from "./components/OrderDetails/OrderCancelled";
import CustomerItems from "./components/OrderDetails/CustomerItems";
import CustomerShipping from "./components/OrderDetails/CustomerShipping";
import Customer from "./components/OrderDetails/Customer";
import PaymentSummary from "./components/OrderDetails/PaymentSummary";
import { useOrders } from "@/hooks/Order/useOrders";

const Order = () => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const {
    orderDetails,
    isLoadingDetails,
    errorDetails,
    statusConfig,
    StatusIcon,
    isOrderCancelled,
    filteredOrderStatus,
    selectedReasons,
    otherReason,
    isProcessingRefund,
    handleReasonChange,
    handleCancelOrder,
    setOtherReason,
    isOtherSelected,
    isCancelButtonDisabled,
  } = useOrders();

  if (isLoadingDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (errorDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md bg-red-500/10 border-red-500/20">
          <CardContent className="pt-6">
            <div className="text-center text-red-400">
              Error loading order: {errorDetails.message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Metadata title={`Order #${orderDetails._id}`} />
      <div className="px-4 py-8">
        <div className="space-y-6">
          <OrderHeader
            order={orderDetails}
            statusConfig={statusConfig}
            StatusIcon={StatusIcon}
          />

          {!isOrderCancelled && (
            <OrderStatusTimeline
              order={orderDetails}
              filteredOrderStatus={filteredOrderStatus}
              setShowCancelDialog={setShowCancelDialog}
            />
          )}

          {isOrderCancelled && (
            <OrderCancelled
              order={orderDetails}
              getStatusConfig={getStatusConfig}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <CustomerItems orderItems={orderDetails.orderItems} />
              <CustomerShipping
                shippingAddress={orderDetails.shippingAddress}
                orderNotes={orderDetails.orderNotes}
              />
            </div>

            <div className="space-y-6">
              <Customer user={orderDetails.user} />
              <PaymentSummary
                paymentInfo={orderDetails.paymentInfo}
                totalPrice={orderDetails.totalPrice}
                taxPrice={orderDetails.taxPrice}
                shippingPrice={orderDetails.shippingPrice}
              />
            </div>
          </div>
        </div>

        <CancelOrderDialog
          open={showCancelDialog}
          onOpenChange={setShowCancelDialog}
          orderId={orderDetails._id}
          selectedReasons={selectedReasons}
          otherReason={otherReason}
          isProcessingRefund={isProcessingRefund}
          handleReasonChange={handleReasonChange}
          handleCancelOrder={handleCancelOrder}
          setOtherReason={setOtherReason}
          isOtherSelected={isOtherSelected}
          isCancelButtonDisabled={isCancelButtonDisabled}
        />
      </div>
    </>
  );
};

export default Order;
