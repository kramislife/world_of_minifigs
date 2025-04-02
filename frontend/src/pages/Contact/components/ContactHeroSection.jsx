import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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
          className="text-5xl md:text-6xl lg:leading-tight font-bold mb-5"
        >
          Get in <span className="text-accent">Touch</span>
        </motion.h1>

        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute md:-top-6 -top-4  -left-2 md:-left-12"
          >
            <Quote className="w-8 h-8 md:w-12 md:h-12 text-accent transform -scale-x-100" />
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto text-sm md:text-lg text-gray-300 leading-6 italic"
          >
            World of Minifigs Team is always open to your suggestions, concerns,
            and business ideas. Feel free to reach out and we&apos;ll surely
            respond within 24 hours!
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
