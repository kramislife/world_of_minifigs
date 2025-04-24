import React from "react";
import { Award, Package, Clock } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { aboutAnimations } from "@/hooks/Animation/animationConfig";
import { Badge } from "@/components/ui/badge";

const ChooseUsSection = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-foreground" />,
      title: "100% Authentic LEGO Products",
      description:
        "We guarantee the authenticity of every product. All our items are genuine LEGO, sourced directly from trusted suppliers.",
    },
    {
      icon: <Package className="h-8 w-8 text-foreground" />,
      title: "Attentiveness on Point",
      description:
        "We ensure the timely delivery of the right products. Our careful packaging guarantees your items arrive in perfect condition.",
    },
    {
      icon: <Clock className="h-8 w-8 text-foreground" />,
      title: "Exceptional Customer Service",
      description:
        "Our dedicated team is here to assist you from order placing to delivery. We respond to inquiries within 24 hours.",
    },
  ];

  return (
    <section className="px-5 py-10 bg-background">
      <motion.div
        className="text-center mb-5 md:mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={aboutAnimations.orderHeaderVariants}
      >
        <Badge variant="accent" className="text-sm font-medium mb-5 p-1 px-5">
          WHY CHOOSE US
        </Badge>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Minifigure Magic, Delivered ✨
        </h2>
        <p className="max-w-3xl mx-auto italic text-foreground">
          Discover why LEGO lovers trust us — from top tier quality and 100%
          authenticity to service that builds smiles with every order.
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
            <Card className="bg-background border">
              <CardContent className="p-5 text-center border rounded-md">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold mb-4">
                  {feature.title}
                </CardTitle>
                <p className="text-foreground/80 italic">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ChooseUsSection;
