import { useState, useEffect } from "react";
import { useGetMeQuery } from "@/redux/api/userApi";
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();
  const [refetchCallback, setRefetchCallback] = useState(null);

  // Handle Payment Method
  const [paymentMethod, setPaymentMethod] = useState(
    PAYMENT_METHODS.CREDIT_CARD
  );
  const [selectedAddress, setSelectedAddress] = useState(null);

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

  // Handle Delete Address
  const handleDeleteClick = (address, refetchAddresses) => {
    setAddressToDelete(address);
    setRefetchCallback(() => refetchAddresses);
    setIsDeleteDialogOpen(true);
  };

  // Handle Delete Confirm
  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteAddress(addressToDelete._id).unwrap();
      if (response.success) {
        toast.success(response.message || "Address deleted successfully");
        if (refetchCallback) {
          await refetchCallback();
        }
        setIsDeleteDialogOpen(false);
        setAddressToDelete(null);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete address");
    }
  };

  const handleAddressChange = (field, value) => {
    if (field === "selectedAddress") {
      setSelectedAddress(value);
    }
  };

  return {
    email,
    handleEmailChange,
    user,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    isDeleting,
    paymentMethod,
    setPaymentMethod,
    selectedAddress,
    handleAddressChange,
  };
};
