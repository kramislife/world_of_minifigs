import React, { useState } from "react";
import { toast } from "react-toastify";
import { useContactMutation } from "@/redux/api/authApi";
import Metadata from "@/components/layout/Metadata/Metadata";
import ContactHeroSection from "./components/ContactHeroSection";
import ContactFormSection from "./components/ContactFormSection";
import SideContentSection from "./components/SideContentSection";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agreeToPrivacyPolicy: false,
  });
  const [contact, { isLoading }] = useContactMutation();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      agreeToPrivacyPolicy: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToPrivacyPolicy) {
      toast.error("Please agree to the Privacy Policy");
      return;
    }

    try {
      const response = await contact(formData).unwrap();
      toast.success(response.message);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        agreeToPrivacyPolicy: false,
      });
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <Metadata title="Contact Us" />
      <ContactHeroSection />

      {/* Main Content */}
      <div className="px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <ContactFormSection
            formData={formData}
            isLoading={isLoading}
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
          />
          <SideContentSection />
        </div>
      </div>
    </>
  );
};

export default Contact;
