import React, { useState } from "react";
import ContactSection from "./components/ContactSection";
import ShippingSection from "./components/ShippingSection";
import PaymentSection from "./components/PaymentSection";
import OrderSummary from "./components/OrderSummary";
import useCheckout from "@/hooks/Payment/useCheckout";
import Metadata from "@/components/layout/Metadata/Metadata";
import DeleteConfirmDialog from "@/components/admin/shared/DeleteDialog";
import { useDeleteAddressMutation, useGetUserAddressesQuery } from "@/redux/api/userApi";
import { toast } from "react-toastify";

const Checkout = () => {
  const {
    paymentMethod,
    cartItems,
    total,
    handleAddressChange,
    handlePaymentMethodChange,
    handleSubmit,
    handleUpdateQuantity,
    handleRemoveItem,
    userAddresses,
    user,
    selectedShippingAddress,
    handlePayPalApprove,
    handleStripeSuccess,
    email,
    handleEmailChange,
    orderNotes,
    handleOrderNotesChange
  } = useCheckout();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();
  const { refetch: refetchAddresses } = useGetUserAddressesQuery();

  const handleDeleteClick = (address) => {
    setAddressToDelete(address);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!addressToDelete) return;

    try {
      const response = await deleteAddress(addressToDelete._id).unwrap();
      toast.success(response.message || "Address deleted successfully");
      await refetchAddresses();
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete address");
    } finally {
      setIsDeleteDialogOpen(false);
      setAddressToDelete(null);
    }
  };

  return (
    <>
      <Metadata title="Checkout" />
      <div className="min-h-screen bg-brand-gradient py-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left Column - Forms */}
            <div className="space-y-6 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                <ContactSection
                  email={email}
                  onEmailChange={handleEmailChange}
                />
                <ShippingSection
                  address={selectedShippingAddress}
                  onAddressChange={handleAddressChange}
                  userAddresses={userAddresses}
                  userName={user?.name}
                  onDeleteClick={handleDeleteClick}
                  key={userAddresses?.length}
                />
                <PaymentSection
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={handlePaymentMethodChange}
                  total={total}
                  onSubmit={handleSubmit}
                  onPayPalApprove={handlePayPalApprove}
                  handleStripeSuccess={handleStripeSuccess}
                />
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-28 h-fit">
              <OrderSummary
                cartItems={cartItems}
                total={total}
                updateQuantity={handleUpdateQuantity}
                removeItem={handleRemoveItem}
                orderNotes={orderNotes}
                onOrderNotesChange={handleOrderNotesChange}
              />
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Address"
        description="Are you sure you want to delete this address? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
};

export default Checkout;
