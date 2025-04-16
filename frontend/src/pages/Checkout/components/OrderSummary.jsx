import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useOrderSummary } from "@/hooks/Payment/useOrderSummary";
import CartItem from "@/components/layout/header/components/CartItem";

//  Used to display the total price of the order
const OrderTotal = ({ subtotal, total }) => (
  <div className="space-y-3 pt-4">
    <div className="flex justify-between text-gray-400 text-sm">
      <span>Subtotal</span>
      <span>${subtotal.toFixed(2)}</span>
    </div>

    <div className="flex justify-between text-white font-medium pt-5 border-t border-brand-end/50">
      <span>Total</span>
      <div>
        <span className="text-emerald-400 text-xl">${total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

const OrderSummary = ({ onOrderNotesChange, orderNotes }) => {
  const { displayItems, subtotal, displayTotal, handleQuantityUpdate } =
    useOrderSummary();

  if (!displayItems?.length) {
    return (
      <Card className="bg-brand-dark/20 border border-brand-end/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShoppingCart className="w-12 h-12 text-accent mb-4" />
          <p className="text-white text-center">No items to display</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-brand-dark/20 border border-brand-end/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <ShoppingCart className="w-5 h-5 text-accent" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 md:px-5">
        <div className="space-y-6">
          {/* Display Items */}
          <ul className="space-y-6">
            {displayItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                onQuantityUpdate={(productId, newQty) =>
                  handleQuantityUpdate(productId, newQty)
                }
              />
            ))}
          </ul>

          {/* Order Notes and Totals */}
          <div className="space-y-4">
            <Textarea
              placeholder="Add any special instructions or notes for your order..."
              value={orderNotes}
              onChange={(e) => onOrderNotesChange(e.target.value)}
              className="bg-transparent border-brand-end/50 min-h-[100px] text-white placeholder:text-white/50 focus-visible:ring-accent"
            />

            <OrderTotal subtotal={subtotal} total={displayTotal} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
