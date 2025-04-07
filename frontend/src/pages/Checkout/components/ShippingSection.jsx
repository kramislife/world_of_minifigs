import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FORM_FIELDS } from "@/constant/paymentMethod";
import { MapPin, Trash2, HomeIcon } from "lucide-react";
import AddressForm from "./AddressForm";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import {
  useGetUserAddressesQuery,
  useUpdateAddressMutation,
} from "@/redux/api/userApi";
import { toast } from "react-toastify";

// If there are no addresses, show this EmptyAddressState component
const EmptyAddressState = () => (
  <div className="flex flex-col items-center justify-center pt-12">
    <HomeIcon className="w-14 h-14 mb-4 text-gray-400 animate-bounce" />
    <h3 className="text-xl font-semibold mb-3 text-white">
      No addresses found
    </h3>
    <p className="text-sm text-gray-300 text-center max-w-lg leading-relaxed">
      Add a new address to continue with checkout and complete your purchase
    </p>
  </div>
);

// Show this LoadingState whenever the addresses are being fetched or updated
const LoadingState = () => (
  <div className="flex justify-center items-center py-8">
    <LoadingSpinner />
  </div>
);

// Section Header Component (Icon, Shipping Address Title, and add AddressForm)
const SectionHeader = ({ userName }) => (
  <div className="flex items-center justify-between">
    <CardTitle className="text-white flex items-center gap-2 text-lg">
      <MapPin className="w-5 h-5 text-accent" />
      Shipping Address
    </CardTitle>
    <AddressForm
      formFields={FORM_FIELDS.ADDRESS}
      className="w-full"
      userName={userName}
    />
  </div>
);

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
    <span className="font-medium capitalize text-white">
      {addr.name || "Other"}
    </span>
    {addr.is_default && (
      <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full font-medium">
        Default
      </span>
    )}
    {selectedAddress?._id === addr._id && !addr.is_default && (
      <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
        Shipping Address
      </span>
    )}
  </div>
);

// AddressDetails component to show the contact number and address
const AddressDetails = ({ addr, formatAddress }) => (
  <div className="mt-2 lg:ml-6">
    <div className="flex gap-2 items-start">
      <span className="text-blue-400 text-sm font-medium whitespace-nowrap mt-1">
        {addr.contact_number}
      </span>
      <span className="text-gray-300 mt-0.5">•</span>
      <span className="text-sm leading-loose">
        {formatAddress(addr)}
      </span>
    </div>
  </div>
);

// AddressActions component for editing and deleting address
const AddressActions = ({ addr, handleDeleteClick, userName }) => (
  <div className="absolute right-4 top-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
    <AddressForm
      formFields={FORM_FIELDS.ADDRESS}
      isEdit={true}
      editAddress={addr}
      userName={userName}
    />
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDeleteClick(addr);
      }}
      className="text-red-500 hover:scale-110 transition-all duration-200"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
);

// DefaultAddressButton component to set the selected address as default
const DefaultAddressButton = ({
  selectedAddress,
  handleMakeDefault,
  isUpdatingDefault,
}) => (
  <div className="pt-5 space-y-3 border-t border-brand-end/50 last:border-0 last:pt-0">
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="accent"
        onClick={(e) => handleMakeDefault(selectedAddress, e)}
        className="w-full h-12"
        disabled={isUpdatingDefault}
      >
        {isUpdatingDefault ? "Setting as default..." : "Set as default address"}
      </Button>
    </div>
  </div>
);

// AddressCard Section for all sections (Header Tag, Address Details, and AddressActions)
const AddressCard = ({
  addr,
  selectedAddress,
  handleAddressSelect,
  handleDeleteClick,
  handleMakeDefault,
  formatAddress,
  userName,
}) => (
  <div
    key={addr._id}
    onClick={() => handleAddressSelect(addr)}
    className={`group relative rounded-lg transition-all duration-200 cursor-pointer p-4 text-white
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

const ShippingSection = ({ onAddressChange, userName, onDeleteClick }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [updateAddress, { isLoading: isUpdatingDefault }] =
    useUpdateAddressMutation();
  const {
    data: userAddresses,
    isLoading,
    isFetching,
    refetch: refetchAddresses,
  } = useGetUserAddressesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (userAddresses?.length > 0) {
      const defaultAddress =
        userAddresses.find((addr) => addr.is_default) ||
        userAddresses.find((addr) => addr._id === selectedAddress?._id) ||
        userAddresses[0];

      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
        if (onAddressChange) {
          onAddressChange("selectedAddress", defaultAddress);
        }
      }
    }
  }, [userAddresses]);

  const handleAddressSelect = (addr) => {
    const updatedAddr = userAddresses.find((a) => a._id === addr._id) || addr;
    setSelectedAddress(updatedAddr);
    if (onAddressChange) {
      onAddressChange("selectedAddress", updatedAddr);
    }
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

  const handleDeleteClick = (addr) => {
    onDeleteClick(addr, refetchAddresses);
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

  return (
    <Card className="bg-brand-dark/20 border border-brand-end/50">
      <CardHeader>
        <SectionHeader userName={userName} />
        <CardDescription className="text-gray-400 lg:ml-7 sr-only">
          Enter your shipping address
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading || isFetching ? (
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
                handleDeleteClick={handleDeleteClick}
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
