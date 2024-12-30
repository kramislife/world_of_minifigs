import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useGetDesignersQuery } from "@/redux/api/productApi";
import { toast } from "react-toastify";

const ACTIVE_COLOR = "bg-blue-500 text-white";
const DEFAULT_COLOR =
  "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";

const ProductDesigner = ({ formData, onChange }) => {
  const { data, isError, error } = useGetDesignersQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  return (
    <section className="space-y-6">
      <Label className="text-lg font-semibold">Product Designer</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data?.designers?.map((designer) => (
          <label
            key={designer._id}
            htmlFor={designer._id}
            className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              formData.productDesigner === designer._id
                ? ACTIVE_COLOR
                : DEFAULT_COLOR
            }`}
          >
            <input
              type="radio"
              id={designer._id}
              name="productDesigner"
              value={designer._id}
              checked={formData.productDesigner === designer._id}
              onChange={onChange}
              className="hidden"
            />
            <span className="text-sm font-medium">{designer.name}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default ProductDesigner;
