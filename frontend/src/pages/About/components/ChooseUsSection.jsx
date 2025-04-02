import React from "react";
import { Award, Package, Clock } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { aboutAnimations } from "@/hooks/Animation/animationConfig";

const ChooseUsSection = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-gray-700" />,
      title: "100% Authentic LEGO Products",
      description:
        "We guarantee the authenticity of every product. All our items are genuine LEGO, sourced directly from trusted suppliers.",
    },
    {
      icon: <Package className="h-8 w-8 text-gray-700" />,
      title: "Attentiveness on Point",
      description:
        "We ensure the timely delivery of the right products. Our careful packaging guarantees your items arrive in perfect condition.",
    },
    {
      icon: <Clock className="h-8 w-8 text-gray-700" />,
      title: "Exceptional Customer Service",
      description:
        "Our dedicated team is here to assist you from order placing to delivery. We respond to inquiries within 24 hours.",
    },
  ];

  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="px-6">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={aboutAnimations.orderHeaderVariants}
        >
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
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={aboutAnimations.chooseUsContainerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={aboutAnimations.chooseUsCardVariants}
            >
              <Card className="shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </CardTitle>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ChooseUsSection;
