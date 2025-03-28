import React from "react";
import { motion } from "framer-motion";

const StorySection = () => {
  return (
    <section className="py-10 lg:py-16 bg-gray-50">
      <div className="px-6">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <img
              src="https://res.cloudinary.com/mark-legostore/image/upload/v1743056478/world_of_minifigs/icons/Father-son.png"
              alt="LEGO Collection"
              className="rounded-lg shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="inline-block bg-brand-start text-gray-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
              <span className="text-accent">OUR STORY</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              A Father-Son Journey Into the World of LEGO
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <span className="font-bold">World of Minifigs (WOM)</span> is an
                online store that offers a wide range of LEGO parts,
                minifigures, sets, and other brick-related items. We started our
                journey as a father-son bonding, brought together by our mutual
                love for LEGO.
              </p>
              <p>
                We are located in{" "}
                <span className="font-bold">Utah, United States</span>, where we
                carefully process all your orders. We take pride in delivering
                your ordered LEGO pieces from pet and smoke-free storage,
                ensuring they are in the best possible condition when they
                arrive.
              </p>
              <p>
                We have successfully delivered orders from various platforms
                such as{" "}
                <span className="font-bold">Bricklink, eBay, and Etsy</span>,
                with a customer satisfaction rate of over 97%. Our team is
                dedicated to providing you with an excellent brick-shopping
                experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
