import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const PayPalSection = ({  onApprove, total }) => {
  const [{ isResolved }] = usePayPalScriptReducer();
  const [key, setKey] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [total]);

  const paypalButtonTransactionProps = {
    style: {
      layout: "vertical",
      color: "blue",
      shape: "rect",
      label: "pay",
      height: 45,
    },
    forceReRender: [key, total],
    createOrder: async (data, actions) => {
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
    },
    onApprove: async (data) => {
      if (isProcessing) {
        console.log("Already processing payment, skipping...");
        return;
      }

      try {
        setIsProcessing(true);
        console.log("Payment approved, processing order...");

        // Process the order with your backend
        await onApprove(data);
      } catch (error) {
        console.error("Payment processing error:", error);
        toast.error("Payment failed. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    },
    onCancel: () => {
      console.log("Payment cancelled by user");
      toast.info("Payment cancelled");
      setIsProcessing(false);
    },
    onError: (err) => {
      console.error("PayPal error:", err);
      setIsProcessing(false);
    },
    onClick: (data, actions) => {
      if (isProcessing) {
        toast.info("Payment is already processing");
        return actions.reject();
      }
      if (total <= 0) {
        toast.error("Invalid order amount");
        return actions.reject();
      }
      return actions.resolve();
    },
    disabled: total <= 0 || isProcessing,
  };

  if (!isResolved) {
    return <div>Loading PayPal...</div>;
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-16 h-16 border border-white/10 rounded-md flex items-center justify-center">
          <ArrowUpRight className="w-8 h-8 text-white/60" />
        </div>
        <p className="text-gray-300 text-sm leading-loose">
          {total <= 0 ? (
            <span className="text-red-400">
              Please add items to your cart to proceed with payment
            </span>
          ) : (
            <>
              Complete your purchase securely with PayPal.
              <br />
              <span className="font-medium text-emerald-400">
                Total: ${total.toFixed(2)}
              </span>
            </>
          )}
        </p>
      </div>

      <div className="w-full h-full">
        {isProcessing ? (
          <div className="text-center text-gray-400">Processing payment...</div>
        ) : (
          <PayPalButtons key={key} {...paypalButtonTransactionProps} />
        )}
      </div>
    </div>
  );
};

export default PayPalSection;
