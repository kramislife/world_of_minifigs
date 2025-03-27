import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const HowToOrderSection = () => {
  return (
    <section className="py-10 lg:py-16 bg-brand-gradient text-white">
      <div className="px-6">
        <div className="text-center mb-10">
          <div className="inline-block bg-white/20 text-accent px-4 py-1 rounded-full text-sm font-medium mb-6">
            SIMPLE PROCESS
          </div>
          <h2 className="text-3xl font-bold mb-4">How to Place an Order</h2>
          <p className="max-w-2xl mx-auto text-gray-100 leading-relaxed">
            Our streamlined ordering process makes it easy to get the LEGO
            pieces you need. Follow these simple steps to start building your
            dream creations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800/30 text-white border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-accent text-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 font-bold">
                  1
                </div>
                <CardTitle className="text-xl font-bold mb-4 text-white">
                  Explore Our Collection
                </CardTitle>
                <p className="text-gray-200">
                  Visit the Shop page to view all World of Minifigs products.
                  Filter by category to find exactly what you need.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800/30 text-white border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-accent text-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 font-bold">
                  2
                </div>
                <CardTitle className="text-xl font-bold mb-4 text-white">
                  Select Your Favorites
                </CardTitle>
                <p className="text-gray-200">
                  Add your preferred custom sets to your cart and double-check
                  the quantities. We offer discounts on selected items.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800/30 text-white border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-accent text-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 font-bold">
                  3
                </div>
                <CardTitle className="text-xl font-bold mb-4 text-white">
                  Place Your Order
                </CardTitle>
                <p className="text-gray-200">
                  Complete the order details, wait for the order confirmation,
                  and you're all set! You'll receive your LEGO in no time.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="text-center mt-10">
          <Link to="/products">
            <Button className="relative bg-accent text-gray-900 overflow-hidden group">
              <span className="absolute inset-0 bg-brand-start origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out z-0"></span>
              <span className="relative z-10 flex items-center text-gray-900 group-hover:text-white transition-colors duration-300">
                Shop Now
                <ExternalLink className="ml-2 h-4 w-4 text-gray-900 group-hover:text-white transition-colors duration-300" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowToOrderSection;
