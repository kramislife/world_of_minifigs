import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { aboutAnimations } from "@/hooks/Animation/animationConfig";

const AboutHeroSection = () => {
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
      <motion.div
        className="relative px-6 text-center text-white"
        initial="hidden"
        animate="visible"
        variants={aboutAnimations.heroVariants}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl lg:leading-tight font-bold mb-5"
          variants={aboutAnimations.heroTitleVariants}
        >
          Fueling Your <span className="text-accent">LEGO</span> <br />{" "}
          Adventures with Authentic Parts
        </motion.h1>

        <div className="relative mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute md:-top-6 -top-4 -left-4 md:-left-3"
          >
            <Quote className="w-8 h-8 md:w-12 md:h-12 text-accent transform -scale-x-100" />
          </motion.div>

          <motion.p
            className="mx-auto text-sm md:text-lg text-gray-300 italic"
            variants={aboutAnimations.heroTextVariants}
          >
            Brick by Brick, Uniting LEGO Lovers – Where Every Piece Connects and
            Every Builder Belongs!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute -bottom-6 -right-2 md:-right-8"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutHeroSection;
