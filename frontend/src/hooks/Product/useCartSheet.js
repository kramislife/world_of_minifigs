import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "@/redux/api/productApi";
import {
  removeFromCart,
  updateQuantity,
  selectCartTotal,
} from "@/redux/features/cartSlice";
import { toast } from "react-toastify";

export const useCartSheet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const total = useSelector(selectCartTotal);
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

  // Refetch cart items when sheet opens
  useEffect(() => {
    if (cartItems.length > 0) {
      refetch();
    }
  }, [cartItems.length, refetch]);

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

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.info("Please login to proceed with checkout");
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });
      return;
    }
    navigate("/checkout?mode=cart");
  };

  const hasOutOfStockItems = updatedCartItems.some((item) => item.stock === 0);

  return {
    isLoading,
    updatedCartItems,
    isAuthenticated,
    showLoginMessage,
    checkoutDisabled,
    total,
    hasOutOfStockItems,
    handleQuantityUpdate,
    handleCheckout,
    refetch,
  };
};
