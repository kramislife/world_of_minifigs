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
    <div className="bg-white py-10">
      <div className="px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={aboutAnimations.statsContainerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={aboutAnimations.statCardVariants}>
              <Card className="shadow-md text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-gray-800">
                      {stat.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {stat.label}
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StatSection;
