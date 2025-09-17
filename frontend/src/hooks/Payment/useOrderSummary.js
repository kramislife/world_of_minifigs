import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  selectCartTotal,
  setExternalCartItems,
  selectExternalCartTotal,
  removeExternalCartItem,
  updateExternalCartQuantity,
} from "@/redux/features/cartSlice";
import { updateBuyNowQuantity } from "@/redux/features/buyNowSlice";
import { toast } from "react-toastify";

export const useOrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");
  const externalCart = searchParams.get("externalCart"); // NEW

  // Selectors
  const cartItems = useSelector((state) => state.cart.cartItems);
  const externalItems = useSelector((state) => state.cart.externalItems); // NEW
  const buyNowItem = useSelector((state) => state.buyNow.item);
  const total = useSelector(selectCartTotal);
  const externalCartTotal = useSelector(selectExternalCartTotal);

  // Determine which items to display
  let displayItems;
  let finalTotal;

  if (externalCart) {
    displayItems = externalItems;
    finalTotal = externalCartTotal;
  } else {
    displayItems =
      mode === "buy_now" ? (buyNowItem ? [buyNowItem] : []) : cartItems;
    const buyNowTotal = buyNowItem
      ? buyNowItem.quantity * (buyNowItem.discounted_price || buyNowItem.price)
      : 0;
    finalTotal = mode === "buy_now" ? buyNowTotal : total;
  }

  const subtotal = finalTotal;
  const displayTotal = finalTotal;

  const loadExternalMinifigCart = useCallback(() => {
    if (!externalCart) return;
    try {
      const decodedCart = JSON.parse(decodeURIComponent(externalCart));
      const transformToCartDisplayItem = (item) => ({
        product: item._id,
        name: item.product_name,
        image: item.image,
        price: item.price,
        discounted_price: item.discounted_price ?? item.price,
        discount: item.discount ?? 0,
        color: item.color,
        includes: item.includes,
        quantity: item.quantity ?? 1,
        stock: item.stock,
      });

      const transformedItems = (
        Array.isArray(decodedCart) ? decodedCart : [decodedCart]
      ).map(transformToCartDisplayItem);
      dispatch(setExternalCartItems(transformedItems));
    } catch (err) {
      console.error("Invalid externalCart payload:", err);
      toast.error("Failed to load external cart data.");
    }
  }, [externalCart, dispatch]);

  useEffect(() => {
    loadExternalMinifigCart();
  }, [loadExternalMinifigCart]);

  const handleQuantityUpdate = useCallback(
    (productId, newQuantity) => {
      if (externalCart) {
        const itemToUpdate = externalItems.find(
          (item) => item.product === productId,
        );
        if (!itemToUpdate) return;

        if (newQuantity < 1) {
          dispatch(removeExternalCartItem(productId));
        } else if (newQuantity > itemToUpdate.stock) {
          toast.error(`Only ${itemToUpdate.stock} items available in stock`);
        } else {
          dispatch(
            updateExternalCartQuantity({
              _id: productId,
              quantity: newQuantity,
            }),
          );
        }
      } else if (mode === "buy_now") {
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
        // Fallback to regular cart
        if (newQuantity < 1) {
          dispatch(removeFromCart(productId));
        } else {
          dispatch(
            updateQuantity({ product: productId, quantity: newQuantity }),
          );
        }
      }
    },
    [buyNowItem, dispatch, externalCart, externalItems, mode],
  );

  return {
    mode,
    displayItems,
    subtotal,
    displayTotal,
    handleQuantityUpdate,
  };
};
