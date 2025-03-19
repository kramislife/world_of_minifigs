import React from "react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Metadata from "@/components/layout/Metadata/Metadata";

const PrivacyPolicy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const sections = [
    {
      id: "information-collected",
      title: "1. Information We Collect",
      content: [
        {
          subtitle: "Personal Information:",
          items: ["Name", "Shipping and billing address", "Email address", "Phone number", "Payment information (processed by our secure payment processors)"]
        },
        {
          subtitle: "Order Information:",
          items: ["Details of the products you purchase", "Order history", "Shipping information"]
        },
        {
          subtitle: "Website Usage Information:",
          items: ["IP address", "Browser type", "Device information", "Pages visited", "Cookies and similar technologies (see section 3)"]
        },
        {
          subtitle: "Communication Information:",
          items: ["Information you provide when you contact us with inquiries or support requests", "Information provided when you subscribe to our newsletter"]
        }
      ]
    },
    {
      id: "how-we-use",
      title: "2. How We Use Your Information",
      content: [
        {
          subtitle: "To Process and Fulfill Orders:",
          text: "To process your orders, ship products, and provide order updates."
        },
        {
          subtitle: "To Provide Customer Support:",
          text: "To respond to your inquiries, resolve issues, and provide assistance."
        },
        {
          subtitle: "To Improve Our Services:",
          text: "To analyze website usage, improve our products and services, and enhance user experience."
        },
        {
          subtitle: "To Communicate with You:",
          text: "To send order confirmations, shipping updates, promotional emails (with your consent), and important notices."
        },
        {
          subtitle: "To Prevent Fraud and Ensure Security:",
          text: "To protect against fraud, unauthorized transactions, and other security risks."
        },
        {
          subtitle: "To Comply with Legal Obligations:",
          text: "To comply with applicable laws and regulations."
        }
      ]
    },
    {
      id: "cookies",
      title: "3. Cookies and Similar Technologies",
      content: [
        {
          text: "We use cookies and similar technologies to collect website usage information and enhance your browsing experience. Cookies are small data files stored on your device that allow us to:"
        },
        {
          items: ["Remember your preferences", "Track website traffic", "Analyze website performance", "Personalize your experience"]
        },
        {
          text: "You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website."
        }
      ]
    },
    {
      id: "sharing",
      title: "4. Sharing Your Information",
      content: [
        {
          text: "We may share your information with the following third parties:"
        },
        {
          subtitle: "Service Providers:",
          text: "We share information with third-party service providers who assist us with payment processing, shipping, website hosting, and other services."
        },
        {
          subtitle: "Payment Processors:",
          text: "We use secure payment processors to process your payments. We do not store your credit card information on our servers."
        },
        {
          subtitle: "Shipping Carriers:",
          text: "We share your shipping information with shipping carriers to deliver your orders."
        },
        {
          subtitle: "Legal Compliance:",
          text: "We may share your information when required by law or to protect our rights and interests."
        },
        {
          subtitle: "Business Transfers:",
          text: "Your information may be transferred to the acquiring entity in the event of a merger, acquisition, or sale of assets."
        }
      ]
    },
    {
      id: "security",
      title: "5. Data Security",
      content: [
        {
          text: "We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is completely secure."
        }
      ]
    },
    {
      id: "retention",
      title: "6. Data Retention",
      content: [
        {
          text: "We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law."
        }
      ]
    },
    {
      id: "rights",
      title: "7. Your Rights",
      content: [
        {
          text: "You have the following rights regarding your personal information:"
        },
        {
          items: [
            "Access: You can request access to the personal information we hold about you.",
            "Correction: You can request to correct any inaccurate or incomplete information.",
            "Deletion: You can request to delete your personal information, subject to legal limitations.",
            "Opt-Out: You can opt out of receiving promotional emails by following the unsubscribe instructions in the emails.",
            "Data Portability: You can request a copy of your personal data in a machine-readable format."
          ]
        },
        {
          text: "To exercise these rights, please contact us at brickextremeofficial@gmail.com"
        }
      ]
    },
    {
      id: "children",
      title: "8. Children's Privacy",
      content: [
        {
          text: "Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately."
        }
      ]
    },
    {
      id: "changes",
      title: "9. Changes to This Privacy Policy",
      content: [
        {
          text: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. Your continued use of our website after the changes are posted constitutes your acceptance of the updated policy."
        }
      ]
    },
    {
      id: "contact",
      title: "10. Contact Us",
      content: [
        {
          text: "If you have any questions or concerns about this Privacy Policy, please contact us via email at brickextremeofficial@gmail.com"
        }
      ]
    }
  ];

  return (
    <>
      <Metadata 
        title="Privacy Policy | Brick Extreme" 
        description="Learn about how Brick Extreme collects, uses, and protects your personal information when you use our website or purchase our custom LEGO® creations."
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-brand-start to-darkBrand">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            At Brick Extreme, we value your privacy and are committed to protecting your personal information.
            This policy explains how we collect, use, and safeguard your data.
          </p>
        </div>
      </div>

      <div className="bg-darkBrand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Last Updated */}
          <div className="mb-8 text-gray-400">
            <p>Last Updated: March 1, 2025</p>
          </div>

          {/* Table of Contents */}
          <div className="mb-12 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Contents</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-2"
                >
                  <span className="text-red-500">→</span>
                  {section.title}
                </a>
              ))}
            </div>
          </div>
          
          {/* Main Content */}
          <motion.div 
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Introduction */}
            <motion.section variants={contentVariants} className="bg-gray-900/30 rounded-xl p-6 border-l-4 border-red-500">
              <p className="text-gray-300">
                Welcome to Brick Extreme! We are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy outlines how we collect, use, and share information when you visit our website (www.brickextreme.com) or make a purchase from us.
              </p>
            </motion.section>

            {/* Policy Sections */}
            {sections.map((section) => (
              <motion.section 
                key={section.id} 
                id={section.id} 
                variants={contentVariants}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    {section.title.split(".")[0]}
                  </span>
                  {section.title.split(".")[1]}
                </h2>
                
                <div className="space-y-4 text-gray-300 pl-14">
                  {section.content.map((contentItem, idx) => (
                    <div key={idx}>
                      {contentItem.subtitle && (
                        <h3 className="font-semibold text-white mb-2">{contentItem.subtitle}</h3>
                      )}
                      {contentItem.text && (
                        <p className="mb-3">{contentItem.text}</p>
                      )}
                      {contentItem.items && (
                        <ul className="list-disc pl-5 space-y-2">
                          {contentItem.items.map((item, itemIdx) => (
                            <li key={itemIdx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                {section.id !== "contact" && <Separator className="mt-8 bg-gray-800" />}
              </motion.section>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Questions CTA */}
      <div className="bg-gradient-to-b from-darkBrand to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Have Questions About Your Privacy?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our team is here to help you understand how we protect your information. 
              If you have any questions or concerns, please don't hesitate to reach out.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-red-600 hover:bg-red-700 transition-colors">
                Contact Support
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 transition-colors text-white">
                View FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;