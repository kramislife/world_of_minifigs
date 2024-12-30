import contactImage from "@/assets/contact2.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import Metadata from "@/components/layout/Metadata/Metadata";

const Contact = () => {
  return (
    <>
      <Metadata title="Contact Us" />
      <div className="min-h-screen flex items-center justify-center bg-brand-gradient p-4">
        <div className="w-full max-w-7xl flex gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 hidden lg:block"
          >
            <img
              src={contactImage}
              alt="Contact"
              className="w-full h-full object-contain drop-shadow-2xl filter saturate-110"
            />
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 p-8 rounded-3xl backdrop-blur-lg shadow-2xl bg-gradient-to-br from-brand-start/40 to-brand-end/40 border border-white/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />

            <div className="space-y-8 py-6 px-2 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <h2 className="text-4xl font-bold text-white tracking-tight">
                  Get in Touch
                </h2>
                <p className="text-light/90 text-md tracking-wide font-light">
                  We'd love to hear from you. Send us a message!
                </p>
              </motion.div>

              <form className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg hover:bg-darkBrand/70"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg hover:bg-darkBrand/70"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Textarea
                    placeholder="Your Message"
                    className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 min-h-[150px] rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg resize-none hover:bg-darkBrand/70"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-r border border-brand hover:bg-brand-gradient text-white h-14 rounded-xl text-md shadow-lg transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </motion.div>
              </form>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-darkBrand/30 hover:bg-darkBrand/50 transition-colors duration-300 cursor-pointer group"
                >
                  <div className="p-3 rounded-full bg-brand/20 group-hover:bg-brand/30 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-light group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-light/90 text-sm text-center">
                    123 Business Street, New York, NY 10001
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-darkBrand/30 hover:bg-darkBrand/50 transition-colors duration-300 cursor-pointer group"
                >
                  <div className="p-3 rounded-full bg-brand/20 group-hover:bg-brand/30 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-light group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-light/90 text-sm text-center">
                    +1 (555) 123-4567
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-darkBrand/30 hover:bg-darkBrand/50 transition-colors duration-300 cursor-pointer group"
                >
                  <div className="p-3 rounded-full bg-brand/20 group-hover:bg-brand/30 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-light group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-light/90 text-sm text-center">
                    contact@yourcompany.com
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
