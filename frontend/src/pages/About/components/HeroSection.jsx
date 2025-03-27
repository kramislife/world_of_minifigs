import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative bg-brand-gradient overflow-hidden py-20 md:py-36">
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
      <div className="relative px-6 text-center text-white">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl lg:leading-tight font-bold mb-3"
        >
          Fueling Your <span className="text-accent">LEGO</span> <br />{" "}
          Adventures with Authentic Parts
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-xl text-md md:text-lg text-gray-300"
        >
          Brick by Brick, Uniting LEGO Lovers – Where Every Piece Connects and
          Every Builder Belongs!
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
