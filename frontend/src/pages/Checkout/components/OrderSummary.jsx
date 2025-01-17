import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";

const OrderSummary = ({ cartItems, total, updateQuantity, removeItem }) => {
  const handleQuantityUpdate = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  if (!cartItems?.length) {
    return (
      <Card className="bg-darkBrand/20 backdrop-blur-xl border-white/10">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-white text-center">Your cart is empty</p>
        </CardContent>
      </Card>
    );
  }

  const QuantityControl = ({ quantity, onUpdate }) => (
    <div className="flex items-center gap-2 border border-white/10 rounded-lg p-1">
      <button
        type="button"
        onClick={() => onUpdate(quantity - 1)}
        disabled={quantity <= 1}
        className="p-1 rounded-md hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus size={14} className="text-gray-400" />
      </button>
      <span className="text-sm text-gray-400 w-6 text-center">{quantity}</span>
      <button
        type="button"
        onClick={() => onUpdate(quantity + 1)}
        className="p-1 rounded-md hover:bg-white/10"
      >
        <Plus size={14} className="text-gray-400" />
      </button>
    </div>
  );

  return (
    <Card className="bg-darkBrand/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.product}
              className="flex gap-3 items-center pt-2 pb-5 border-b border-white/10 last:border-0"
            >
              <div className="relative w-24 h-24 bg-darkBrand rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex justify-between items-start">
                <div className="flex flex-col space-y-5">
                  <div>
                    <h3 className="text-white text-lg font-medium line-clamp-1">
                      {item.name}
                    </h3>
                    {item.includes && (
                      <p className="text-sm text-gray-400 mt-1">
                        {item.includes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <QuantityControl
                      quantity={item.quantity}
                      onUpdate={(newQty) =>
                        handleQuantityUpdate(item.product, newQty)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.product)}
                      className="p-1 rounded-md hover:bg-white/10 text-red-500 hover:text-red-400"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                {/* Price */}
                <span className="text-emerald-400">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}

          {/* Discount Input */}
          <div className="flex gap-2 pt-4">
            <input
              type="text"
              placeholder="Discount code or gift card"
              className="flex-1 bg-brand/10 border-white/10 border rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300 h-12 placeholder:text-white/80 font-extralight text-white"
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-500/30 text-white rounded-md text-sm hover:bg-blue-500/20 transition-colors"
            >
              Apply
            </button>
          </div>

          {/* Summary */}
          <div className="space-y-3 pt-4">
            <div className="flex justify-between text-gray-400 text-sm">
              <span>Subtotal</span>
              <span className="text-gray-400">${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-white font-medium pt-5 border-t border-white/10">
              <span>Total</span>
              <div>
                <span className="text-emerald-400 text-xl">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
