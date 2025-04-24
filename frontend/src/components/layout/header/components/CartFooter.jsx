import { ShoppingCart, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartFooter = ({
  total,
  onCheckout,
  checkoutDisabled,
  isAuthenticated,
  hasOutOfStockItems,
}) => (
  <div className="sticky bottom-0 border-t border-brand-end/50 px-5 py-3">
    <div className="flex justify-between items-center mb-2">
      <span className="text-gray-200">Total</span>
      <span className="text-emerald-400 text-xl font-semibold">
        ${total.toFixed(2)}
      </span>
    </div>

    <div>
      {hasOutOfStockItems && (
        <div className="flex items-start gap-2 pb-5 text-red-400">
          <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-sm">
            Some items are out of stock. Please remove them to proceed.
          </p>
        </div>
      )}
      <Button
        variant="accent"
        onClick={onCheckout}
        disabled={checkoutDisabled || hasOutOfStockItems}
        className="w-full"
      >
        <ShoppingCart size={18} />
        {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
      </Button>
    </div>
  </div>
);

export default CartFooter;
