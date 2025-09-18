import { useEffect, useCallback, useMemo } from "react";
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
import {
  updateBuyNowQuantity,
  setExternalBuyNowItem,
} from "@/redux/features/buyNowSlice";
import { toast } from "react-toastify";

export const useOrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");
  const externalCartParam = searchParams.get("externalCart");

  const cartItems = useSelector((state) => state.cart.cartItems);
  const externalItems = useSelector((state) => state.cart.externalItems);
  const buyNowItem = useSelector((state) => state.buyNow.item);
  const internalTotal = useSelector(selectCartTotal);
  const externalTotal = useSelector(selectExternalCartTotal);

  // this function takes an external cart passed as a URL parameter,

  const loadExternalMinifigCart = useCallback(() => {
    if (!externalCartParam) return;
    try {
      const decodedCart = JSON.parse(decodeURIComponent(externalCartParam));
      const transformedItems = (
        Array.isArray(decodedCart) ? decodedCart : [decodedCart]
      ).map((item) => ({
        product: item._id, // keep product as key
        name: item.product_name,
        image: item.image,
        price: item.price,
        discounted_price: item.discounted_price ?? item.price,
        discount: item.discount ?? 0,
        color: item.color,
        includes: item.includes,
        quantity: item.quantity ?? 1,
        stock: item.stock,
      }));
      if (mode === "buy_now") {
        dispatch(setExternalBuyNowItem(transformedItems));
      } else {
        dispatch(setExternalCartItems(transformedItems));
      }
    } catch (err) {
      console.error("Invalid externalCart payload:", err);
      toast.error("Failed to load external cart data.");
    }
  }, [externalCartParam, mode, dispatch]);

  useEffect(() => {
    loadExternalMinifigCart();
  }, [loadExternalMinifigCart]);

  const displayItems = useMemo(() => {
    if (mode === "buy_now") return buyNowItem ? [buyNowItem] : [];
    return [...cartItems, ...externalItems];
  }, [mode, buyNowItem, cartItems, externalItems]);

  const finalTotal = useMemo(() => {
    if (mode === "buy_now") {
      return buyNowItem
        ? buyNowItem.quantity *
            (buyNowItem.discounted_price ?? buyNowItem.price)
        : 0;
    }
    return internalTotal + externalTotal;
  }, [mode, buyNowItem, internalTotal, externalTotal]);

  const handleQuantityUpdate = useCallback(
    (productId, newQuantity) => {
      // Check external items first
      const externalItem = externalItems.find((i) => i.product === productId);
      if (externalItem) {
        if (newQuantity < 1) {
          dispatch(removeExternalCartItem(productId));
        } else if (newQuantity > externalItem.stock) {
          toast.error(`Only ${externalItem.stock} items available in stock`);
        } else {
          dispatch(
            updateExternalCartQuantity({
              _id: productId,
              quantity: newQuantity,
            }),
          );
        }
        return;
      }

      // Buy now item
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
        return;
      }

      // Internal cart
      if (newQuantity < 1) {
        dispatch(removeFromCart(productId));
      } else {
        dispatch(updateQuantity({ product: productId, quantity: newQuantity }));
      }
    },
    [dispatch, externalItems, buyNowItem, mode],
  );

  return {
    mode,
    displayItems,
    subtotal: finalTotal,
    displayTotal: finalTotal,
    handleQuantityUpdate,
  };
};
