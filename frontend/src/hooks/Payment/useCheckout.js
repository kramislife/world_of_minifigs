import { useState, useMemo } from "react";
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

const useCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { data: userData } = useGetMeQuery();
  const { data: userAddresses } = useGetUserAddressesQuery();

  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);

  // Payment Method State, default is credit card
  const [paymentMethod, setPaymentMethod] = useState(
    PAYMENT_METHODS.CREDIT_CARD
  );

  // Calculate total price so that when the quantity of the item, the total price is updated
  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      ),
    [cartItems]
  );

  // Allows user to select an address for shipping 
  const handleAddressChange = (field, value) => {
    if (field === "selectedAddress") {
      setSelectedShippingAddress(value);
    }
  };

  // Handler to change payment method dynamically
  const handlePaymentMethodChange = (value) => setPaymentMethod(value);

  // Mutation hooks for creating orders and PayPal transactions
  const [createOrder] = useCreateOrderMutation();
  const [createPayPalOrder] = useCreatePayPalOrderMutation();

  // Helper function to format cart items
  const formatCartItems = () =>
    cartItems.map((item) => ({
      product: item.product,
      name: item.name,
      quantity: parseInt(item.quantity, 10),
      price: parseFloat(item.price),
      image: item.image,
      isPreorder: item.isPreorder || false,
    }));

  // Creating a base order data for the order
  const createBaseOrderData = (paymentInfo) => ({
    shippingAddress: selectedShippingAddress._id,
    billingAddress: selectedShippingAddress._id,
    orderItems: formatCartItems(),
    itemsPrice: parseFloat(total),
    taxPrice: 0,
    shippingPrice: 0,
    discountPrice: 0,
    paymentInfo,
    totalPrice: parseFloat(total),
    orderStatus: "Processing",
  });

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
      if (!selectedShippingAddress) {
        toast.error("Please select a shipping address");
        return;
      }

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
      toast.loading("Processing order...");

      const orderData = createBaseOrderData({
        method: paymentDetails.paymentMethod,
        transactionId: paymentDetails.transactionId,
        status: paymentDetails.status,
        paidAt: new Date().toISOString(),
      });

      const order = await createOrder(orderData).unwrap();
      await handleOrderSuccess(order);
    } catch (error) {
      toast.dismiss();
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
  };
};

export default useCheckout;
