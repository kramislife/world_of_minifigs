import React, { useState } from "react";
import Metadata from "@/components/layout/Metadata/Metadata";
import CancelOrderDialog from "./components/OrderDetails/CancelOrderDialog";
import OrderHeader from "./components/OrderDetails/OrderHeader";
import OrderStatusTimeline from "./components/OrderDetails/OrderStatusTimeline";
import OrderCancelled from "./components/OrderDetails/OrderCancelled";
import CustomerItems from "./components/OrderDetails/CustomerItems";
import CustomerShipping from "./components/OrderDetails/CustomerShipping";
import Customer from "./components/OrderDetails/Customer";
import PaymentSummary from "./components/OrderDetails/PaymentSummary";
import OrderSkeleton from "@/components/layout/skeleton/Products/OrderSkeleton";
import { FallbackMessage } from "@/components/product/shared/FallbackStates";
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
    return <OrderSkeleton />;
  }

  if (errorDetails) {
    return (
      <FallbackMessage
        title="Error Loading Order"
        message="There was a problem loading the order details. Please try again later."
      />
    );
  }

  if (!orderDetails || Object.keys(orderDetails).length === 0) {
    return (
      <FallbackMessage
        title="Order Not Found"
        message="We couldn't find the order you're looking for. Please check your order ID and try again."
      />
    );
  }

  return (
    <>
      <Metadata title={`Order #${orderDetails._id}`} />
      <div className="px-5 py-8">
        <div className="space-y-5">
          <OrderHeader
            order={orderDetails}
            statusConfig={statusConfig}
            StatusIcon={StatusIcon}
            setShowCancelDialog={setShowCancelDialog}
          />

          {!isOrderCancelled && (
            <OrderStatusTimeline
              order={orderDetails}
              filteredOrderStatus={filteredOrderStatus}
            />
          )}

          {isOrderCancelled && <OrderCancelled order={orderDetails} />}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 space-y-3">
              <CustomerItems orderItems={orderDetails.orderItems} />
              <CustomerShipping
                shippingAddress={orderDetails.shippingAddress}
                orderNotes={orderDetails.orderNotes}
                shippingInfo={orderDetails.shippingInfo}
                orderStatus={orderDetails.orderStatus}
              />
            </div>

            <div className="space-y-3 lg:sticky lg:top-24 h-fit">
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
