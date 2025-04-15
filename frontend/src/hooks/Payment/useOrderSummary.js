import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  selectCartTotal,
} from "@/redux/features/cartSlice";
import { updateBuyNowQuantity } from "@/redux/features/buyNowSlice";
import { toast } from "react-toastify";

export const useOrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");

  // Selectors
  const cartItems = useSelector((state) => state.cart.cartItems);
  const buyNowItem = useSelector((state) => state.buyNow.item);
  const total = useSelector(selectCartTotal);

  // Determine which items to display
  const displayItems =
    mode === "buy_now" ? (buyNowItem ? [buyNowItem] : []) : cartItems;

  // Calculate totals
  const buyNowTotal = buyNowItem
    ? buyNowItem.quantity * (buyNowItem.discounted_price || buyNowItem.price)
    : 0;
  const finalTotal = mode === "buy_now" ? buyNowTotal : total;
  const subtotal = finalTotal;
  const displayTotal = finalTotal;

  const handleQuantityUpdate = (productId, newQuantity) => {
    if (mode === "buy_now") {
      if (newQuantity < 1) {
        toast.error("Quantity cannot be less than 1");
        return;
      }
      if (buyNowItem && newQuantity > buyNowItem.stock) {
        toast.error(`Only ${buyNowItem.stock} items available in stock`);
        return;
      }
      dispatch(updateBuyNowQuantity(newQuantity));
    } else {
      if (newQuantity < 1) {
        dispatch(removeFromCart(productId));
      } else {
        dispatch(updateQuantity({ product: productId, quantity: newQuantity }));
      }
    }
  };

  return {
    mode,
    displayItems,
    subtotal,
    displayTotal,
    handleQuantityUpdate,
  };
};
