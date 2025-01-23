import React, { useEffect, useState, useCallback, useRef } from "react";
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

// Stripe appearance customization
const appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#2563eb", // Your brand color
    colorDanger: "#dc203c", // Error color
    fontFamily: "'Poppins', sans-serif",
    spacingUnit: "4px", // Spacing on the input fields
    borderRadius: "4px", // Border radius on the input fields
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
      color: "#94a3b8",
    },
  },
};

const StripeForm = ({ onSubmit, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [processStripePayment] = useProcessStripePaymentMutation();

  // Add handler for when Elements is ready
  const handleReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!stripe || !elements || processing) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create payment intent when pay button is clicked
      const paymentResponse = await processStripePayment(total).unwrap();
      if (!paymentResponse.success || !paymentResponse.client_secret) {
        throw new Error("Failed to create payment intent");
      }

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: paymentResponse.client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
        redirect: "if_required",
      });

      if (error) {
        setError(error.message);
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        if (typeof onSubmit === "function") {
          await onSubmit({
            paymentMethod: "Stripe",
            transactionId: paymentIntent.id,
            status: "Success",
          });
        } else {
          console.error("onSubmit prop is not a function");
          toast.error("Error processing payment completion");
        }
      } else {
        setError("Your payment was not successful, please try again.");
      }
    } catch (error) {
      console.error("Payment submission error:", error);
      setError("An unexpected error occurred.");
      toast.error(error.data?.message || "Payment failed. Please try again.");
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

const StripeWrapper = ({ total, onSubmit }) => {
  const { data: stripeApiData } = useGetStripeApiKeyQuery();
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    if (stripeApiData?.stripeApiKey && !stripePromise) {
      setStripePromise(loadStripe(stripeApiData.stripeApiKey));
    }
  }, [stripeApiData]);

  if (!stripePromise) {
    return <div className="text-center py-4">Loading payment system...</div>;
  }

  if (!total || total <= 0) {
    return (
      <div className="flex flex-col items-center text-center space-y-3">
         <div className="w-16 h-16 border border-white/10 rounded-md flex items-center justify-center">
          <ArrowUpRight className="w-8 h-8 text-white/60" />
        </div>
        <p className="text-red-400 text-sm leading-loose">
          Please add items to your cart to proceed with payment
        </p>
      </div>
    );
  }

  const options = {
    mode: "payment",
    currency: "usd",
    amount: Math.round(total * 100),
    payment_method_types: ["card"],
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeForm onSubmit={onSubmit} total={total} />
    </Elements>
  );
};

export default StripeWrapper;
