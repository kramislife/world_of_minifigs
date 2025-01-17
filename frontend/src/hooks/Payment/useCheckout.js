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

  // Address and Payment States
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(
    PAYMENT_METHODS.CREDIT_CARD
  );
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  // Calculate total
  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      ),
    [cartItems]
  );

  // Address Handlers
  const handleAddressChange = (field, value) => {
    if (field === "selectedAddress") {
      setSelectedShippingAddress(value);
      return;
    }
  };

  // Payment Handlers
  const handlePaymentMethodChange = (value) => setPaymentMethod(value);

  const handleCardDetailsChange = (field, value) => {
    setCardDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // API Mutations
  const [createOrder] = useCreateOrderMutation();
  const [createPayPalOrder] = useCreatePayPalOrderMutation();

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
          orderItems: cartItems.map((item) => ({
            product: item.product,
            name: item.name,
            quantity: parseInt(item.quantity, 10),
            price: Number(item.price).toFixed(2),
            image: item.image,
            isPreorder: item.isPreorder || false,
          })),
          total: Number(total).toFixed(2),
        };

        const response = await createPayPalOrder(paypalOrderData).unwrap();

        if (!response?.data?.orderID) {
          throw new Error("Failed to create PayPal order");
        }

        return response.data.orderID;
      }

      // Handle Credit Card payment (placeholder for future implementation)
      if (paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
        // Validate card details

        // TODO: Implement credit card payment logic
        // toast.info("Credit card payment will be implemented soon");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      throw error;
    }
  };

  // PayPal Success Handler
  const handlePayPalApprove = async (data) => {
    try {
      toast.loading("Processing payment...");

      const orderData = {
        shippingAddress: selectedShippingAddress._id,
        billingAddress: selectedShippingAddress._id,
        orderItems: cartItems.map((item) => ({
          product: item.product,
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price),
          image: item.image,
        })),
        itemsPrice: parseFloat(total),
        taxPrice: 0,
        shippingPrice: 0,
        discountPrice: 0,
        paymentInfo: {
          method: "PayPal",
          transactionId: data.orderID,
          status: "Success",
          paidAt: new Date().toISOString(),
        },
        totalPrice: parseFloat(total),
        orderStatus: "Processing",
      };

      const order = await createOrder(orderData).unwrap();

      if (order.success) {
        toast.dismiss();
        toast.success("Payment successful! Order created.");
        dispatch(clearCart());
        navigate(`/order/${order.data._id}`);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(
        error?.data?.message || error?.message || "Failed to complete payment"
      );
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

  // Card Validation Helper
  const validateCardDetails = (details) => {
    const { cardNumber, expiryDate, cvv, nameOnCard } = details;
    return (
      cardNumber.length >= 15 &&
      expiryDate.length === 5 &&
      cvv.length >= 3 &&
      nameOnCard.length > 0
    );
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
    cardDetails,
    handleCardDetailsChange,
  };
};

export default useCheckout;
