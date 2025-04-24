import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleCheckBig } from "lucide-react";
import { contactAnimations } from "@/hooks/Animation/animationConfig";

const FaqSection = () => {
  const faqs = [
    {
      question: "1. Where are you located?",
      answer: "We are located in Lehi, Utah.",
    },
    {
      question: "2. Do you have a physical store?",
      answer:
        "Currently, we are an online-only store. We have stores in Bricklink, eBay, Etsy, and Mercari.",
    },
    {
      question: "3. Are your LEGO parts authentic?",
      answer:
        "Yes, we guarantee that all LEGO parts sold on our website are 100% new and authentic LEGO products. We source our parts from reputable and authorized suppliers.",
    },
    {
      question: "4. How long does shipping take?",
      answer:
        "Shipping times vary depending on your location and the shipping method chosen. We aim to ship orders within 1-2 business days.",
    },
    {
      question:
        "5. Can I request specific LEGO parts that are not listed on your website?",
      answer:
        "While we try to keep a large inventory, we may not have every LEGO part available. Please contact us with your request, and we will do our best to assist you.",
    },
  ];

  return (
    <motion.div
      className="bg-white border rounded-2xl p-5 md:p-8"
      variants={contactAnimations.faqVariants}
    >
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Frequently Asked Questions
      </h3>

      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={contactAnimations.faqItemVariants}
            custom={index}
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-2">
                  <CircleCheckBig className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>{faq.answer}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default FaqSection;
