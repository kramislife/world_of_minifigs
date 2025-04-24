import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Metadata from "@/components/layout/Metadata/Metadata";

const PrivacyPolicy = () => {
  const privacyLastUpdated = "March 1, 2025";

  const sections = [
    {
      id: "information-collected",
      title: "1. Information We Collect",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-semibold mb-2">Personal Information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-sm">Name</li>
              <li className="text-sm">Shipping and billing address</li>
              <li className="text-sm">Email address</li>
              <li className="text-sm">Phone number</li>
              <li className="text-sm">
                Payment information (processed by our secure payment processors)
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Order Information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-sm">Details of the products you purchase</li>
              <li className="text-sm">Order history</li>
              <li className="text-sm">Shipping information</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Website Usage Information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-sm">IP address</li>
              <li className="text-sm">Browser type</li>
              <li className="text-sm">Device information</li>
              <li className="text-sm">Pages visited</li>
              <li className="text-sm">
                Cookies and similar technologies (see section 3)
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Communication Information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-sm">
                Information you provide when you contact us with inquiries or
                support requests
              </li>
              <li className="text-sm">
                Information provided when you subscribe to our newsletter
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "how-we-use",
      title: "2. How We Use Your Information",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-sm">
            <span className="font-medium">To Process and Fulfill Orders:</span>{" "}
            To process your orders, ship products, and provide order updates.
          </li>
          <li className="text-sm">
            <span className="font-medium">To Provide Customer Support:</span> To
            respond to your inquiries, resolve issues, and provide assistance.
          </li>
          <li className="text-sm">
            <span className="font-medium">To Improve Our Services:</span> To
            analyze website usage, improve our products and services, and
            enhance user experience.
          </li>
          <li className="text-sm">
            <span className="font-medium">To Communicate with You:</span> To
            send order confirmations, shipping updates, promotional emails (with
            your consent), and important notices.
          </li>
          <li className="text-sm">
            <span className="font-medium">
              To Prevent Fraud and Ensure Security:
            </span>{" "}
            To protect against fraud, unauthorized transactions, and other
            security risks.
          </li>
          <li className="text-sm">
            <span className="font-medium">
              To Comply with Legal Obligations:
            </span>{" "}
            To comply with applicable laws and regulations.
          </li>
        </ul>
      ),
    },
    {
      id: "cookies",
      title: "3. Cookies and Similar Technologies",
      content: (
        <div className="space-y-3">
          <p className="text-sm">
            We use cookies and similar technologies to collect website usage
            information and enhance your browsing experience. Cookies are small
            data files stored on your device that allow us to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm">Remember your preferences</li>
            <li className="text-sm">Track website traffic</li>
            <li className="text-sm">Analyze website performance</li>
            <li className="text-sm">Personalize your experience</li>
          </ul>
          <p className="text-sm">
            You can control cookies through your browser settings. However,
            disabling cookies may affect your ability to use certain features of
            our website.
          </p>
        </div>
      ),
    },
    {
      id: "sharing",
      title: "4. Sharing Your Information",
      content: (
        <div className="space-y-3">
          <p className="text-sm">
            We may share your information with the following third parties:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm">
              <span className="font-medium">Service Providers:</span> We share
              information with third-party service providers who assist us with
              payment processing, shipping, website hosting, and other services.
            </li>
            <li className="text-sm">
              <span className="font-medium">Payment Processors:</span> We use
              secure payment processors to process your payments. We do not
              store your credit card information on our servers.
            </li>
            <li className="text-sm">
              <span className="font-medium">Shipping Carriers:</span> We share
              your shipping information with shipping carriers to deliver your
              orders.
            </li>
            <li className="text-sm">
              <span className="font-medium">Legal Compliance:</span> We may
              share your information when required by law or to protect our
              rights and interests.
            </li>
            <li className="text-sm">
              <span className="font-medium">Business Transfers:</span> Your
              information may be transferred to the acquiring entity in the
              event of a merger, acquisition, or sale of assets.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "security",
      title: "5. Data Security",
      content: (
        <p className="text-sm">
          We take reasonable measures to protect your information from
          unauthorized access, use, or disclosure. However, no method of
          transmission over the Internet or electronic storage is completely
          secure.
        </p>
      ),
    },
    {
      id: "retention",
      title: "6. Data Retention",
      content: (
        <p className="text-sm">
          We retain your information for as long as necessary to fulfill the
          purposes outlined in this Privacy Policy, unless a longer retention
          period is required or permitted by law.
        </p>
      ),
    },
    {
      id: "rights",
      title: "7. Your Rights",
      content: (
        <div className="space-y-3">
          <p className="text-sm">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm">
              Access: You can request access to the personal information we hold
              about you.
            </li>
            <li className="text-sm">
              Correction: You can request to correct any inaccurate or
              incomplete information.
            </li>
            <li className="text-sm">
              Deletion: You can request to delete your personal information,
              subject to legal limitations.
            </li>
            <li className="text-sm">
              Opt-Out: You can opt out of receiving promotional emails by
              following the unsubscribe instructions in the emails.
            </li>
            <li className="text-sm">
              Data Portability: You can request a copy of your personal data in
              a machine-readable format.
            </li>
          </ul>
          <p className="text-sm">
            To exercise these rights, please contact us at
            brickextremeofficial@gmail.com
          </p>
        </div>
      ),
    },
    {
      id: "children",
      title: "8. Children's Privacy",
      content: (
        <p className="text-sm">
          Our website is not intended for children under the age of 13. We do
          not knowingly collect personal information from children under 13. If
          you believe we have collected information from a child under 13,
          please contact us immediately.
        </p>
      ),
    },
    {
      id: "changes",
      title: "9. Changes to This Privacy Policy",
      content: (
        <p className="text-sm">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on our website.
          Your continued use of our website after the changes are posted
          constitutes your acceptance of the updated policy.
        </p>
      ),
    },
    {
      id: "contact",
      title: "10. Contact Us",
      content: (
        <div className="space-y-3">
          <p className="text-sm">
            If you have any questions or concerns about this Privacy Policy,
            please contact us via email at brickextremeofficial@gmail.com
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
  ];

  return (
    <>
      <Metadata title="Privacy Policy" />
      <div className="bg-background p-5">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-700 text-xs md:text-sm leading-6 mb-2">
          Welcome to Brick Extreme! We are committed to protecting your privacy
          and ensuring the security of your personal information. This Privacy
          Policy outlines how we collect, use, and share information when you
          visit our website (www.brickextreme.com) or make a purchase from us.
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
          Last Updated: {privacyLastUpdated}
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
