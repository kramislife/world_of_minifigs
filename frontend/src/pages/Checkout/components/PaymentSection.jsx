import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import CardSection from "./CardSection";
import PayPalSection from "./PayPalSection";
import {
  PAYMENT_METHODS,
  PAYMENT_METHOD_CONFIG,
} from "@/constant/paymentMethod";

const PaymentSection = ({
  paymentMethod,
  handlePaymentMethodChange,
  total,
  email,
  selectedAddress,
  orderItems,
  orderNotes,
  onSubmit,
  handleStripeSuccess,
  onPayPalApprove,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-background flex items-center gap-2 text-lg">
          <CreditCard className="w-5 h-5 text-accent" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-3 md:px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {PAYMENT_METHOD_CONFIG.map((method) => (
            <Button
              key={method.type}
              onClick={(e) => handlePaymentMethodChange(method.type, e)}
              type="button"
              variant={paymentMethod === method.type ? "accent" : "secondary"}
              className="hover:scale-100 transition-all duration-200"
            >
              <div className="flex items-center">
                {method.content.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className={image.className}
                  />
                ))}
              </div>
            </Button>
          ))}
        </div>

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
