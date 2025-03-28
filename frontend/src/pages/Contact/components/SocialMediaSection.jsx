import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail } from "lucide-react";

const SocialMediaSection = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Let's be connected!
      </h3>
      <p className="text-gray-600 mb-8">
        Follow us on our social media accounts:
      </p>

      <div className="flex flex-row gap-4">
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

        <a
          href="mailto:brickextremeofficial@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <span>Email</span>
        </a>
      </div>
    </div>
  );
};

export default SocialMediaSection;