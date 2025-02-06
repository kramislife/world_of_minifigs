import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { removeFromCart, updateQuantity } from "@/redux/features/cartSlice";
import { toast } from "react-toastify";

export const useCartSheet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [checkoutDisabled, setCheckoutDisabled] = useState(false);

  // Get latest product data for cart items
  const productIds = cartItems.map((item) => item.product);
  const {
    data: productsData,
    refetch,
    isLoading,
  } = useGetProductsQuery(
    productIds.length > 0 ? `ids=${productIds.join(",")}` : undefined,
    {
      skip: productIds.length === 0,
      pollingInterval: 30000,
    }
  );

  // Reset checkout state when auth status changes
  useEffect(() => {
    if (isAuthenticated) {
      setShowLoginMessage(false);
      setCheckoutDisabled(false);
    }
  }, [isAuthenticated]);

  // Merge latest product data with cart items
  const updatedCartItems = useMemo(() => {
    if (!productsData?.products) return cartItems;
    return cartItems.map((cartItem) => {
      const latestProduct = productsData.products.find(
        (p) => p._id === cartItem.product
      );
      return latestProduct ? { ...cartItem, ...latestProduct } : cartItem;
    });
  }, [cartItems, productsData]);

  const handleQuantityUpdate = (productId, newQuantity, maxStock) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(productId));
    } else if (newQuantity > maxStock) {
      toast.error(`Only ${maxStock} items available in stock`);
    } else {
      dispatch(updateQuantity({ product: productId, quantity: newQuantity }));
    }
  };

  const handleCheckout = (onClose) => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
      setCheckoutDisabled(true);
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    onClose?.(); // Close the sheet before navigating
    navigate("/checkout");
  };

  return {
    isLoading,
    updatedCartItems,
    isAuthenticated,
    showLoginMessage,
    checkoutDisabled,
    handleQuantityUpdate,
    handleCheckout,
    refetch,
  };
};
