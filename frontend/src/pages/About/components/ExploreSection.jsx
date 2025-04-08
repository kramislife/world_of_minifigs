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
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
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
            className="text-4xl md:text-5xl font-extrabold text-white mb-5 drop-shadow-lg"
            variants={aboutAnimations.exploreTitleVariants}
          >
            Ready to Start Your <span className="text-accent">LEGO</span>{" "}
            Adventure?
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-white/90 mb-8 text-lg bg-black/30 rounded-xl p-4 drop-shadow-lg"
            variants={aboutAnimations.exploreTextVariants}
          >
            Explore our collection of authentic LEGO parts and minifigures to
            bring your creative vision to life.
          </motion.p>
          <motion.div
            className="text-center mt-10"
            variants={aboutAnimations.exploreButtonVariants}
          >
            <Link to="/collections">
              <Button className="relative bg-accent text-foreground overflow-hidden group">
                <span className="absolute inset-0 bg-brand-start origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out z-0"></span>
                <span className="relative z-10 flex items-center text-foreground group-hover:text-white transition-colors duration-300">
                  Explore Our Collection
                  <Heart className="ml-2 h-4 w-4 text-foreground group-hover:text-white transition-colors duration-300" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExploreSection;
