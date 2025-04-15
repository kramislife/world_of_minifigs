import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AdditionalInformation = ({ formData, onChange }) => {
  const fields = [
    {
      id: "seller",
      label: "Seller",
      placeholder: "Enter seller name",
      colSpan: "md:col-span-1",
    },
    {
      id: "manufacturer",
      label: "Manufacturer",
      placeholder: "Enter manufacturer",
      colSpan: "md:col-span-1",
    },
    {
      id: "tags",
      label: "Tags",
      placeholder: "Enter tags separated by commas",
      colSpan: "md:col-span-2",
    },
  ];

  const renderField = (field) => (
    <div key={field.id} className={`space-y-2 ${field.colSpan}`}>
      <Label htmlFor={field.id} className="text-lg font-semibold">
        {field.label}
      </Label>
      <Input
        id={field.id}
        name={field.id}
        value={formData[field.id]}
        onChange={onChange}
        placeholder={field.placeholder}
      />
    </div>
  );

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(renderField)}
      </div>
    </section>
  );
};

export default AdditionalInformation;
