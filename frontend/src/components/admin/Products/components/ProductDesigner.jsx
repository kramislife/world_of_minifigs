import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useGetDesignersQuery } from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { AlertCircle, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

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

  if (!data?.designers || data.designers.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-5">
          <Label className="text-lg font-semibold">Product Designer</Label>
        </div>
        <Link to="/admin/new-designer">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg space-y-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <Plus size={24} className="text-gray-400" />
            <p className="text-gray-500 text-center">
              No designers available. Click to add designers.
            </p>
          </div>
        </Link>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2 text-red-500 p-4 border rounded-lg">
        <AlertCircle size={20} />
        <p>Error loading designers. Please try again later.</p>
      </div>
    );
  }

  return (
    <Card className="w-full shadow-none border-none bg-transparent">
      <CardContent className="p-0">
        <Label className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          Product Designer
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data?.designers?.map((designer) => (
            <label
              key={designer._id}
              htmlFor={designer._id}
              className={`flex items-center justify-center p-4 rounded-lg border hover:shadow-sm transition-shadow cursor-pointer ${
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
      </CardContent>
    </Card>
  );
};

export default ProductDesigner;
