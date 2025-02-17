import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PaymentInfo = ({ paymentInfo, shippingPrice, taxPrice, totalPrice }) => {
  return (
    <div className="bg-brand/80 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-white">Payment</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Method</span>
          <span className="font-medium text-white">{paymentInfo?.method}</span>
        </div>
        {paymentInfo?.transactionId && (
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Transaction ID</span>
            <span className="text-xs text-white tracking-wide">
              {paymentInfo.transactionId}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Status</span>
          <Badge
            variant={paymentInfo?.status === "Success" ? "success" : "destructive"}
          >
            {paymentInfo?.status}
          </Badge>
        </div>
        <div className="border-t border-gray-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Shipping</span>
            <span className="font-medium text-white">
              ${shippingPrice?.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">Tax</span>
            <span className="font-medium text-white">
              ${taxPrice?.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 py-5">
            <span className="text-gray-400">Subtotal</span>
            <span className="font-medium text-white">
              ${totalPrice?.toFixed(2)}
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
    </div>
  );
};

export default PaymentInfo;