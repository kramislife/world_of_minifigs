import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AdditionalInformation = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seller Input */}
        <div className="space-y-2">
          <Label htmlFor="seller" className="text-lg font-semibold">Seller</Label>
          <Input
            id="seller"
            name="seller"
            value={formData.seller}
            onChange={onChange}
            placeholder="Enter seller name"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
          />
        </div>

        {/* Manufacturer Input */}
        <div className="space-y-2">
          <Label htmlFor="manufacturer" className="text-lg font-semibold">Manufacturer</Label>
          <Input
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={onChange}
            placeholder="Enter manufacturer"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
          />
        </div>
      </div>

      {/* Tags Input */}
      <div className="space-y-2">
        <Label htmlFor="tags" className="text-lg font-semibold">Tags</Label>
        <Input
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={onChange}
          placeholder="Enter tags separated by commas"
          className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
        />
      </div>
    </section>
  );
};

export default AdditionalInformation;
