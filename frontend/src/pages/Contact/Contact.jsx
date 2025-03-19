import { useState } from "react";
import contactImage from "@/assets/contact2.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import Metadata from "@/components/layout/Metadata/Metadata";
import { toast } from "react-toastify";
import { useContactMutation } from "@/redux/api/authApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [contact, { isLoading }] = useContactMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await contact(formData).unwrap();
      toast.success(response.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <Metadata title="Contact Us" />
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Left side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 w-full order-2 lg:order-1"
          >
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-light tracking-tight">
                  Contact Us
                </h2>
                <p className="text-light text-lg">
                  We'd love to hear from you. Send us a message!
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 h-12 rounded-lg focus:ring-2 focus:ring-brand/40 focus:border-brand/40 transition-all duration-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 h-12 rounded-lg focus:ring-2 focus:ring-brand/40 focus:border-brand/40 transition-all duration-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 min-h-[120px] rounded-lg focus:ring-2 focus:ring-brand/40 focus:border-brand/40 transition-all duration-300 resize-none"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand hover:bg-brand/90 text-white h-12 rounded-lg text-md font-medium shadow-sm transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isLoading ? "Sending..." : "Send Message"}
                      <Send className="w-4 h-4" />
                    </span>
                  </Button>
                </motion.div>
              </form>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-4 mt-8"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-brand" />
                  <p className="text-light">123 Main Street, City, Country</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand" />
                  <a
                    href="mailto:support@worldofminifigs.com"
                    className="text-light hover:text-brand transition-colors duration-300"
                  >
                    support@worldofminifigs.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 w-full order-1 lg:order-2"
          >
            <img
              src={contactImage}
              alt="Contact Us"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
