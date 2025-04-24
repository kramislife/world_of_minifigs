import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const PaymentInfo = ({ paymentInfo, shippingPrice, taxPrice, totalPrice }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-background">
            Payment Summary
          </h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-300">
            <span>Method</span>
            <span className="font-medium text-background">
              {paymentInfo?.method}
            </span>
          </div>

          {paymentInfo?.method === "PayPal" && (
            <div className="flex justify-between text-gray-300">
              <span>Payer Email</span>
              <span className="text-sm text-background tracking-wide break-all">
                {paymentInfo?.payerEmail}
              </span>
            </div>
          )}

          <div className="flex justify-between text-gray-300">
            <span>Transaction ID</span>
            <span className="text-sm text-background tracking-wide font-mono">
              {paymentInfo?.transactionId}
            </span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>Status</span>
            <Badge
              variant={
                paymentInfo?.status === "Success" ? "success" : "destructive"
              }
            >
              {paymentInfo?.status}
            </Badge>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>Shipping</span>
            <span className="text-background">
              ${shippingPrice?.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>Tax</span>
            <span className="text-background">${taxPrice?.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>Subtotal</span>
            <span className="text-background">
              ${(totalPrice - (shippingPrice + taxPrice)).toFixed(2)}
            </span>
          </div>

          <div className="border-t border-brand-end/50 pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-background">Total</span>
              <span className="text-emerald-400">
                ${totalPrice?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentInfo;
