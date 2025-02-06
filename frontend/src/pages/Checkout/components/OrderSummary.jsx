import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

//  Used to update the quantity of the item in the cart (Below Product Name)
const QuantityControl = ({ quantity, onUpdate, maxStock }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    
    if (maxStock && newQuantity > maxStock) {
      toast.error(`Only ${maxStock} items available in stock`);
      return;
    }

    onUpdate(newQuantity);
  };

  return (
    <div className="flex items-center gap-2 border border-white/10 rounded-lg p-1">
      <button
        type="button"
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
        className="p-1 rounded-md hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus size={14} className="text-gray-400" />
      </button>
      <span className="text-sm text-gray-400 w-6 text-center">{quantity}</span>
      <button
        type="button"
        onClick={() => handleQuantityChange(quantity + 1)}
        disabled={maxStock && quantity >= maxStock}
        className="p-1 rounded-md hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={14} className="text-gray-400" />
      </button>
    </div>
  );
};

//  Used to display the product (image, name, quantity, price)
const CartItem = ({ item, handleQuantityUpdate, removeItem }) => (
  <div
    key={item.product}
    className="flex gap-3 items-center pt-2 pb-5 border-b border-white/10 last:border-0"
  >
    <div className="relative w-32 h-32 bg-darkBrand rounded-lg overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 flex justify-between items-start">
      <div className="flex flex-col space-y-3">
        <div>
          <h3 className="text-white text-lg font-medium line-clamp-1">
            {item.name}
          </h3>
          {item.color && (
            <p className="text-sm text-gray-400 mt-1">
              Color: {item.color}
            </p>
          )}
          {item.includes && (
            <p className="text-sm text-gray-400 mt-1">{item.includes.replace(/^,\s*/, "")}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <QuantityControl
            quantity={item.quantity}
            onUpdate={(newQty) => handleQuantityUpdate(item.product, newQty)}
            maxStock={item.maxStock}
          />
          <button
            type="button"
            onClick={() => removeItem(item.product)}
            className="p-1 rounded-md hover:bg-white/10 text-red-500 hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      {/* Price */}
      <span className="text-emerald-400">
        ${(item.price * item.quantity).toFixed(2)}
      </span>
    </div>
  </div>
);

//  Used to apply a discount code or gift card
const DiscountInput = () => (
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
);

//  Used to display the total price of the order
const OrderTotal = ({ total }) => (
  <div className="space-y-3 pt-4">
    <div className="flex justify-between text-gray-400 text-sm">
      <span>Subtotal</span>
      <span className="text-gray-400">${total.toFixed(2)}</span>
    </div>

    <div className="flex justify-between text-white font-medium pt-5 border-t border-white/10">
      <span>Total</span>
      <div>
        <span className="text-emerald-400 text-xl">${total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

const OrderSummary = ({ cartItems, total, updateQuantity, removeItem, orderNotes, onOrderNotesChange }) => {
  const handleQuantityUpdate = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  //  If the cart is empty, display a message
  if (!cartItems?.length) {
    return (
      <Card className="bg-darkBrand/20 backdrop-blur-xl border-white/10">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-white text-center">Your cart is empty</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-darkBrand/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <CartItem
              key={item.product}
              item={item}
              handleQuantityUpdate={handleQuantityUpdate}
              removeItem={removeItem}
            />
          ))}

          <div className="space-y-4">
            <Textarea
              placeholder="Add any special instructions or notes for your order..."
              value={orderNotes}
              onChange={(e) => onOrderNotesChange(e.target.value)}
              className="bg-brand/10 border-white/10 min-h-[100px] text-white placeholder:text-white/80"
            />
            <DiscountInput />
            <OrderTotal total={total} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
