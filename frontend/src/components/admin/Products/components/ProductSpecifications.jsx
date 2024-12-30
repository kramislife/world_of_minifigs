import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ProductSpecifications = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {formData.specifications.map((spec) => (
          <div key={spec.name} className="space-y-2">
            <Label htmlFor={spec.name} className="text-lg font-semibold">
              {spec.name.charAt(0).toUpperCase() + spec.name.slice(1).replace('_', ' ')}
            </Label>
            <Input
              id={spec.name}
              name={spec.name}
              type="number"
              value={spec.value}
              onChange={(e) => {
                const value = e.target.value;
                onChange({
                  target: {
                    name: spec.name,
                    value: value
                  }
                });
              }}
              placeholder="0"
              className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
              required
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSpecifications;
