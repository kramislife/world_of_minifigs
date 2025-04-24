import React from "react";
import ContactSection from "./components/ContactSection";
import ShippingSection from "./components/ShippingSection";
import PaymentSection from "./components/PaymentSection";
import OrderSummary from "./components/OrderSummary";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useCheckout } from "@/hooks/Payment/useCheckout";
import { useOrderSummary } from "@/hooks/Payment/useOrderSummary";
import CheckoutSkeleton from "@/components/layout/skeleton/Products/CheckoutSkeleton";

const Checkout = () => {
  const {
    email,
    handleEmailChange,
    emailIsValid,
    user,
    orderNotes,
    setOrderNotes,
    isLoading,
    paymentMethod,
    handlePaymentMethodChange,
    selectedAddress,
    processing,
    error,
    handleStripePayment,
    handleSuccessfulPayment,
  } = useCheckout();

  // Get total from useOrderSummary hook
  const { displayItems, displayTotal } = useOrderSummary();

  if (isLoading) {
    return <CheckoutSkeleton />;
  }

  return (
    <>
      <Metadata title={`Checkout`} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-3 md:p-5">
        {/* Left Column - Forms */}
        <form className="space-y-5">
          <ContactSection
            email={email}
            onEmailChange={handleEmailChange}
            emailIsValid={emailIsValid}
          />
          <ShippingSection userName={user?.name} />
          <PaymentSection
            paymentMethod={paymentMethod}
            handlePaymentMethodChange={handlePaymentMethodChange}
            total={displayTotal}
            email={email}
            selectedAddress={selectedAddress}
            orderItems={displayItems}
            orderNotes={orderNotes}
            processing={processing}
            error={error}
            onStripePayment={handleStripePayment}
            onPaymentSuccess={handleSuccessfulPayment}
          />
        </form>

        {/* Right Column - Order Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <OrderSummary
            onOrderNotesChange={setOrderNotes}
            orderNotes={orderNotes}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
