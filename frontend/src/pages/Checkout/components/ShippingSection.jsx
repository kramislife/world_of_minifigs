import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, HomeIcon, Loader2 } from "lucide-react";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { FORM_FIELDS } from "@/constant/paymentMethod";
import AddressForm from "./AddressForm";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";
import { useCheckout } from "@/hooks/Payment/useCheckout";

// If there are no addresses, show this EmptyAddressState component
const EmptyAddressState = () => (
  <div className="flex flex-col items-center justify-center pt-5">
    <HomeIcon className="w-14 h-14 text-gray-400 animate-bounce" />
    <h3 className="text-xl font-semibold mb-3 text-background">
      No addresses found
    </h3>
    <p className="text-sm text-gray-300 text-center">
      Add a new address to continue with checkout and complete your purchase
    </p>
  </div>
);

// Show this LoadingState whenever the addresses are being fetched or updated
const LoadingState = () => <LoadingSpinner height="0px" />;

// AddressHeader component to show the radio button and address (Default tag or Shipping tag)
const AddressHeader = ({ addr, selectedAddress }) => (
  <div className="flex items-center gap-2">
    <input
      type="radio"
      checked={selectedAddress?._id === addr._id}
      onChange={() => {}}
      className="w-4 h-4 text-accent bg-transparent border-2 border-accent/50 
        focus:ring-accent focus:ring-offset-0 focus:ring-1 focus:ring-opacity-50 
        checked:bg-accent checked:border-accent 
        accent-accent"
      onClick={(e) => e.stopPropagation()}
    />
    <span className="font-medium capitalize text-background">
      {addr.name || "Other"}
    </span>
    {addr.is_default && <Badge variant="info">Default</Badge>}
    {selectedAddress?._id === addr._id && !addr.is_default && (
      <Badge variant="success">Shipping Address</Badge>
    )}
  </div>
);

// AddressDetails component to show the contact number and address
const AddressDetails = ({ addr, formatAddress }) => (
  <div className="flex items-baseline gap-2 mt-2 lg:ml-6">
    <span className="text-blue-400 text-sm font-medium whitespace-nowrap">
      {addr.contact_number}
    </span>
    <span className="text-gray-300">•</span>
    <span className="text-sm">{formatAddress(addr)}</span>
  </div>
);

// AddressActions component for editing and deleting address
const AddressActions = ({ addr, handleDeleteClick, userName }) => (
  <div className="absolute right-4 top-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
    <AddressForm
      formFields={FORM_FIELDS.ADDRESS}
      isEdit={true}
      editAddress={addr}
      userName={userName}
    />
    <DeleteDialog
      onConfirm={() => handleDeleteClick(addr)}
      title="Delete Address"
      description={
        <>
          Are you sure you want to delete{" "}
          <span className="font-medium text-accent">
            {addr.name || "Other"}{" "}
          </span>
          address? This action cannot be undone.
        </>
      }
    />
  </div>
);

// DefaultAddressButton component to set the selected address as default
const DefaultAddressButton = ({
  selectedAddress,
  handleMakeDefault,
  isUpdatingDefault,
}) => (
  <Button
    variant="submit"
    onClick={(e) => handleMakeDefault(selectedAddress, e)}
    className="w-full"
    disabled={isUpdatingDefault}
  >
    {isUpdatingDefault ? (
      <>
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        Setting as default...
      </>
    ) : (
      "Set as default address"
    )}
  </Button>
);

// AddressCard Section for all sections (Header Tag, Address Details, and AddressActions)
const AddressCard = ({
  addr,
  selectedAddress,
  handleAddressSelect,
  handleDeleteClick,
  formatAddress,
  userName,
}) => (
  <div
    key={addr._id}
    onClick={() => handleAddressSelect(addr)}
    className={`group relative rounded-lg transition-all duration-200 cursor-pointer p-4 text-background
      ${
        selectedAddress?._id === addr._id
          ? " border border-blue-500/50"
          : addr.is_default
          ? " border border-brand-end/50"
          : "hover:bg-brand-dark/20 border border-brand-end/50"
      }
    `}
  >
    <div className="flex items-center">
      <div className="flex-grow">
        <AddressHeader addr={addr} selectedAddress={selectedAddress} />
        <AddressDetails addr={addr} formatAddress={formatAddress} />
      </div>
      <AddressActions
        addr={addr}
        handleDeleteClick={handleDeleteClick}
        userName={userName}
      />
    </div>
  </div>
);

const ShippingSection = ({ userName }) => {
  const {
    userAddresses,
    isLoadingAddresses,
    isFetchingAddresses,
    selectedAddress,
    handleAddressSelect,
    formatAddress,
    handleMakeDefault,
    isUpdatingDefault,
    handleDeleteAddress,
    isDeleting,
  } = useCheckout();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            <CardTitle className="text-white text-lg">
              Shipping Address
            </CardTitle>
          </div>
          <AddressForm formFields={FORM_FIELDS.ADDRESS} userName={userName} />
        </div>
        <CardDescription className="text-gray-400 sr-only">
          Enter your shipping address
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 md:px-5">
        {isLoadingAddresses || isFetchingAddresses ? (
          <LoadingState />
        ) : !userAddresses?.length ? (
          <EmptyAddressState />
        ) : (
          <div className="space-y-3">
            {userAddresses?.map((addr) => (
              <AddressCard
                key={addr._id}
                addr={addr}
                selectedAddress={selectedAddress}
                handleAddressSelect={handleAddressSelect}
                handleDeleteClick={handleDeleteAddress}
                handleMakeDefault={handleMakeDefault}
                formatAddress={formatAddress}
                userName={userName}
              />
            ))}

            {selectedAddress && !selectedAddress.is_default && (
              <DefaultAddressButton
                selectedAddress={selectedAddress}
                handleMakeDefault={handleMakeDefault}
                isUpdatingDefault={isUpdatingDefault}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingSection;
