import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const StatSection = () => {
  return (
    <div className="bg-white py-10">
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-md text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-gray-800">50+</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Custom Projects
                </h3>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="shadow-md text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-gray-800">1000+</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Buyers</h3>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-md text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-gray-800">97%</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Satisfied Buyers
                </h3>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StatSection;