import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const ContactHeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-40">
      <div className="absolute inset-0 opacity-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute -top-24 -left-24 w-64 h-64 md:w-96 md:h-96 rounded-full bg-accent"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-1/2 right-1/4 w-56 h-56 md:w-64 md:h-64 rounded-full bg-accent"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute -bottom-32 -right-32 w-52 h-52 md:w-64 md:h-64 rounded-full bg-accent"
        />
      </div>
      <div className=" relative px-6 text-center text-white">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl lg:leading-tight font-bold mb-5"
        >
          Get in <span className="text-accent">Touch</span>
        </motion.h1>

        <div className="relative mx-auto max-w-3xl">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto text-sm md:text-base text-gray-300 leading-6 italic"
          >
            World of Minifigs Team is always open to your suggestions, concerns,
            and business ideas. Feel free to reach out and we'll surely respond
            within 24 hours!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute -bottom-6 -right-2 md:-right-8"
          ></motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
