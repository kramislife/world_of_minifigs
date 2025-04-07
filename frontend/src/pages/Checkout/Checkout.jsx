import React from "react";
import ContactSection from "./components/ContactSection";
import ShippingSection from "./components/ShippingSection";
import PaymentSection from "./components/PaymentSection";
import OrderSummary from "./components/OrderSummary";
import Metadata from "@/components/layout/Metadata/Metadata";
import DeleteConfirmDialog from "@/components/admin/shared/DeleteDialog";
import { PAYMENT_METHODS } from "@/constant/paymentMethod";
import { useCheckout } from "@/hooks/Payment/useCheckout";
import { useOrderSummary } from "@/hooks/Payment/useOrderSummary";

const Checkout = () => {
  const {
    email,
    handleEmailChange,
    user,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    isDeleting,
    selectedAddress,
    handleAddressChange,
    orderNotes,
    setOrderNotes,
  } = useCheckout();

  // Add state for payment method
  const [paymentMethod, setPaymentMethod] = React.useState(
    PAYMENT_METHODS.CREDIT_CARD
  );

  // Get total from useOrderSummary hook
  const { displayItems, displayTotal } = useOrderSummary();

  const handleSubmit = async (paymentData) => {
    // This will be handled in CardSection now
    console.log("Payment successful:", paymentData);
  };

  console.log("Order Items in Checkout:", displayItems);

  return (
    <>
      <Metadata title={`Checkout`} />
      <div className="min-h-screen bg-brand-start py-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left Column - Forms */}
            <div className="space-y-6 overflow-y-auto">
              <form className="space-y-5">
                <ContactSection
                  email={email}
                  onEmailChange={handleEmailChange}
                />
                <ShippingSection
                  onAddressChange={handleAddressChange}
                  userName={user?.name}
                  onDeleteClick={handleDeleteClick}
                />
                <PaymentSection
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                  total={displayTotal}
                  email={email}
                  selectedAddress={selectedAddress}
                  orderItems={displayItems}
                  orderNotes={orderNotes}
                  onSubmit={handleSubmit}
                />
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-28 h-fit">
              <OrderSummary
                onOrderNotesChange={setOrderNotes}
                orderNotes={orderNotes}
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
