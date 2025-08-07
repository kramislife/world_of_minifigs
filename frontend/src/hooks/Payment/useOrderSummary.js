import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  selectCartTotal,
  setExternalCartItems,
  selectExternalCartTotal,
} from "@/redux/features/cartSlice";

import { setBuyNowItem } from "@/redux/features/buyNowSlice";
import { toast } from "react-toastify";
import useHandleQuantity  from '@/hooks/Payment/useHandleQuantity'

export const useOrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");
  const externalCart = searchParams.get("externalCart");

  // Selectors
  const cartItems = useSelector((state) => state.cart.cartItems);
  const externalItems = useSelector((state) => state.cart.externalItems);
  const buyNowItem = useSelector((state) => state.buyNow.item);
  const cartTotal = useSelector(selectCartTotal);
  const externalCartTotal = useSelector(selectExternalCartTotal);

  // Determine which items to display
  let displayItems = [];
  let finalTotal = 0;

  if (mode === "buy_now") {
    displayItems = buyNowItem ? [buyNowItem] : [];
    finalTotal = buyNowItem
      ? buyNowItem.quantity * (buyNowItem.discounted_price || buyNowItem.price)
      : 0;
  } else if (mode === "cart") {
    displayItems = externalItems;
    finalTotal = externalCartTotal;
  } else {
    displayItems = cartItems;
    finalTotal = cartTotal;
  }

  const subtotal = finalTotal;
  const displayTotal = finalTotal;

  const loadExternalMinifigCart = useCallback(() => {
    if (!externalCart) return;

    try {
      const decodedCart = JSON.parse(decodeURIComponent(externalCart));

      // helper fn to transform the incoming external cart data into CartDisplayItem format
      const transformToCartDisplayItem = (item) => {
        return {
          _id: item._id || String(Math.random()),
          name: item.product_name,
          image: item.image,
          price: item.price,
          discounted_price: item.discounted_price ?? item.price,
          discount: item.discount ?? 0,
          color: item.color,
          includes: item.includes,
          quantity: item.quantity ?? 1,
          stock: item.stock,
        };
      };

      if (mode === "buy_now") {
        const transformedItem = Array.isArray(decodedCart)
          ? decodedCart[0]
          : decodedCart;
        dispatch(
          setBuyNowItem(
            transformedItem ? transformToCartDisplayItem(transformedItem) : null
          )
        );
      } else if (mode === "cart") {
        const transformedItems = (
          Array.isArray(decodedCart) ? decodedCart : [decodedCart]
        ).map(transformToCartDisplayItem);
        dispatch(setExternalCartItems(transformedItems));
      }
    } catch (err) {
      console.error("Invalid externalCart payload:", err);
      toast.error("Failed to load external cart data.");
    }
  }, [externalCart, mode, dispatch]);

  useEffect(() => {
    loadExternalMinifigCart();
  }, [loadExternalMinifigCart]);

  const { handleQuantityUpdate } = useHandleQuantity({
    mode,
    buyNowItem,
    displayItems,
    externalItems,
  });

  return {
    mode,
    displayItems,
    subtotal,
    displayTotal,
    handleQuantityUpdate,
  };
};
