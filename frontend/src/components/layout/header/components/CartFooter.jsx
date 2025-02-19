import { ShoppingCart, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartFooter = ({
  total,
  onCheckout,
  showLoginMessage,
  checkoutDisabled,
  isAuthenticated,
  hasOutOfStockItems,
}) => (
  <div className="sticky bottom-0 px-6 py-5 bg-brand border-t border-white/10">
    <div className="flex justify-between items-center mb-4">
      <span className="text-gray-400">Total</span>
      <span className="text-emerald-400 text-xl font-semibold">
        ${total.toFixed(2)}
      </span>
    </div>

    <div className="space-y-5">
      {hasOutOfStockItems && (
        <div className="flex items-center gap-2">
          <TriangleAlert className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-sm text-red-400">
            Some items are out of stock. Please remove them to proceed.
          </p>
        </div>
      )}
      <Button
        className="w-full flex items-center justify-center gap-2 transition-all duration-200 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onCheckout}
        disabled={checkoutDisabled || hasOutOfStockItems}
      >
        <ShoppingCart size={18} />
        {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
      </Button>
      {showLoginMessage && !isAuthenticated && (
        <p className="text-right text-sm animate-fade-in text-blue-400">
          Please login to proceed with checkout
        </p>
      )}
    </div>
  </div>
);

export default CartFooter;
