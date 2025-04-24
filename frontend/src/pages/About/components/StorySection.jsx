import React from "react";
import { motion } from "framer-motion";
import { aboutAnimations } from "@/hooks/Animation/animationConfig";
import { Badge } from "@/components/ui/badge";

const StorySection = () => {
  return (
    <section className="flex flex-col md:flex-row gap-10 items-center px-5 py-10 lg:py-16 bg-background/95">
      <motion.div
        className="md:w-1/2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={aboutAnimations.storyImageVariants}
      >
        <img
          src="https://res.cloudinary.com/mark-legostore/image/upload/v1743056478/world_of_minifigs/icons/Father-son.png"
          alt="LEGO Collection"
          className="rounded-lg"
        />
      </motion.div>

      <motion.div
        className="md:w-1/2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={aboutAnimations.storyContentVariants}
      >
        <Badge
          variant="accent"
          className="text-sm font-medium mb-5 md:mb-10 p-1 px-5"
        >
          OUR STORY
        </Badge>
        <h2 className="text-3xl font-bold text-foreground mb-5">
          A Father-Son Journey Into the World of LEGO
        </h2>
        <div className="space-y-4 text-foreground leading-relaxed">
          <p>
            <span className="font-bold">World of Minifigs (WOM)</span> is an
            online store that offers a wide range of LEGO parts, minifigures,
            sets, and other brick-related items. We started our journey as a
            father-son bonding, brought together by our mutual love for LEGO.
          </p>
          <p>
            We are located in{" "}
            <span className="font-bold">Utah, United States</span>, where we
            carefully process all your orders. We take pride in delivering your
            ordered LEGO pieces from pet and smoke-free storage, ensuring they
            are in the best possible condition when they arrive.
          </p>
          <p>
            We have successfully delivered orders from various platforms such as{" "}
            <span className="font-bold">Bricklink, eBay, and Etsy</span>, with a
            customer satisfaction rate of over 97%. Our team is dedicated to
            providing you with an excellent brick-shopping experience.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default StorySection;
