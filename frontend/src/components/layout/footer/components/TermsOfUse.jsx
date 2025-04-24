import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TermsOfUse = () => {
  const termsLastUpdated = "March 28, 2025";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content:
        "Your use of this website constitutes your acceptance of these Terms. We reserve the right to modify these Terms at any time. Any changes will be posted on this page, and your continued use of the website after such changes have been posted will constitute your acceptance of the revised Terms.",
    },
    {
      id: "product",
      title: "2. Product Information and Authenticity",
      content: (
        <div className="space-y-3">
          <p className="font-semibold mb-2">
            We provide the following guarantees regarding our products:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm">
              <span className="font-medium">Authentic LEGO Parts:</span> We
              guarantee that all LEGO parts, minifigure pieces, heads, torsos,
              and other products sold on this website are authentic LEGO
              products.
            </li>
            <li className="text-sm">
              <span className="font-medium">Product Descriptions:</span> We make
              every effort to provide accurate descriptions and images of our
              products. However, we do not warrant that the descriptions,
              images, or other content on this website are accurate, complete,
              reliable, current, or error-free.
            </li>
            <li className="text-sm">
              <span className="font-medium">Availability:</span> Product
              availability is subject to change without notice.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "orders",
      title: "3. Orders and Payment",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-sm">
            <span className="font-medium">Order Acceptance:</span> Your order
            constitutes an offer to purchase our products. We reserve the right
            to accept or reject any order for any reason.
          </li>
          <li className="text-sm">
            <span className="font-medium">Payment:</span> Payment must be made
            in full at the time of purchase. We accept [List accepted payment
            methods, e.g., credit cards, PayPal].
          </li>
          <li className="text-sm">
            <span className="font-medium">Pricing:</span> Prices are subject to
            change without notice. We are not responsible for typographical
            errors regarding pricing or product information.
          </li>
          <li className="text-sm">
            <span className="font-medium">Sales Tax:</span> Applicable sales tax
            will be added to your order based on your shipping address and the
            prevailing laws of Utah. .
          </li>
        </ul>
      ),
    },
    {
      id: "shipping",
      title: "4. Shipping and Delivery",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-sm">
            <span className="font-medium">Shipping:</span> We will ship your
            order to the address provided during checkout. Shipping times may
            vary.
          </li>
          <li className="text-sm">
            <span className="font-medium">Risk of Loss:</span> The risk of loss
            and title for all items purchased from us pass to you upon our
            delivery to the carrier.
          </li>
          <li className="text-sm">
            <span className="font-medium">International Shipping:</span> If we
            offer international shipping, you are responsible for any customs
            duties, taxes, and fees.
          </li>
        </ul>
      ),
    },
    {
      id: "returns",
      title: "5. Returns and Refunds",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-sm">
            <span className="font-medium">Return Policy:</span> Returns are
            accepted within 30 days of receipt for unopened items. Customers are
            responsible for return shipping.
          </li>
          <li className="text-sm">
            <span className="font-medium">Refunds:</span> Refunds will be issued
            to the original payment method.
          </li>
          <li className="text-sm">
            <span className="font-medium">Damaged or Defective Items:</span> If
            you receive a damaged or defective item, please contact us
            immediately.
          </li>
        </ul>
      ),
    },
    {
      id: "ip",
      title: "6. Intellectual Property",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-sm">
            <span className="font-medium">Copyright:</span> All content on this
            website, including text, images, logos, and designs, is the property
            of World of Minifigs or its licensors and is protected by copyright
            laws.
          </li>
          <li className="text-sm">
            <span className="font-medium">Trademarks:</span> "World of Minifigs"
            and our logo are trademarks of World of Minifigs/Brick Extreme. You
            may not use our trademarks without our prior written consent.
          </li>
          <li className="text-sm">
            <span className="font-medium">LEGO Trademarks:</span> LEGO, the LEGO
            logo, the Minifigure, and the Brick and Knob configurations are
            trademarks of the LEGO Group of Companies, which does not sponsor,
            authorize, or endorse this site.
          </li>
        </ul>
      ),
    },
    {
      id: "liability",
      title: "7. Limitation of Liability",
      content: (
        <div className="space-y-3">
          <p className="text-sm">
            To the fullest extent permitted by law, World of Minifigs shall not
            be liable for any direct, indirect, incidental, consequential, or
            punitive damages arising from your use of this website or the
            purchase of our products.
          </p>
          <p className="text-sm">
            In no event shall our total liability to you for all damages,
            losses, or causes of action exceed the amount paid by you for the
            products in question.
          </p>
        </div>
      ),
    },
    {
      id: "governing",
      title: "8. Governing Law and Jurisdiction",
      content: (
        <div className="space-y-3">
          <p className="text-sm">
            These Terms shall be governed by and construed following the laws of
            the State of Utah, without regard to its conflict of law principles.
          </p>
          <p className="text-sm">
            Any dispute arising out of or relating to these Terms shall be
            subject to the exclusive jurisdiction of the state and federal
            courts located in Lehi, Utah.
          </p>
        </div>
      ),
    },
    {
      id: "conduct",
      title: "9. User Conduct",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-sm">
            You agree not to use this website for any unlawful purpose.
          </li>
          <li className="text-sm">
            You agree not to upload or transmit any harmful or malicious code.
          </li>
          <li className="text-sm">
            You agree not to interfere with the operation of this website.
          </li>
        </ul>
      ),
    },
    {
      id: "contact",
      title: "10. Contact Information",
      content: (
        <div className="space-y-3">
          <p className="text-sm">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="text-sm ml-5">
            <p>World of Minifigs/ Brick Extreme LLC</p>
            <p>Lehi, Utah, 84043</p>
            <p>build.wom@gmail.com</p>
            <p>brickextremeofficial@gmail.com</p>
          </div>
        </div>
      ),
    },
    {
      id: "severability",
      title: "11. Severability",
      content: (
        <p className="text-sm">
          If any provision of these Terms is held to be invalid or
          unenforceable, the remaining provisions shall continue to be valid and
          enforceable.
        </p>
      ),
    },
    {
      id: "entire",
      title: "12. Entire Agreement",
      content: (
        <p className="text-sm">
          These Terms constitute the entire agreement between you and World of
          Minifigs concerning the use of this website and the purchase of our
          products.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-background p-5">
      <h1 className="text-2xl font-bold text-foreground mb-2">Terms of Use</h1>
      <p className="text-gray-700 text-xs md:text-sm leading-6 mb-2">
        Welcome to the World of Minifigs! By accessing and using our website
        (www.worldofminifigs.com) and purchasing products from us, you agree to
        be bound by these Terms of Use ("Terms"). If you do not agree with any
        part of these Terms, you must not use our website.
      </p>

      <Accordion type="single" collapsible>
        {sections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>{section.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="py-4 text-right text-sm text-foreground">
        Last Updated: {termsLastUpdated}
      </div>
    </div>
  );
};

export default TermsOfUse;
