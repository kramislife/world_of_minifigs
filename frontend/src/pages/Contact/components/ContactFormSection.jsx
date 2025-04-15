import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { contactAnimations } from "@/hooks/Animation/animationConfig";

const ContactFormSection = ({
  formData,
  isLoading,
  handleChange,
  handleCheckboxChange,
  handleSubmit,
}) => {
  const inputFields = [
    {
      id: "name",
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
      gridSpan: "md:col-span-1",
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      gridSpan: "md:col-span-1",
    },
    {
      id: "subject",
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "What is this regarding?",
      required: false,
      gridSpan: "md:col-span-2",
    },
  ];

  return (
    <motion.div
      className="lg:col-span-2 bg-white border p-5 md:p-8 rounded-2xl self-start"
      variants={contactAnimations.formVariants}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Send us a message
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {inputFields.map((field) => (
            <div key={field.id} className={`space-y-2 ${field.gridSpan}`}>
              <label
                htmlFor={field.id}
                className="text-sm font-medium text-foreground"
              >
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <Input
                id={field.id}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                className="border border-input"
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-foreground"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            className="min-h-[210px] border border-input"
            required
          />
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="privacy"
            checked={formData.agreeToPrivacyPolicy}
            onCheckedChange={handleCheckboxChange}
            className="mt-1"
          />
          <label
            htmlFor="privacy"
            className="text-sm text-foreground leading-6"
          >
            By proceeding, you acknowledge that you have read, understood, and
            agree to our{" "}
            <Link
              to="/privacy-policy"
              className="text-accent"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              to="/terms-of-use"
              className="text-accent"
            >
              Terms of Use.
            </Link>{" "}
          </label>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !formData.agreeToPrivacyPolicy}
          className="w-full h-12 bg-accent hover:bg-accent-secondary text-gray-900 font-medium transition-colors duration-300"
        >
          <Send className="w-4 h-4 mr-2" />
          {isLoading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactFormSection;
