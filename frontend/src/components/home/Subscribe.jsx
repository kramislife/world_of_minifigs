import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Headphones, ShieldCheck } from "lucide-react";
import lightsaber from "@/assets/subscribeAssets/lightsaber.png";
import { motion, useInView } from "framer-motion";
import { subscribeAnimations } from "@/hooks/Animation/animationConfig";

const features = [
  {
    icon: <Truck className="w-8 h-8 text-black" />,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    icon: <Headphones className="w-8 h-8 text-black" />,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-black" />,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
  },
];

const Subscribe = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <div ref={ref} className="w-full py-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6">
        <motion.div
          className="relative rounded-lg p-8 md:p-12 h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden"
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
            className="relative z-10 h-full flex flex-col items-center justify-center"
            variants={subscribeAnimations.containerVariants}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              variants={subscribeAnimations.itemVariants}
            >
              Subscribe and Save
            </motion.h2>

            <motion.p
              className="text-gray-300 mb-8 max-w-2xl mx-auto text-sm sm:text-base text-center"
              variants={subscribeAnimations.itemVariants}
            >
              Unlock exclusive deals and never miss out! Subscribe now and save
              on your next LEGO adventure. Get the latest updates, special
              offers, and more—straight to your inbox!
            </motion.p>

            <motion.div
              className="relative w-full max-w-md mx-auto"
              variants={subscribeAnimations.itemVariants}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800/60 border-gray-700 text-gray-200 placeholder:text-gray-400 pr-28"
              />
              <Button className="absolute right-0 top-0 h-full bg-accent hover:bg-accent/90 text-foreground whitespace-nowrap rounded-l-none">
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
                className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {feature.icon}
              </motion.div>
              <motion.h3
                className="text-xl font-bold mb-2"
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
