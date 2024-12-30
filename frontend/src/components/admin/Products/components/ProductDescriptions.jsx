import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, ListChecks, Info } from "lucide-react";

const ProductDescriptions = ({ formData, onChange }) => {
  const descriptions = [
    {
      id: "description1",
      name: "description1",
      label: "Main Description",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      placeholder: "Enter the main product description...",
    },
    {
      id: "description2",
      name: "description2",
      label: "Features & Highlights",
      icon: <ListChecks className="h-5 w-5 text-green-600" />,
      placeholder: "List key features and highlights...",
    },
    {
      id: "description3",
      name: "description3",
      label: "Additional Details",
      icon: <Info className="h-5 w-5 text-purple-600" />,
      placeholder: "Add any additional important information...",
    },
  ];

  return (
    <section className="space-y-6">
      {descriptions.map((desc) => (
        <div key={desc.id} className="space-y-2">
          <div className="space-y-1">
            <Label
              htmlFor={desc.id}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              {desc.icon}
              {desc.label}
            </Label>
            <p className="text-sm text-gray-400 ml-7">{desc.subtitle}</p>
          </div>
          <Textarea
            id={desc.id}
            name={desc.name}
            value={formData[desc.id]}
            onChange={onChange}
            placeholder={desc.placeholder}
            className="resize-none h-24 w-full border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
            required
          />
        </div>
      ))}
    </section>
  );
};

export default ProductDescriptions;
