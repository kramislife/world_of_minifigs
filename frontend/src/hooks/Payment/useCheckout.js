import { useState, useEffect } from "react";
import {
  useGetMeQuery,
  useGetUserAddressesQuery,
  useUpdateAddressMutation,
} from "@/redux/api/userApi";
import { useDeleteAddressMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { PAYMENT_METHODS } from "@/constant/paymentMethod";
import { useSelector } from "react-redux";

export const useCheckout = () => {
  const { data: user, refetch: refetchUser } = useGetMeQuery();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Handle Email Update
  const [email, setEmail] = useState("");

  // Handle Delete Address
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();
  const [refetchCallback, setRefetchCallback] = useState(null);

  // Handle Payment Method
  const [paymentMethod, setPaymentMethod] = useState(
    PAYMENT_METHODS.CREDIT_CARD
  );
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Add state for order notes
  const [orderNotes, setOrderNotes] = useState("");

  // Add shipping related states and queries
  const [updateAddress, { isLoading: isUpdatingDefault }] =
    useUpdateAddressMutation();
  const {
    data: userAddresses,
    isLoading: isLoadingAddresses,
    isFetching: isFetchingAddresses,
    refetch: refetchAddresses,
  } = useGetUserAddressesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Add email validation logic
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const emailIsValid = !email || isValidEmail(email);

  // Update email when user data is available
  useEffect(() => {
    if (isAuthenticated) {
      // Refetch user data when authenticated
      refetchUser().then(() => {
        if (user?.email) {
          setEmail(user.email);
        }
      });
    }
  }, [isAuthenticated, user?.email, refetchUser]);

  // Handle Email Update
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Replace handleDeleteClick and handleDeleteConfirm with a single function
  const handleDeleteAddress = async (address) => {
    try {
      const response = await deleteAddress(address._id).unwrap();
      if (response.success) {
        toast.success(response.message || "Address deleted successfully");
        await refetchAddresses();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete address");
    }
  };

  // Handle address selection
  useEffect(() => {
    if (userAddresses?.length > 0) {
      const defaultAddress =
        userAddresses.find((addr) => addr.is_default) ||
        userAddresses.find((addr) => addr._id === selectedAddress?._id) ||
        userAddresses[0];

      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    }
  }, [userAddresses]);

  const handleAddressSelect = (addr) => {
    const updatedAddr = userAddresses.find((a) => a._id === addr._id) || addr;
    setSelectedAddress(updatedAddr);
  };

  const formatAddress = (addr) => {
    const parts = [
      addr.address_line1,
      addr.address_line2,
      addr.city,
      addr.state,
      addr.postal_code,
      addr.country,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const handleMakeDefault = async (addr, e) => {
    e.stopPropagation();
    try {
      const response = await updateAddress({
        id: addr._id,
        addressData: {
          name: addr.name,
          contact_number: addr.contact_number,
          address_line1: addr.address_line1,
          address_line2: addr.address_line2,
          city: addr.city,
          state: addr.state,
          postal_code: addr.postal_code,
          country: addr.country,
          country_code: addr.country_code,
          is_default: true,
        },
      }).unwrap();

      if (response.success) {
        toast.success(response.message);
        await refetchAddresses();
      }
    } catch (error) {
      console.error("Error setting default address:", error);
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to set default address"
      );
    }
  };

  // Add new function to create order data
  const createOrderData = (
    paymentInfo,
    total,
    orderItems,
    email,
    selectedAddress,
    orderNotes,
    user
  ) => {
    return {
      user: user._id,
      email,
      shippingAddress: selectedAddress._id,
      orderItems: orderItems.map((item) => ({
        product: item._id || item.product,
        name: item.name,
        color: item.color,
        includes: item.includes,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount || 0,
        discountedPrice: item.discounted_price || item.price,
        image: item.image,
        isPreOrder: item.isPreOrder || false,
        availabilityDate: item.availabilityDate,
      })),
      paymentInfo,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: total.toFixed(2),
      orderNotes: orderNotes || "",
      paidAt: new Date().toISOString(),
    };
  };

  // Add payment method change handler
  const handlePaymentMethodChange = (methodType, e) => {
    e.preventDefault();
    setPaymentMethod(methodType);
  };

  return {
    email,
    handleEmailChange,
    emailIsValid,
    user,
    isDeleting,
    paymentMethod,
    setPaymentMethod,
    selectedAddress,
    handleAddressSelect,
    createOrderData,
    orderNotes,
    setOrderNotes,
    userAddresses,
    isLoadingAddresses,
    isFetchingAddresses,
    isUpdatingDefault,
    formatAddress,
    handleMakeDefault,
    refetchAddresses,
    handleDeleteAddress,
    handlePaymentMethodChange,
  };
};
