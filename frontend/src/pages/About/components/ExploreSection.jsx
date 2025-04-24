import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { aboutAnimations } from "@/hooks/Animation/animationConfig";

const ExploreSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          src="https://res.cloudinary.com/mark-legostore/image/upload/v1743056654/world_of_minifigs/icons/CTA.png"
          alt="LEGO background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 mix-blend-multiply"></div>
      </div>

      {/* Content Container */}
      <motion.div
        className="container relative z-10 mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={aboutAnimations.exploreContainerVariants}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-5"
            variants={aboutAnimations.exploreTitleVariants}
          >
            Ready to Start Your <span className="text-accent">LEGO</span>{" "}
            Adventure?
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-white/90 mb-10 text-base"
            variants={aboutAnimations.exploreTextVariants}
          >
            Dive into our world of authentic LEGO parts and minifigures and
            start building your imagination — one brick at a time .
          </motion.p>
          <motion.div
            className="text-center"
            variants={aboutAnimations.exploreButtonVariants}
          >
            <Link to="/collections">
              <Button variant="accent">
                Explore Our Collection
                <Heart className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExploreSection;
