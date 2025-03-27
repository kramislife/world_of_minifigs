import React from "react";
import { motion } from "framer-motion";

const ContactHeroSection = () => {
  return (
    <section className="relative bg-brand-gradient overflow-hidden py-20 md:py-40">
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
          className="text-4xl md:text-5xl lg:text-6xl lg:leading-tight font-bold mb-2"
        >
          Get in <span className="text-accent">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-3xl text-lg md:text-lg text-gray-300 leading-relaxed"
        >
          World of Minifigs Team is always open to your suggestions, concerns,
          and business ideas. Feel free to reach out and we&apos;ll surely
          respond within 24 hours!
        </motion.p>
      </div>
    </section>
  );
};

export default ContactHeroSection;