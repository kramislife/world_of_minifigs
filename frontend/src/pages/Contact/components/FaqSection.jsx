import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Frequently Asked Questions
      </h3>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-gray-200 rounded-md overflow-hidden"
          >
            <AccordionTrigger
              className="p-4 text-left font-medium data-[state=open]:bg-accent 
              data-[state=open]:text-gray-900 hover:bg-accent hover:no-underline"
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-gray-50 border-t border-gray-200">
              <p className="text-black leading-6">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqSection;