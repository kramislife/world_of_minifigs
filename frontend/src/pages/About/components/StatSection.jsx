import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { aboutAnimations } from "@/hooks/Animation/animationConfig";

const StatSection = () => {
  const stats = [
    {
      number: "50+",
      label: "Custom Projects",
    },
    {
      number: "1000+",
      label: "Buyers",
    },
    {
      number: "97%",
      label: "Satisfied Buyers",
    },
  ];

  return (
    <motion.section
      className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-background py-10 px-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={aboutAnimations.statsContainerVariants}
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={aboutAnimations.statCardVariants}>
          <Card className="bg-background">
            <CardContent className="p-6 text-lg font-bold border rounded-md text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <span>{stat.number}</span>
              </div>
              <span>{stat.label}</span>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default StatSection;
