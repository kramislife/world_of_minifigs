import React, { useState, useEffect } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cartSlice";
import { useCheckout } from "@/hooks/Payment/useCheckout";

// Extract PayPal button styles
const PAYPAL_BUTTON_STYLES = {
  layout: "vertical",
  color: "blue",
  shape: "rect",
  label: "pay",
  height: 45,
};

// EmptyStateMessage component
const EmptyStateMessage = () => (
  <div className="flex flex-col items-center text-center space-y-3">
    <div className="w-16 h-16 border border-white/10 rounded-md flex items-center justify-center">
      <ArrowUpRight className="w-8 h-8 text-white/60" />
    </div>
    <p className="text-red-400 text-sm leading-loose">
      Please add items to your cart to proceed with payment
    </p>
  </div>
);

// Processing Overlay component
const ProcessingOverlay = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center space-y-4">
      <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
      <p className="text-white">Processing your payment...</p>
      <p className="text-sm text-gray-400">Please don't close this window</p>
    </div>
  </div>
);

const PayPalSection = ({
  total,
  email,
  selectedAddress,
  orderItems,
  orderNotes,
  onApprove: onApproveCallback,
}) => {
  const [{ isResolved, isPending }] = usePayPalScriptReducer();
  const [key, setKey] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paypalWindowOpen, setPaypalWindowOpen] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { createOrderData } = useCheckout();

  // Reset states when total changes
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
    setError(null);
    setPaypalWindowOpen(false);
    setIsProcessing(false);
  }, [total]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Prevent window close during processing
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isProcessing || paypalWindowOpen) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isProcessing, paypalWindowOpen]);

  const validateFields = () => {
    if (!email || !selectedAddress || !orderItems?.length || !user) {
      const errorMsg =
        "Please fill in all required fields and ensure you're logged in";
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }
    if (total <= 0) {
      const errorMsg = "Invalid order amount";
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }
    return true;
  };

  const handleCreateOrder = async (data, actions) => {
    setError(null);
    if (!validateFields()) {
      return actions.reject();
    }

    setPaypalWindowOpen(true);
    try {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total.toFixed(2),
            },
            description: `Order for ${email}`,
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
          brand_name: "World of Minifigs",
        },
      });
    } catch (error) {
      setPaypalWindowOpen(false);
      const errorMsg = "Failed to initialize PayPal payment";
      setError(errorMsg);
      toast.error(errorMsg);
      return actions.reject();
    }
  };

  const handleApprove = async (data, actions) => {
    if (isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      const details = await actions.order.capture();

      if (details.status !== "COMPLETED") {
        throw new Error("Payment not completed");
      }

      const paymentInfo = {
        method: "PayPal",
        transactionId: details.purchase_units[0].payments.captures[0].id,
        paypalOrderId: details.id,
        status: "Success",
        payerEmail: details.payer.email_address,
        paidAt: new Date().toISOString(),
      };

      const orderData = createOrderData(
        paymentInfo,
        total,
        orderItems,
        email,
        selectedAddress,
        orderNotes,
        user
      );

      const response = await createOrder(orderData).unwrap();

      if (response.success) {
        if (onApproveCallback) {
          onApproveCallback(response);
        }
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        navigate(`/order/${response.order._id}`);
      } else {
        throw new Error(response.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Payment/Order error:", error);
      const errorMsg =
        error.data?.message ||
        error.message ||
        "Payment failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsProcessing(false);
      setPaypalWindowOpen(false);
    }
  };

  const handleError = (err) => {
    console.error("PayPal error:", err);
    setPaypalWindowOpen(false);
    const errorMsg =
      err.message === "Window closed before response"
        ? "Payment window was closed. Please try again."
        : "";
    setError(errorMsg);
    toast.error(errorMsg);
    setIsProcessing(false);
  };

  const handleCancel = () => {
    setPaypalWindowOpen(false);
    setError("Payment cancelled");
    toast.info("Payment cancelled");
    setIsProcessing(false);
  };

  if (!isResolved || isPending) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!total || total <= 0) {
    return <EmptyStateMessage />;
  }

  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-gray-400 py-2">
        Complete your purchase securely with PayPal
        <br />
        <h4 className="font-medium text-emerald-400 mt-2">
          Total: ${total.toFixed(2)}
        </h4>
      </div>
      {isProcessing || paypalWindowOpen}
      <div className="p-4 border rounded-md border-white/10">
        <PayPalButtons
          key={key}
          style={PAYPAL_BUTTON_STYLES}
          createOrder={handleCreateOrder}
          onApprove={handleApprove}
          onCancel={handleCancel}
          onError={handleError}
          disabled={isProcessing}
          forceReRender={[key, total]}
        />
      </div>
    </div>
  );
};

export default PayPalSection;
