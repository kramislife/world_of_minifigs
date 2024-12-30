import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Headphones, ShieldCheck } from "lucide-react";
import lightsaber from "@/assets/subscribeAssets/lightsaber.png";
import { motion, useInView } from "framer-motion";
import { subscribeAnimations } from "@/hooks/animationConfig";

const features = [
  {
    icon: <Truck className="w-8 h-8 text-white" />,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140"
  },
  {
    icon: <Headphones className="w-8 h-8 text-white" />,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days"
  }
];

const Subscribe = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2,
  });

  return (
    <div ref={ref} className="w-full py-16">
      <div className="px-4">
        <motion.div 
          className="relative rounded-lg p-8 md:p-12 h-[70vh] lg:h-[90vh] overflow-hidden"
          variants={subscribeAnimations.containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.img
            src={lightsaber}
            alt="Lightsaber"
            className="absolute inset-0 w-full h-full object-cover opacity-50 rounded-lg"
            variants={subscribeAnimations.imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />

          <motion.div 
            className="relative top-44 z-10 text-center"
            variants={subscribeAnimations.containerVariants}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl text-gray-200 font-bold mb-4"
              variants={subscribeAnimations.itemVariants}
            >
              Subscribe and Save
            </motion.h2>

            <motion.p 
              className="text-gray-300 mb-8 max-w-2xl mx-auto text-sm sm:text-base"
              variants={subscribeAnimations.itemVariants}
            >
              Unlock exclusive deals and never miss out! Subscribe now and save
              on your next LEGO adventure. Get the latest updates, special
              offers, and more—straight to your inbox!
            </motion.p>

            <motion.div 
              className="relative max-w-md mx-auto"
              variants={subscribeAnimations.itemVariants}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800/60 border-gray-700 text-gray-200 placeholder:text-gray-400 pr-28"
              />
              <Button className="absolute right-0 top-0 h-full bg-red-600 hover:bg-red-700 text-white whitespace-nowrap rounded-l-none">
                Subscribe
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16"
          variants={subscribeAnimations.containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={subscribeAnimations.featureVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {feature.icon}
              </motion.div>
              <motion.h3 
                className="text-gray-200 text-xl font-bold mb-2"
                variants={subscribeAnimations.itemVariants}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-gray-400"
                variants={subscribeAnimations.itemVariants}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Subscribe;
