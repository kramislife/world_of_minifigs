import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { aboutAnimations } from "@/hooks/Animation/animationConfig";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    title: "Explore Our Collection",
    description:
      "Visit the Shop page to view all World of Minifigs products. Filter by category to find exactly what you need.",
  },
  {
    title: "Select Your Favorites",
    description:
      "Add your preferred custom sets to your cart and double-check the quantities. We offer discounts on selected items.",
  },
  {
    title: "Place Your Order",
    description:
      "Complete the order details, wait for the order confirmation, and you're all set! You'll receive your LEGO in no time.",
  },
];

const HowToOrderSection = () => {
  return (
    <section className="py-10 px-5">
      <motion.div
        className="text-center mb-5 md:mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={aboutAnimations.orderHeaderVariants}
      >
        <Badge variant="accent" className="text-sm font-medium mb-5 p-1 px-5">
          JUST 3 EASY STEPS
        </Badge>
        <h2 className="text-3xl font-bold mb-4">Snap, Shop, and Ship 🛍️</h2>
        <p className="max-w-3xl mx-auto italic text-gray-300 leading-relaxed">
          Whether you're a seasoned builder or just starting out, placing an
          order is as easy as stack, click, and build. Follow these simple steps
          to bring your LEGO dreams to life.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={aboutAnimations.orderContainerVariants}
      >
        {steps.map((step, index) => (
          <motion.div key={index} variants={aboutAnimations.orderStepVariants}>
            <Card className="bg-brand-dark/50 border-accent">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-accent text-foreground rounded-full flex items-center justify-center mx-auto mb-6 font-bold">
                  {index + 1}
                </div>
                <CardTitle className="text-xl font-bold mb-4 text-white">
                  {step.title}
                </CardTitle>
                <p className="text-gray-300 italic">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={aboutAnimations.exploreButtonVariants}
      >
        <Link to="/products">
          <Button variant="accent">
            Shop Now
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default HowToOrderSection;
