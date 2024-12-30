import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useGetSkillLevelsQuery } from "@/redux/api/productApi";
import { toast } from "react-toastify";

const ACTIVE_COLORS = {
  0: "bg-green-500 text-white",
};

const DEFAULT_COLOR =
  "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";

const SkillLevel = ({ formData, onChange }) => {
  const { data, isError, error } = useGetSkillLevelsQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  return (
    <section className="space-y-6">
      <Label className="text-lg font-semibold">Skill Level</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data?.skillLevels?.map((skillLevel) => (
          <label
            key={skillLevel._id}
            htmlFor={skillLevel._id}
            className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              formData.skillLevel === skillLevel._id
                ? ACTIVE_COLORS[0]
                : DEFAULT_COLOR
            }`}
          >
            <input
              type="radio"
              id={skillLevel._id}
              name="skillLevel"
              value={skillLevel._id}
              checked={formData.skillLevel === skillLevel._id}
              onChange={onChange}
              className="hidden"
            />
            <span className="text-sm font-medium">{skillLevel.name}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default SkillLevel;
