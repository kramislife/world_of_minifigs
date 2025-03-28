import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialSection = () => {
  return (
    <section className="py-10 lg:py-16 bg-gray-50">
      <div className="px-6">
        <div className="text-center mb-10">
          <div className="inline-block bg-brand-start text-accent px-4 py-1 rounded-full text-sm font-medium mb-6">
            TESTIMONIALS
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Honest Reviews from Real Customers
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Don't just take our word for it - see what our customers have to say
            about their experience with World of Minifigs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Card className="shadow-md h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 text-accent">
                  <Quote className="w-8 h-8" />
                </div>
                <p className="italic text-gray-600 mb-4 flex-grow">
                  "Excellent seller! Item exactly as described. Very friendly and
                  prompt to answer questions and provide additional information
                  about the item, shipped item immediately, and my item even
                  arrived early! Seller took extra care to ensure the item was
                  well packaged for it to arrive safely and in perfect
                  condition!! Will definitely buy from again in the future! Thank
                  you :)"
                </p>
                <div className="font-semibold text-gray-800 mt-auto">
                  - kim_tayy
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-md h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 text-accent">
                  <Quote className="w-8 h-8" />
                </div>
                <p className="italic text-gray-600 mb-4 flex-grow">
                  "Item came as described, not damaged and in good condition."
                </p>
                <div className="font-semibold text-gray-800 mt-auto">
                  - raiyne_84
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <Card className="shadow-md h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 text-accent">
                  <Quote className="w-8 h-8" />
                </div>
                <p className="italic text-gray-600 mb-4 flex-grow">
                  "Perfect Transaction! Items as described, packaged well and
                  fast shipping! Highly recommend this seller. Thank you =)"
                </p>
                <div className="font-semibold text-gray-800 mt-auto">
                  - slashgrencat
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <Card className="shadow-md h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 text-accent">
                  <Quote className="w-8 h-8" />
                </div>
                <p className="italic text-gray-600 mb-4 flex-grow">
                  "Exactly what was ordered, quick shipping, safe packaging, and
                  perfect condition."
                </p>
                <div className="font-semibold text-gray-800 mt-auto">
                  - omnibrow
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <Card className="shadow-md h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 text-accent">
                  <Quote className="w-8 h-8" />
                </div>
                <p className="italic text-gray-600 mb-4 flex-grow">
                  "Everything's well packed and exactly as described"
                </p>
                <div className="font-semibold text-gray-800 mt-auto">
                  - clcoffin1972
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;