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
    <section className="py-10 px-5 bg-background/95">
      <motion.div
        className="text-center mb-5 md:mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={aboutAnimations.orderHeaderVariants}
      >
        <Badge variant="accent" className="text-sm font-medium mb-5 p-1 px-5">
          TESTIMONIALS
        </Badge>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Loved by LEGO Lovers Everywhere 💛
        </h2>
        <p className="max-w-3xl mx-auto italic text-foreground">
          Don’t just take our word for it — hear straight from real builders who
          turned their imagination into reality with World of Minifigs.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
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
            <Card className="h-full bg-background border">
              <CardContent className="p-5 flex flex-col h-full border rounded-md">
                <div className="mb-4 text-accent">
                  <Quote className="w-8 h-8" />
                </div>
                <p className="italic text-foreground/90 text-base mb-4 flex-grow">
                  "{testimonial.quote}"
                </p>
                <div className="font-semibold">- {testimonial.author}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TestimonialSection;
