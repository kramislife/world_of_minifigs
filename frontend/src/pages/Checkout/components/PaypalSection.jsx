import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

// Extract PayPal button styles
const PAYPAL_BUTTON_STYLES = {
  layout: "vertical",
  color: "blue",
  shape: "rect",
  label: "pay",
  height: 45,
};

// EmptyStateMessage component if no items in cart
const EmptyStateMessage = () => (
  <span className="text-red-400">
    Please add items to your cart to proceed with payment
  </span>
);

// PaymentInfo component if it has items in cart
const PaymentInfo = ({ total }) => (
  <>
    Complete your purchase securely with PayPal.
    <br />
    <span className="font-medium text-emerald-400">
      Total: ${total.toFixed(2)}
    </span>
  </>
);

// Shows EmptyStateMessage if no items in cart otherwise shows PaymentInfo
const HeaderSection = ({ total }) => (
  <div className="flex flex-col items-center text-center space-y-3">
    <div className="w-16 h-16 border border-white/10 rounded-md flex items-center justify-center">
      <ArrowUpRight className="w-8 h-8 text-white/60" />
    </div>
    <p className="text-gray-300 text-sm leading-loose">
      {total <= 0 ? <EmptyStateMessage /> : <PaymentInfo total={total} />}
    </p>
  </div>
);

// PayPalButtonContainer component
const PayPalButtonContainer = ({ isProcessing, children }) => (
  <div className="w-full h-full">
    {isProcessing ? (
      <div className="text-center text-gray-400">Processing payment...</div>
    ) : (
      children
    )}
  </div>
);

const PayPalSection = ({ onApprove, total }) => {
  const [{ isResolved }] = usePayPalScriptReducer();
  const [key, setKey] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [total]);

  const handleCreateOrder = async (data, actions) => {
    if (total <= 0) {
      toast.error("Invalid order amount");
      throw new Error("Invalid order amount");
    }

    try {
      console.log("Creating PayPal order...");
      const order = await actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total.toFixed(2),
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
        },
      });
      console.log("PayPal order created:", order);
      return order;
    } catch (error) {
      console.error("PayPal order creation failed:", error);
      toast.error("Failed to initialize payment");
      throw error;
    }
  };

  const handleApprove = async (data) => {
    if (isProcessing) {
      console.log("Already processing payment, skipping...");
      return;
    }

    try {
      setIsProcessing(true);
      console.log("Payment approved, processing order...");
      await onApprove(data);
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    console.log("Payment cancelled by user");
    toast.info("Payment cancelled");
    setIsProcessing(false);
  };

  const handleError = (err) => {
    console.error("PayPal error:", err);
    setIsProcessing(false);
  };

  const handleClick = (data, actions) => {
    if (isProcessing) {
      toast.info("Payment is already processing");
      return actions.reject();
    }
    if (total <= 0) {
      toast.error("Invalid order amount");
      return actions.reject();
    }
    return actions.resolve();
  };

  const paypalButtonProps = {
    style: PAYPAL_BUTTON_STYLES,
    forceReRender: [key, total],
    createOrder: handleCreateOrder,
    onApprove: handleApprove,
    onCancel: handleCancel,
    onError: handleError,
    onClick: handleClick,
    disabled: total <= 0 || isProcessing,
  };

  if (!isResolved) {
    return <div>Loading PayPal...</div>;
  }

  return (
    <div className="mt-4 space-y-4">
      <HeaderSection total={total} />
      <PayPalButtonContainer isProcessing={isProcessing}>
        <PayPalButtons key={key} {...paypalButtonProps} />
      </PayPalButtonContainer>
    </div>
  );
};

export default PayPalSection;
