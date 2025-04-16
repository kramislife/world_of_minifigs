import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PAYMENT_METHODS } from "@/constant/paymentMethod";
import MasterCard from "@/assets/mastercard.svg";
import Visa from "@/assets/visa.png";
import Stripe from "@/assets/stripe.svg";
import PayPal from "@/assets/Paypal.png";
import CardSection from "./CardSection";
import PayPalSection from "./PayPalSection";
import { CreditCard } from "lucide-react";

const PaymentSection = ({
  paymentMethod,
  onPaymentMethodChange,
  total,
  email,
  selectedAddress,
  orderItems,
  orderNotes,
  onSubmit,
  handleStripeSuccess,
  onPayPalApprove,
}) => {
  const paymentMethods = [
    {
      // Stripe
      type: PAYMENT_METHODS.CREDIT_CARD,
      content: (
        <div className="flex items-center">
          <img src={MasterCard} alt="Credit Card" className="h-8 w-auto" />
          <img src={Visa} alt="Credit Card" className="h-8 w-auto" />
          <img src={Stripe} alt="Credit Card" className="h-6 w-auto" />
        </div>
      ),
      className: "bg-white",
    },
    {
      // PayPal
      type: PAYMENT_METHODS.PAYPAL,
      content: <img src={PayPal} alt="PayPal" className="h-20 w-auto" />,
      className: "bg-yellow-300",
    },
  ];

  // Payment button styles
  const getPaymentButtonStyles = (isSelected) => `
    w-full h-12 rounded-md transition-all duration-200 flex items-center justify-center
    ${
      isSelected
        ? "border-2 border-accent"
        : "border border-brand-end/50 hover:border-accent/50"
    }
  `;

  // Handle payment method change with preventDefault
  const handlePaymentMethodChange = (methodType, e) => {
    e.preventDefault(); // Prevent form submission
    onPaymentMethodChange(methodType);
  };

  return (
    <Card className="bg-brand-dark/20 border border-brand-end/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <CreditCard className="w-5 h-5 text-accent" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-6 px-3 md:px-5">
        <div className="grid grid-cols-2 gap-1 md:gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.type}
              onClick={(e) => handlePaymentMethodChange(method.type, e)}
              type="button" // Add type="button" to prevent form submission
              className={`${getPaymentButtonStyles(
                paymentMethod === method.type
              )} ${method.className}`}
            >
              {method.content}
            </button>
          ))}
        </div>

        {/* If the payment method is Stripe, show the CardSection component */}
        {paymentMethod === PAYMENT_METHODS.CREDIT_CARD ? (
          <CardSection
            total={total}
            email={email}
            selectedAddress={selectedAddress}
            orderItems={orderItems}
            orderNotes={orderNotes}
            onSubmit={onSubmit}
            handleStripeSuccess={handleStripeSuccess}
          />
        ) : (
          <PayPalSection
            total={total}
            email={email}
            selectedAddress={selectedAddress}
            orderItems={orderItems}
            orderNotes={orderNotes}
            onApprove={onPayPalApprove}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentSection;
