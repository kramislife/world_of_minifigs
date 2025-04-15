import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { contactAnimations } from "@/hooks/Animation/animationConfig";
import { Label } from "@/components/ui/label";

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

  const legalLinks = [
    {
      label: "Privacy Policy",
      to: "/privacy-policy",
    },
    {
      label: "Terms of Use",
      to: "/terms-of-use",
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
              <Label htmlFor={field.id}>
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id={field.id}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            Message <span className="text-red-500">*</span>
          </Label>
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
          <Label htmlFor="privacy" className="font-normal leading-6">
            By proceeding, you acknowledge that you have read, understood, and
            agree to our{" "}
            {legalLinks.map((link, index) => (
              <span key={link.to}>
                <Link to={link.to} className="text-accent">
                  {link.label}
                </Link>
                {index === 0 ? " and " : ""}
              </span>
            ))}
          </Label>
        </div>

        <Button
          variant="accent"
          type="submit"
          disabled={isLoading || !formData.agreeToPrivacyPolicy}
          className="w-full"
        >
          <Send className="w-4 h-4 mr-2" />
          {isLoading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactFormSection;
