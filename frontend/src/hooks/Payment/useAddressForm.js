import { useState, useEffect } from "react";
import { useCountries } from "@/hooks/Payment/useCountries";
import {
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useGetUserAddressesQuery,
} from "@/redux/api/userApi";
import { toast } from "react-toastify";

export const useAddressForm = ({ isEdit, editAddress, userName }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    is_default: false,
    full_name: userName,
  });

  const [open, setOpen] = useState(false);
  const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
  const { refetch: refetchAddresses } = useGetUserAddressesQuery();

  const { userCountry, setUserCountry, countryOptions, customStyles } =
    useCountries((countryLabel) => handleFieldChange("country", countryLabel));

  useEffect(() => {
    if (open && isEdit && editAddress) {
      setFormData({
        ...editAddress,
        full_name: editAddress.full_name || userName,
      });
    }
  }, [open, isEdit, editAddress, userName]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addressData = {
        ...formData,
        name: formData.name || "Home",
      };

      const response = isEdit
        ? await updateAddress({ id: editAddress._id, addressData }).unwrap()
        : await createAddress(addressData).unwrap();

      toast.success(response.message);
      await refetchAddresses();
      setOpen(false);

      setFormData({
        name: "",
        contact_number: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        is_default: false,
        full_name: userName,
      });
    } catch (error) {
      toast.error(
        error.data?.message || `Failed to ${isEdit ? "update" : "add"} address`
      );
    }
  };

  return {
    formData,
    handleFieldChange,
    handleSubmit,
    open,
    setOpen,
    isCreating,
    isUpdating,
    userCountry,
    setUserCountry,
    countryOptions,
    customStyles,
  };
};