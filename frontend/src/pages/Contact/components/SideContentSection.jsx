import React from "react";
import { motion } from "framer-motion";
import SocialMediaSection from "./SocialMediaSection";
import FaqSection from "./FaqSection";
import { contactAnimations } from "@/hooks/Animation/animationConfig";

const SideContentSection = () => {
  return (
    <motion.div
      className="space-y-5 self-start"
      variants={contactAnimations.sideContentVariants}
    >
      {/* Social Media Section */}
      <SocialMediaSection />

      {/* FAQ Section with Accordion */}
      <FaqSection />
    </motion.div>
  );
};

export default SideContentSection;
