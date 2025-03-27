import React from "react";
import { motion } from "framer-motion";
import { Award, Package, Clock } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const ChooseUsSection = () => {
  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="px-6">
        <div className="text-center mb-10">
          <div className="inline-block bg-brand-start text-accent px-4 py-1 rounded-full text-sm font-medium mb-6">
            WHY CHOOSE US
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Minifigure Magic, Delivered
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            See why our customers enjoy buying LEGO from us. We're committed to
            quality, authenticity, and exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-4">
                  100% Authentic LEGO Products
                </CardTitle>
                <p className="text-gray-600">
                  We guarantee the authenticity of every product. All our items
                  are genuine LEGO, sourced directly from trusted suppliers.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-4">
                  Attentiveness on Point
                </CardTitle>
                <p className="text-gray-600">
                  We ensure the timely delivery of the right products. Our
                  careful packaging guarantees your items arrive in perfect
                  condition.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-4">
                  Exceptional Customer Service
                </CardTitle>
                <p className="text-gray-600">
                  Our dedicated team is here to assist you from order placing to
                  delivery. We respond to inquiries within 24 hours.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUsSection;