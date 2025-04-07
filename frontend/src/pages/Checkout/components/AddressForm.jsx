import React from "react";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddressForm } from "@/hooks/Payment/useAddressForm";
import { DialogDescription } from "@radix-ui/react-dialog";

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
  } = useAddressForm({ isEdit, editAddress, userName });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={`flex items-center gap-2 text-blue-500 hover:scale-110 transition-all duration-200 ${
          isEdit ? "opacity-0 group-hover:opacity-100" : ""
        }`}
      >
        {isEdit ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        <span>{isEdit ? "" : "Add Address"}</span>
      </DialogTrigger>
      <DialogDescription className="sr-only">
        {isEdit ? "Edit address" : "Add a new address"}
      </DialogDescription>
      <DialogContent className="bg-brand-start border border-brand-end/50 text-white max-w-3xl max-h-[95vh] overflow-y-auto scrollbar-none p-4 w-[95vw] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium text-accent text-start mb-5">
            {isEdit ? "Edit address" : "Add a new address"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* SelectCountry */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white block mb-1">
                Country
              </label>
              <Select
                options={countryOptions}
                value={userCountry}
                onChange={(option) => {
                  setUserCountry(option);
                  handleFieldChange("country", option.label);
                }}
                styles={customStyles}
                placeholder="Select Country"
                formatOptionLabel={({ label, flag }) => (
                  <div className="flex items-center gap-2">
                    <span>{flag}</span>
                    <span className="text-sm">{label}</span>
                  </div>
                )}
                required
              />
            </div>

            {/* Top row - Address Label and Phone Number in two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-white block mb-1"
                >
                  Address Label {true && <span className="text-accent">*</span>}
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  required={true}
                  placeholder="Home, Work, etc."
                  className="bg-transparent text-white placeholder:text-white/50 border border-brand-end/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact_number"
                  className="text-sm font-medium text-white block mb-1"
                >
                  Phone Number <span className="text-accent">*</span>
                </label>
                <Input
                  id="contact_number"
                  type="tel"
                  value={formData.contact_number}
                  onChange={(e) =>
                    handleFieldChange("contact_number", e.target.value)
                  }
                  required={true}
                  placeholder="Enter Phone Number"
                  className="bg-transparent text-white placeholder:text-white/50 border border-brand-end/50"
                />
              </div>
            </div>

            {/* Address Lines */}
            <div className="space-y-2">
              <label
                htmlFor="address_line1"
                className="text-sm font-medium text-white block mb-1"
              >
                Street Address <span className="text-accent">*</span>
              </label>
              <Input
                id="address_line1"
                type="text"
                value={formData.address_line1}
                onChange={(e) =>
                  handleFieldChange("address_line1", e.target.value)
                }
                required={true}
                placeholder="Enter Street Address"
                className="bg-transparent text-white placeholder:text-white/50 border border-brand-end/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="address_line2"
                className="text-sm font-medium text-white block mb-1"
              >
                Apartment, suite, etc. (optional)
              </label>
              <Input
                id="address_line2"
                type="text"
                value={formData.address_line2}
                onChange={(e) =>
                  handleFieldChange("address_line2", e.target.value)
                }
                placeholder="Enter Apartment, suite, etc."
                className="bg-transparent text-white placeholder:text-white/50 border border-brand-end/50"
              />
            </div>

            {/* City, State, Postal Code grid - responsive for smaller screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-white block mb-1"
                >
                  City <span className="text-accent">*</span>
                </label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleFieldChange("city", e.target.value)}
                  required={true}
                  placeholder="Enter City"
                  className="bg-transparent text-white placeholder:text-white/50 border border-brand-end/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="state"
                  className="text-sm font-medium text-white block mb-1"
                >
                  State/Province <span className="text-accent">*</span>
                </label>
                <Input
                  id="state"
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleFieldChange("state", e.target.value)}
                  required={true}
                  placeholder="Enter State/Province"
                  className="bg-transparent text-white placeholder:text-white/50 border border-brand-end/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="postal_code"
                  className="text-sm font-medium text-white block mb-1"
                >
                  Postal Code <span className="text-accent">*</span>
                </label>
                <Input
                  id="postal_code"
                  type="text"
                  value={formData.postal_code}
                  onChange={(e) =>
                    handleFieldChange("postal_code", e.target.value)
                  }
                  required={true}
                  placeholder="Enter Postal Code"
                  className="bg-transparent text-white placeholder:text-white/50 border border-brand-end/50"
                />
              </div>
            </div>

            {/* Setting the address as default */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_default"
                checked={formData.is_default}
                onCheckedChange={(checked) =>
                  handleFieldChange("is_default", checked)
                }
                className="border-white/10 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <label
                htmlFor="is_default"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              >
                Set as default address
              </label>
            </div>

            {/* Submit Button */}
            <Button
              variant="accent"
              type="submit"
              className="w-full h-12"
              disabled={isCreating || isUpdating}
            >
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
