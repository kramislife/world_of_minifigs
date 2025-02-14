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

  const validateForm = (data) => {
    const requiredFields = {
      contact_number: "Phone number",
      address_line1: "Street address",
      city: "City",
      state: "State/Province",
      postal_code: "Postal code",
      country: "Country",
    };

    const missingFields = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!data[field] || data[field].trim() === "") {
        missingFields.push(label);
      }
    }

    // Phone number validation
    if (data.contact_number) {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(data.contact_number)) {
        return {
          isValid: false,
          error: "Please enter a valid phone number (e.g., +1234567890)",
        };
      }
    }

    // Postal code validation (basic)
    if (data.postal_code) {
      const postalRegex = /^[A-Z0-9]{3,10}$/i;
      if (!postalRegex.test(data.postal_code)) {
        return {
          isValid: false,
          error:
            "Please enter a valid postal code (3-10 characters, letters and numbers only)",
        };
      }
    }

    if (missingFields.length > 0) {
      return {
        isValid: false,
        error: `Please fill in the following required fields:\n${missingFields.join(
          "\n• "
        )}`,
      };
    }

    return { isValid: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addressData = {
        ...formData,
        name: formData.name || "Home",
      };

      // Validate form before submission
      const validation = validateForm(addressData);
      if (!validation.isValid) {
        toast.error(validation.error || "Invalid form data");
        return;
      }

      const response = isEdit
        ? await updateAddress({ id: editAddress._id, addressData }).unwrap()
        : await createAddress(addressData).unwrap();

      toast.success(response.message || "Address added successfully");
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
