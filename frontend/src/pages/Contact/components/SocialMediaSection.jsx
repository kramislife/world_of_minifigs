import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail } from "lucide-react";
import { contactAnimations } from "@/hooks/Animation/animationConfig";

const SocialMediaSection = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      url: "https://www.facebook.com/profile.php?id=61552234252330",
      hoverColor: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "https://www.instagram.com/theworldofminifigs/",
      hoverColor: "hover:text-pink-600",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:brickextremeofficial@gmail.com",
      hoverColor: "hover:text-blue-600",
    },
  ];

  return (
    <motion.div
      className="bg-white border rounded-2xl p-5 md:p-8"
      variants={contactAnimations.socialVariants}
    >
      <h3 className="text-2xl font-bold text-foreground mb-3">
        Let's be connected!
      </h3>
      <p className="text-gray-600 mb-8">
        Connect with us online
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 text-gray-700 ${social.hoverColor} transition-colors`}
            variants={contactAnimations.iconVariants}
            custom={index}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              {social.icon}
            </div>
            <span>{social.name}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialMediaSection;
