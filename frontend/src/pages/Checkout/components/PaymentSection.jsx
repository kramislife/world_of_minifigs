import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  onSubmit,
  handleCardDetailsChange,
  cardDetails = {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  },
  onPayPalApprove,
}) => {
  const paymentMethods = [
    {
      type: PAYMENT_METHODS.CREDIT_CARD,
      content: (
        <div className="flex items-center gap-1">
          <img src={MasterCard} alt="Credit Card" className="h-8 w-auto" />
          <img src={Visa} alt="Credit Card" className="h-8 w-auto" />
          <img src={Stripe} alt="Credit Card" className="h-6 w-auto" />
        </div>
      ),
      className: "bg-white",
    },
    {
      type: PAYMENT_METHODS.PAYPAL,
      content: <img src={PayPal} alt="PayPal" className="h-20 w-auto" />,
      className: "bg-yellow-300",
    },
  ];

  const getPaymentButtonStyles = (isSelected) => `
    w-full h-10 rounded-md transition-all duration-200 flex items-center justify-center
    ${
      isSelected
        ? "ring-2 ring-blue-500"
        : "hover:border-blue-300 border border-white/10"
    }
  `;

  return (
    <Card className="bg-darkBrand/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <CreditCard className="w-5 h-5 text-blue-400" />
          Payment Details
        </CardTitle>
        <CardDescription className="text-gray-400 lg:ml-7">
          Select your preferred payment method
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.type}
              onClick={() => onPaymentMethodChange(method.type)}
              className={`${getPaymentButtonStyles(
                paymentMethod === method.type
              )} ${method.className}`}
            >
              {method.content}
            </button>
          ))}
        </div>

        {paymentMethod === PAYMENT_METHODS.CREDIT_CARD ? (
          <CardSection
            onSubmit={onSubmit}
            onCardDetailsChange={handleCardDetailsChange}
            cardDetails={cardDetails}
          />
        ) : (
          <PayPalSection
            onSubmit={onSubmit}
            onApprove={onPayPalApprove}
            total={total}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentSection;
