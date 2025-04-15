import React from "react";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { aboutAnimations } from "@/hooks/Animation/animationConfig";
import { Badge } from "@/components/ui/badge";

const TestimonialSection = () => {
  const testimonials = [
    {
      quote:
        "Excellent seller! Item exactly as described. Very friendly and prompt to answer questions and provide additional information about the item, shipped item immediately, and my item even arrived early! Seller took extra care to ensure the item was well packaged for it to arrive safely and in perfect condition!! Will definitely buy from again in the future! Thank you :)",
      author: "kim_tayy",
      span: "md:col-span-2",
    },
    {
      quote: "Item came as described, not damaged and in good condition.",
      author: "raiyne_84",
      span: "",
    },
    {
      quote:
        "Perfect Transaction! Items as described, packaged well and fast shipping! Highly recommend this seller. Thank you =)",
      author: "slashgrencat",
      span: "md:col-span-1",
    },
    {
      quote:
        "Exactly what was ordered, quick shipping, safe packaging, and perfect condition.",
      author: "omnibrow",
      span: "md:col-span-1",
    },
    {
      quote: "Everything's well packed and exactly as described",
      author: "clcoffin1972",
      span: "md:col-span-1",
    },
  ];

  return (
    <section className="py-10 lg:py-16 bg-gray-50">
      <div className="px-6">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={aboutAnimations.orderHeaderVariants}
        >
          <Badge className="bg-brand-start text-accent px-4 py-1 rounded-full text-sm font-medium mb-6">
            TESTIMONIALS
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Honest Reviews from Real Customers
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Don't just take our word for it - see what our customers have to say
            about their experience with World of Minifigs.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={aboutAnimations.testimonialContainerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={testimonial.span}
              variants={aboutAnimations.testimonialCardVariants}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 text-accent">
                    <Quote className="w-8 h-8" />
                  </div>
                  <p className="italic text-gray-600 mb-4 flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="font-semibold text-foreground mt-auto">
                    - {testimonial.author}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
