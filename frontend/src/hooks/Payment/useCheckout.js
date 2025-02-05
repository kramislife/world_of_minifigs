import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAYMENT_METHODS } from "@/constant/paymentMethod";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/features/cartSlice";
import { toast } from "react-toastify";
import { useGetMeQuery, useGetUserAddressesQuery } from "@/redux/api/userApi";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { useCreatePayPalOrderMutation } from "@/redux/api/checkoutApi";
import { selectCartTotal } from "@/redux/features/cartSlice";

const useCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { data: userData } = useGetMeQuery();
  const { data: userAddresses } = useGetUserAddressesQuery();
  const [createOrder] = useCreateOrderMutation();

  // Initialize email with user's email
  const [email, setEmail] = useState("");
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.CREDIT_CARD);
  const [orderNotes, setOrderNotes] = useState("");

  // Set email when user data is loaded
  useEffect(() => {
    if (userData?.email) {
      setEmail(userData.email);
      console.log("Setting user email:", userData.email);
    }
  }, [userData]);

  // Move total calculation to cartSlice as it's cart-related logic
  const total = useSelector(selectCartTotal);

  // Simplified address change handler
  const handleAddressChange = (field, value) => {
    if (field === "selectedAddress") {
      setSelectedShippingAddress(value);
    }
  };

  const handlePaymentMethodChange = (value) => setPaymentMethod(value);

  // Move order-related mutations to the top
  const [createPayPalOrder] = useCreatePayPalOrderMutation();

  // Update the formatCartItems function to handle color correctly
  const formatCartItems = () => cartItems.map((item) => ({
    product: item.product,
    name: item.name,
    quantity: Number(item.quantity),
    price: Number(item.price),
    image: item.image,
    isPreOrder: Boolean(item.isPreOrder),
    color: item.color || undefined, // Just pass the color name string
    includes: item.includes || undefined
  }));

  // Creating a base order data for the order
  const createBaseOrderData = (paymentInfo) => {
    if (!email) {
      console.error("Email is missing in order data");
      throw new Error("Email is required for order creation");
    }

    const orderData = {
      email: String(email).trim().toLowerCase(),
      shippingAddress: selectedShippingAddress._id,
      orderItems: formatCartItems().map(item => ({
        ...item,
          // Only include color if it exists
        ...(item.color && { color: item.color }),
        ...(item.includes && { includes: item.includes })
      })),
      paymentInfo: {
        method: paymentInfo.method,
        transactionId: paymentInfo.transactionId,
        status: paymentInfo.status,
        paidAt: paymentInfo.paidAt
      },
      itemsPrice: Number(total),
      taxPrice: 0,
      shippingPrice: 0,
      discountPrice: 0,
      totalPrice: Number(total),
      orderNotes: orderNotes,
    };

    console.log("Order data being sent:", JSON.stringify(orderData, null, 2));
    
    return orderData;
  };

  // Helper function to handle successful order creation
  const handleOrderSuccess = async (order) => {
    if (order.success) {
      toast.dismiss();
      toast.success("Payment successful! Order created.");
      dispatch(clearCart());
      navigate(`/order/${order.data._id}`);
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      // Handle PayPal payment
      if (paymentMethod === PAYMENT_METHODS.PAYPAL) {
        const paypalOrderData = {
          orderItems: formatCartItems(),
          total: Number(total).toFixed(2),
        };

        const response = await createPayPalOrder(paypalOrderData).unwrap();

        if (!response?.data?.orderID) {
          throw new Error("Failed to create PayPal order");
        }

        return response.data.orderID;
      }

      // Handle Stripe payment
      if (paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
        return true;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      throw error;
    }
  };

  // Generic payment success handler
  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      if (!selectedShippingAddress) {
        toast.error("Please select a shipping address");
        return;
      }

      if (!email || !email.trim()) {
        toast.error("Email is required for order creation");
        return;
      }

      toast.loading("Processing order...");

      const orderData = createBaseOrderData({
        method: paymentDetails.paymentMethod,
        transactionId: paymentDetails.transactionId,
        status: paymentDetails.status,
        paidAt: new Date().toISOString(),
      });

      // Log the final data structure
      console.log("Final order data:", JSON.stringify(orderData, null, 2));

      const order = await createOrder(orderData).unwrap();
      await handleOrderSuccess(order);
    } catch (error) {
      toast.dismiss();
      console.error("Order creation error:", error?.data || error);
      toast.error(
        error?.data?.message || error?.message || "Failed to create order"
      );
      throw error;
    }
  };

  // PayPal Success Handler
  const handlePayPalApprove = async (data) => {
    try {
      await handlePaymentSuccess({
        paymentMethod: "PayPal",
        transactionId: data.orderID,
        status: "Success",
      });
    } catch (error) {
      toast.dismiss();
      toast.error(
        error?.data?.message || error?.message || "Failed to complete payment"
      );
      throw error;
    }
  };

  // Stripe Success Handler
  const handleStripeSuccess = async (paymentDetails) => {
    try {
      await handlePaymentSuccess(paymentDetails);
    } catch (error) {
      throw error;
    }
  };

  // Cart Handlers
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ product: productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log("Email changed to:", e.target.value);
  };

  const handleOrderNotesChange = (notes) => {
    setOrderNotes(notes);
  };

  return {
    paymentMethod,
    cartItems,
    total,
    handleAddressChange,
    handlePaymentMethodChange,
    handleSubmit,
    handleUpdateQuantity,
    handleRemoveItem,
    userAddresses,
    user: userData,
    selectedShippingAddress,
    handlePayPalApprove,
    handleStripeSuccess,
    email,
    handleEmailChange,
    orderNotes,
    handleOrderNotesChange,
  };
};

export default useCheckout;
