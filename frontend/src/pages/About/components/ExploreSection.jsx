import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExploreSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/mark-legostore/image/upload/v1743056654/world_of_minifigs/icons/CTA.png"
          alt="LEGO background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-5
            drop-shadow-lg"
          >
            Ready to Start Your <span className="text-accent">LEGO</span>{" "}
            Adventure?
          </h2>
          <p
            className="max-w-2xl mx-auto text-white/90 mb-8 text-lg 
            bg-black/30 rounded-xl p-4 
            drop-shadow-lg"
          >
            Explore our collection of authentic LEGO parts and minifigures to
            bring your creative vision to life.
          </p>
          <div className="text-center mt-10">
            <Link to="/collections">
              <Button className="relative bg-accent text-gray-900 overflow-hidden group">
                <span className="absolute inset-0 bg-brand-start origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out z-0"></span>
                <span className="relative z-10 flex items-center text-gray-900 group-hover:text-white transition-colors duration-300">
                  Explore Our Collection
                  <Heart className="ml-2 h-4 w-4 text-gray-900 group-hover:text-white transition-colors duration-300" />
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreSection;
