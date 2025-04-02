import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { aboutAnimations } from "@/hooks/Animation/animationConfig";

const HowToOrderSection = () => {
  return (
    <section className="py-10 lg:py-16 bg-brand-gradient text-white">
      <div className="px-6">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={aboutAnimations.orderHeaderVariants}
        >
          <div className="inline-block bg-white/20 text-accent px-4 py-1 rounded-full text-sm font-medium mb-6">
            SIMPLE PROCESS
          </div>
          <h2 className="text-3xl font-bold mb-4">How to Place an Order</h2>
          <p className="max-w-2xl mx-auto text-gray-100 leading-relaxed">
            Our streamlined ordering process makes it easy to get the LEGO
            pieces you need. Follow these simple steps to start building your
            dream creations.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={aboutAnimations.orderContainerVariants}
        >
          {[1, 2, 3].map((step, index) => (
            <motion.div
              key={index}
              variants={aboutAnimations.orderStepVariants}
            >
              <Card className="bg-gray-800/30 text-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-accent text-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 font-bold">
                    {step}
                  </div>
                  <CardTitle className="text-xl font-bold mb-4 text-white">
                    {step === 1 && "Explore Our Collection"}
                    {step === 2 && "Select Your Favorites"}
                    {step === 3 && "Place Your Order"}
                  </CardTitle>
                  <p className="text-gray-200">
                    {step === 1 &&
                      "Visit the Shop page to view all World of Minifigs products. Filter by category to find exactly what you need."}
                    {step === 2 &&
                      "Add your preferred custom sets to your cart and double-check the quantities. We offer discounts on selected items."}
                    {step === 3 &&
                      "Complete the order details, wait for the order confirmation, and you're all set! You'll receive your LEGO in no time."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={aboutAnimations.exploreButtonVariants}
        >
          <Link to="/products">
            <Button className="relative bg-accent text-gray-900 overflow-hidden group">
              <span className="absolute inset-0 bg-brand-start origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out z-0"></span>
              <span className="relative z-10 flex items-center text-gray-900 group-hover:text-white transition-colors duration-300">
                Shop Now
                <ExternalLink className="ml-2 h-4 w-4 text-gray-900 group-hover:text-white transition-colors duration-300" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToOrderSection;
