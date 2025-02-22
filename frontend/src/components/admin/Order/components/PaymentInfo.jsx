import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PaymentInfo = ({ paymentInfo, shippingPrice, taxPrice, totalPrice }) => {
  return (
    <div className="bg-brand/80 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-6 h-6 text-yellow-500" />
        <h3 className="text-lg font-semibold text-white">Payment</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Method</span>
          <span className="font-medium text-white">{paymentInfo?.method}</span>
        </div>
        {paymentInfo?.method === "PayPal" && (
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Payer Email</span>
            <span className="text-sm text-white tracking-wide break-all">
              {paymentInfo?.payerEmail}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Transaction ID</span>
          <span className="text-sm text-white tracking-wide font-mono">
            {paymentInfo?.transactionId}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Status</span>
          <Badge
            variant={
              paymentInfo?.status === "Success" ? "success" : "destructive"
            }
          >
            {paymentInfo?.status}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Shipping</span>
          <span className="font-medium text-white">
            ${shippingPrice?.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Tax</span>
          <span className="font-medium text-white">
            ${taxPrice?.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center border-t border-gray-700 pt-4 mt-4">
          <span className="text-gray-400">Subtotal</span>
          <span className="font-medium text-white">
            ${(totalPrice - (shippingPrice + taxPrice)).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-white">Total</span>
          <span className="font-semibold text-xl text-emerald-400">
            ${totalPrice?.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
