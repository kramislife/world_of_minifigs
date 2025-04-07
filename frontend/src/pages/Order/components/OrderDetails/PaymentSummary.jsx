import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const PaymentSummary = ({
  paymentInfo,
  totalPrice,
  taxPrice,
  shippingPrice,
}) => {
  return (
    <Card className="bg-brand-dark/20 border border-brand-end/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Payment Summary</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-300">
            <span>Method</span>
            <span className="font-medium text-white">
              {paymentInfo?.method}
            </span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Subtotal</span>
            <span>${(totalPrice - (shippingPrice + taxPrice)).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Shipping</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Tax</span>
            <span>${taxPrice.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-700 pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-white">Total</span>
              <span className="text-emerald-400">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
