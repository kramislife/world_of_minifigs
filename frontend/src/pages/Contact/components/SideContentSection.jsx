import React from "react";
import { motion } from "framer-motion";
import SocialMediaSection from "./SocialMediaSection";
import FaqSection from "./FaqSection";

const SideContentSection = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-5 self-start"
    >
      {/* Social Media Section */}
      <SocialMediaSection />

      {/* FAQ Section with Accordion */}
      <FaqSection />
    </motion.div>
  );
};

export default SideContentSection;