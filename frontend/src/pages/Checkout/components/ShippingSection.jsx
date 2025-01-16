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

const ShippingSection = ({
  address,
  onAddressChange,
  userName,
  onDeleteClick,
}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [updateAddress, { isLoading: isUpdatingDefault }] =
    useUpdateAddressMutation();
  // const [isSettingShipping, setIsSettingShipping] = useState(false);
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
      // Find default address or keep current selection
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
  }, [userAddresses]); // Only depend on userAddresses

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

  const handleDeleteClick = (addr, e) => {
    e.stopPropagation(); // Prevent address selection
    onDeleteClick(addr); // Call the parent handler
  };

  const handleMakeDefault = async (addr, e) => {
    e.stopPropagation();
    try {
      const response = await updateAddress({
        id: addr._id,
        addressData: {
          // Include all existing address fields
          name: addr.name,
          contact_number: addr.contact_number,
          address_line1: addr.address_line1,
          address_line2: addr.address_line2,
          city: addr.city,
          state: addr.state,
          postal_code: addr.postal_code,
          country: addr.country,
          country_code: addr.country_code,
          is_default: true, // Set this address as default
        },
      }).unwrap();

      if (response.success) {
        toast.success(response.message);
        await refetchAddresses();
      }
    } catch (error) {
      // Log the full error
      console.error("Error setting default address:", error);
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to set default address"
      );
    }
  };

  // const handleUseAddress = async (addr, e) => {
  //   e.stopPropagation();
  //   setIsSettingShipping(true);
  //   try {
  //     handleAddressSelect(addr);
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     await refetchAddresses();
  //     toast.success("Shipping address set successfully");
  //   } catch (error) {
  //     toast.error("Failed to set shipping address");
  //   } finally {
  //     setIsSettingShipping(false);
  //   }
  // };

  return (
    <Card className="bg-darkBrand/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <MapPin className="w-5 h-5 text-blue-400" />
            Shipping Address
          </CardTitle>
          <AddressForm
            address={address}
            onAddressChange={onAddressChange}
            formFields={FORM_FIELDS.ADDRESS}
            className="w-full"
            userName={userName}
          />
        </div>
        <CardDescription className="text-gray-400 lg:ml-7 sr-only">
          Enter your shipping address
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading || isFetching ? (
          <div className="flex justify-center items-center py-8">
            <LoadingSpinner />
          </div>
        ) : !userAddresses?.length ? (
          <div className="flex flex-col items-center justify-center pt-12">
            <HomeIcon className="w-14 h-14 mb-4 text-gray-500 animate-bounce" />
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              No addresses found
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-sm leading-relaxed">
              Add a new address to continue with checkout and complete your
              purchase
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {userAddresses?.map((addr) => (
              <div
                key={addr._id}
                onClick={() => handleAddressSelect(addr)}
                className={`group relative rounded-lg transition-all duration-200 cursor-pointer p-4 text-white
                  ${
                    selectedAddress?._id === addr._id
                      ? "bg-darkBrand/20 border border-blue-500/50"
                      : addr.is_default
                      ? "bg-darkBrand/20 border border-white/10"
                      : "hover:bg-darkBrand/30 border border-transparent hover:border-white/5"
                  }
                `}
              >
                <div className="flex items-center">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={selectedAddress?._id === addr._id}
                        onChange={() => handleAddressSelect(addr)}
                        className="w-4 h-4 text-blue-600 bg-transparent border-2 border-blue-600/50 
                          focus:ring-blue-600 focus:ring-offset-0 focus:ring-1 focus:ring-opacity-50 
                          checked:bg-blue-600 checked:border-blue-600 
                          accent-blue-600"
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
                      {selectedAddress?._id === addr._id &&
                        !addr.is_default && (
                          <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                            Shipping Address
                          </span>
                        )}
                    </div>
                    <div className="mt-2 lg:ml-6">
                      <div className="flex gap-2 items-start">
                        <span className="text-blue-400 text-sm font-medium whitespace-nowrap mt-1">
                          {addr.contact_number}
                        </span>
                        <span className="text-gray-500 mt-0.5">•</span>
                        <span className="text-gray-300 text-sm leading-loose">
                          {formatAddress(addr)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Edit and Delete Buttons */}
                  <div className="absolute right-4 top-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
                    <AddressForm
                      address={address}
                      onAddressChange={onAddressChange}
                      formFields={FORM_FIELDS.ADDRESS}
                      isEdit={true}
                      editAddress={addr}
                      userName={userName}
                    />
                    <button
                      onClick={(e) => handleDeleteClick(addr, e)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Use Address and Make Default Buttons */}
            {selectedAddress && !selectedAddress.is_default && (
              <div className="pt-5 space-y-3 border-t border-gray-700">
                {/* <button
                  onClick={(e) => handleUseAddress(selectedAddress, e)}
                  disabled={isSettingShipping}
                  className="w-full py-2.5 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSettingShipping ? (
                    <>
                      <LoadingSpinner className="w-4 h-4" />
                      Setting shipping address...
                    </>
                  ) : (
                    "Use address for shipping"
                  )}
                </button> */}

                <div className="flex items-center justify-center gap-2">
                  <Button
                    onClick={(e) => handleMakeDefault(selectedAddress, e)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12"
                    disabled={isUpdatingDefault}
                  >
                    {isUpdatingDefault
                      ? "Setting as default..."
                      : "Set as default address"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingSection;
