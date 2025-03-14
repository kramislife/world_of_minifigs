import React, { useEffect, useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import {
  useProcessStripePaymentMutation,
  useGetStripeApiKeyQuery,
} from "@/redux/api/checkoutApi";
import { toast } from "react-toastify";
import { ArrowUpRight } from "lucide-react";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cartSlice";
import { useCheckout } from "@/hooks/Payment/useCheckout";

// Extract Stripe appearance configuration
const STRIPE_APPEARANCE = {
  theme: "stripe",
  variables: {
    colorPrimary: "#2563eb",
    colorDanger: "#dc203c",
    fontFamily: "'Poppins', sans-serif",
    spacingUnit: "4px",
    borderRadius: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid #334155",
      boxShadow: "none",
    },
    ".Input:focus": {
      border: "1px solid #2563eb",
    },
    ".Label": {
      color: "#d2d9e2",
      padding: "0px 0px 3px 3px",
    },
  },
};

// Extract EmptyStateMessage component
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

// Extract StripeForm component with payment processing logic
const StripeForm = ({
  total,
  email,
  selectedAddress,
  orderItems,
  orderNotes,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [processStripePayment] = useProcessStripePaymentMutation();
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const { createOrderData } = useCheckout();

  // Get user from Redux store
  const { user } = useSelector((state) => state.auth);

  const handleReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!stripe || !elements || processing) return;

    // Validate required fields
    if (!email || !selectedAddress || !orderItems?.length || !user) {
      toast.error(
        "Please fill in all required fields and ensure you're logged in"
      );
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // First create payment intent
      const paymentResponse = await processStripePayment(total).unwrap();

      if (!paymentResponse.success || !paymentResponse.client_secret) {
        throw new Error("Failed to create payment intent");
      }

      // Submit the payment form
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: paymentResponse.client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
        redirect: "if_required",
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          method: "Stripe",
          transactionId: paymentIntent.id,
          status: "Success",
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
          // Clear the cart after successful order
          dispatch(clearCart());
          toast.success("Order placed successfully!");
          navigate(`/order/${response.order._id}`);
        } else {
          throw new Error("Failed to create order");
        }
      } else {
        throw new Error("Payment was not successful");
      }
    } catch (error) {
      console.error("Payment/Order error:", error);
      setError(
        error.data?.message || error.message || "An unexpected error occurred"
      );
      toast.error(
        error.data?.message ||
          error.message ||
          "Payment failed. Please try again."
      );

      console.log("Order Items Structure:", orderItems);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-md border-white/10">
        <PaymentElement onReady={handleReady} />
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {isReady && (
        <Button
          onClick={handlePaymentSubmit}
          disabled={processing || !stripe || !elements}
          className="w-full bg-blue-500 hover:bg-blue-600"
          type="button"
        >
          {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
        </Button>
      )}
    </div>
  );
};

// Main StripeWrapper component
const CardSection = ({
  total,
  email,
  selectedAddress,
  orderItems,
  orderNotes,
}) => {
  const { data: stripeApiData } = useGetStripeApiKeyQuery();
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    if (stripeApiData?.stripeApiKey && !stripePromise) {
      setStripePromise(loadStripe(stripeApiData.stripeApiKey));
    }
  }, [stripeApiData, stripePromise]);

  if (!stripePromise) {
    return <div className="text-center py-4">Loading payment system...</div>;
  }

  if (!total || total <= 0) {
    return <EmptyStateMessage />;
  }

  const options = {
    mode: "payment",
    currency: "usd",
    amount: Math.round(total * 100),
    payment_method_types: ["card"],
    appearance: STRIPE_APPEARANCE,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeForm
        total={total}
        email={email}
        selectedAddress={selectedAddress}
        orderItems={orderItems}
        orderNotes={orderNotes}
      />
    </Elements>
  );
};

export default CardSection;
