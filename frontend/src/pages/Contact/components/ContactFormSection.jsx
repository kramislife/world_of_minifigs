import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

const ContactFormSection = ({
  formData,
  isLoading,
  handleChange,
  handleCheckboxChange,
  handleSubmit,
}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-2 bg-white p-8 md:p-10 rounded-2xl shadow-lg self-start"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Send us a message
        </h2>
        <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
          <Clock className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">
            24hr Response
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="h-12 bg-white border-gray-300"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="h-12 bg-white border-gray-300"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <Input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this regarding?"
            className="h-12 bg-white border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-gray-700"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            className="min-h-[150px] bg-white border-gray-300 resize-none"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="privacy"
            checked={formData.agreeToPrivacyPolicy}
            onCheckedChange={handleCheckboxChange}
          />
          <label htmlFor="privacy" className="text-sm text-gray-600">
            I agree to the{" "}
            <Link
              to="/privacy-policy"
              className="text-yellow-500 hover:text-yellow-600"
            >
              Privacy Policy
            </Link>{" "}
            and consent to having my data processed.
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
