import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  updateExternalCartQuantity,
  removeExternalCartItem,
  clearExternalCart,
} from "@/redux/features/cartSlice";

import { updateBuyNowQuantity } from "@/redux/features/buyNowSlice";
import { toast } from "react-toastify";

const useHandleQuantity = ({
  mode,
  buyNowItem,
  displayItems,
  externalItems,
}) => {
  const dispatch = useDispatch();

  const handleQuantityUpdate = useCallback(
    (productId, newQuantity) => {
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

      const currentItem = displayItems.find((item) => item._id === productId);
      if (!currentItem) return;

      if (newQuantity < 1) {
        if (mode === "cart") {
          dispatch(removeExternalCartItem(productId));
          const isLast =
            externalItems.length === 1 && externalItems[0]._id === productId;
          if (isLast) dispatch(clearExternalCart());
        } else {
          dispatch(removeFromCart(productId));
        }
        return;
      }

      if (newQuantity > currentItem.stock) {
        toast.error(
          `Only ${currentItem.stock} items available in stock for ${currentItem.name}`
        );
        return;
      }

      if (mode === "cart") {
        dispatch(
          updateExternalCartQuantity({ _id: productId, quantity: newQuantity })
        );
      } else {
        dispatch(updateQuantity({ product: productId, quantity: newQuantity }));
      }
    },
    [mode, buyNowItem, displayItems, externalItems, dispatch]
  );

  return { handleQuantityUpdate };
};

export default useHandleQuantity;
