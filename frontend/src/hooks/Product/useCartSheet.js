import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "@/redux/api/productApi";
import {
  removeFromCart,
  updateQuantity,
  selectCartTotal,
  removeExternalCartItem,
  updateExternalCartQuantity,
} from "@/redux/features/cartSlice";
import { toast } from "react-toastify";

export const useCartSheet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { cartItems, externalItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const internalTotal = useSelector(selectCartTotal);

  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [checkoutDisabled, setCheckoutDisabled] = useState(false);

  const allProductIds = [...cartItems, ...externalItems].map(
    (item) => item.product,
  );

  const {
    data: productsData,
    refetch,
    isLoading,
  } = useGetProductsQuery(
    allProductIds.length > 0 ? `ids=${allProductIds.join(",")}` : undefined,
    { skip: allProductIds.length === 0, pollingInterval: 30000 },
  );

  useEffect(() => {
    if (isAuthenticated) {
      setShowLoginMessage(false);
      setCheckoutDisabled(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (cartItems.length > 0 || externalItems.length > 0) {
      refetch();
    }
  }, [cartItems.length, externalItems.length, refetch]);

  // Merge product data
  const updatedCartItems = useMemo(() => {
    const mergeItems = (items) =>
      items.map((cartItem) => {
        const latestProduct = productsData?.products?.find(
          (p) => p._id === cartItem.product,
        );
        return latestProduct ? { ...cartItem, ...latestProduct } : cartItem;
      });
    return [...mergeItems(cartItems), ...mergeItems(externalItems)];
  }, [cartItems, externalItems, productsData]);

  // Calculate combined total
  const externalTotal = useMemo(
    () =>
      externalItems.reduce(
        (sum, item) =>
          sum + (item.discounted_price ?? item.price) * item.quantity,
        0,
      ),
    [externalItems],
  );
  const combinedTotal = internalTotal + externalTotal;

  const handleQuantityUpdate = (productId, newQuantity, maxStock) => {
    const isExternal = externalItems.some((item) => item.product === productId);

    if (newQuantity < 1) {
      if (isExternal) {
        dispatch(removeExternalCartItem(productId));
      } else {
        dispatch(removeFromCart(productId));
      }
    } else if (newQuantity > maxStock) {
      toast.error(`Only ${maxStock} items available in stock`);
    } else {
      if (isExternal) {
        dispatch(
          updateExternalCartQuantity({ _id: productId, quantity: newQuantity }),
        );
      } else {
        dispatch(updateQuantity({ product: productId, quantity: newQuantity }));
      }
    }
  };
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.info("Please login to proceed with checkout");
      navigate("/login", { state: { from: location.pathname } });
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
    total: combinedTotal,
    hasOutOfStockItems,
    handleQuantityUpdate,
    handleCheckout,
    refetch,
  };
};
