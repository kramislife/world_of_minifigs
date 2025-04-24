import React from "react";
import Select from "react-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Loader2 } from "lucide-react";
import { useAddressForm } from "@/hooks/Payment/useAddressForm";

const AddressForm = ({ isEdit = false, editAddress = null, userName = "" }) => {
  const {
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
    formatOptionLabel,
  } = useAddressForm({ isEdit, editAddress, userName });

  const twoColumnFields = [
    {
      id: "name",
      label: "Address Label",
      placeholder: "Home, Work, etc.",
      type: "text",
    },
    {
      id: "contact_number",
      label: "Phone Number",
      placeholder: "Enter Phone Number",
      type: "tel",
    },
  ];

  const singleColumnFields = [
    {
      id: "address_line1",
      label: "Street Address",
      placeholder: "Enter Street Address",
      type: "text",
    },
    {
      id: "address_line2",
      label: "Apartment, suite, etc. (optional)",
      placeholder: "Enter Apartment, suite, etc.",
      type: "text",
    },
  ];

  const threeColumnFields = [
    {
      id: "city",
      label: "City",
      placeholder: "Enter City",
      type: "text",
    },
    {
      id: "state",
      label: "State/Province",
      placeholder: "Enter State/Province",
      type: "text",
    },
    {
      id: "postal_code",
      label: "Postal Code",
      placeholder: "Enter Postal Code",
      type: "text",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={`flex items-center gap-2 text-background hover:text-background/80 ${
          isEdit ? "opacity-0 group-hover:opacity-100" : ""
        }`}
      >
        {isEdit ? (
          <Pencil className="w-4 h-4 text-blue-500 hover:scale-110 transition-all duration-300" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
        <span>{isEdit ? "" : "Add Address"}</span>
      </DialogTrigger>

      <DialogDescription className="sr-only">
        {isEdit ? "Edit Address" : "Add a New Address"}
      </DialogDescription>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit address" : "Add a new address"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Country Selector */}
            <div className="space-y-2">
              <Label className="text-background">Country</Label>
              <Select
                options={countryOptions}
                value={userCountry}
                onChange={(option) => {
                  setUserCountry(option);
                  handleFieldChange("country", option.label);
                }}
                styles={customStyles}
                placeholder="Select Country"
                formatOptionLabel={formatOptionLabel}
                required
              />
            </div>

            {/* Two Column Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {twoColumnFields.map(({ id, label, placeholder, type }) => (
                <div key={id} className="space-y-2">
                  <Label htmlFor={id} className="text-background">
                    {label}
                  </Label>
                  <Input
                    id={id}
                    type={type}
                    value={formData[id]}
                    onChange={(e) => handleFieldChange(id, e.target.value)}
                    placeholder={placeholder}
                    required
                  />
                </div>
              ))}
            </div>

            {/* Single Column Fields */}
            {singleColumnFields.map(({ id, label, placeholder, type }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id} className="text-background">
                  {label}
                </Label>
                <Input
                  id={id}
                  type={type}
                  value={formData[id]}
                  onChange={(e) => handleFieldChange(id, e.target.value)}
                  placeholder={placeholder}
                  required={id === "address_line1"}
                />
              </div>
            ))}

            {/* Three Column Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {threeColumnFields.map(({ id, label, placeholder, type }) => (
                <div key={id} className="space-y-2">
                  <Label htmlFor={id} className="text-background">
                    {label}
                  </Label>
                  <Input
                    id={id}
                    type={type}
                    value={formData[id]}
                    onChange={(e) => handleFieldChange(id, e.target.value)}
                    placeholder={placeholder}
                    required
                  />
                </div>
              ))}
            </div>

            {/* Default Address Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_default"
                checked={formData.is_default}
                onCheckedChange={(checked) =>
                  handleFieldChange("is_default", checked)
                }
                className="border-white"
              />
              <Label htmlFor="is_default" className="text-background">
                Set as default address
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              variant="submit"
              type="submit"
              className="w-full"
              disabled={isCreating || isUpdating}
            >
              {(isCreating || isUpdating) && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {isEdit
                ? isUpdating
                  ? "Updating address..."
                  : "Update address"
                : isCreating
                ? "Adding address..."
                : "Add address"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressForm;
