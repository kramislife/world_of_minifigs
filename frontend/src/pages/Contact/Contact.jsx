import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Github,
} from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import { motion } from "framer-motion";
import Metadata from "@/components/layout/Metadata/Metadata";
import { toast } from "react-toastify";
import { useContactMutation } from "@/redux/api/authApi";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agreeToPrivacyPolicy: false,
  });

  const [contact, { isLoading }] = useContactMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      agreeToPrivacyPolicy: checked,
    }));
  };

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

  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders.",
    },
    {
      question: "Do you offer returns?",
      answer:
        "Yes, we offer returns within 30 days of purchase. Items must be unused and in original packaging.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email to monitor your package's journey.",
    },
  ];

  return (
    <>
      <Metadata title="Contact Us" />

      {/* Enhanced Hero Section */}
      <section className="relative bg-brand-gradient overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-accent"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-accent"
          />
        </div>
        <div className=" relative px-6 text-center text-white">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-gray-100 leading-relaxed"
          >
            World of Minifigs Team is always open to your suggestions, concerns,
            and business ideas. Feel free to reach out and we&apos;ll surely
            respond within 24 hours!
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className=" px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Contact Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-white p-8 md:p-10 rounded-2xl shadow-lg"
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
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
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

          {/* Side Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Social Media Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Let's be connected!
              </h3>
              <p className="text-gray-600 mb-8">
                Follow us on our social media accounts:
              </p>

              <div className="flex flex-col space-y-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61552234252330"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <span>Facebook</span>
                </a>

                <a
                  href="https://www.instagram.com/theworldofminifigs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Frequently Asked
              </h3>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
