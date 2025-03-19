import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, CheckCircle, Shield, Truck, RotateCcw } from 'lucide-react';

const TermsOfUse = () => {
  const [expandedSection, setExpandedSection] = useState('acceptance');
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  const termsLastUpdated = "March 3, 2025";
  
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <CheckCircle className="w-5 h-5 text-blue-500" />,
      content: 'By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use our website.'
    },
    {
      id: 'products',
      title: 'Products and Services',
      icon: <Info className="w-5 h-5 text-blue-500" />,
      content: (
        <>
          <p className="mb-2">Brick Extreme offers ready-to-build MOCs (My Own Creations) and customized LEGO build sets. All products are sourced from genuine, new LEGO elements.</p>
          <p className="mb-2"><span className="font-medium">Product Descriptions:</span> We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions or other content are accurate, complete, reliable, current, or error-free.</p>
          <p className="mb-2"><span className="font-medium">Availability:</span> Product availability is subject to change without notice.</p>
          <p className="mb-2"><span className="font-medium">Pricing:</span> Prices are subject to change without notice. We are not responsible for typographical errors regarding price or any other matter.</p>
          <p><span className="font-medium">LEGO Trademark:</span> Brick Extreme is an independent seller of LEGO products. We are not affiliated with, endorsed, or sponsored by the LEGO Group. LEGO® is a trademark of the LEGO Group of companies, which does not sponsor, authorize, or endorse this site.</p>
        </>
      )
    },
    {
      id: 'orders',
      title: 'Orders and Payment',
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      content: (
        <>
          <p className="mb-2"><span className="font-medium">Order Acceptance:</span> Your order constitutes an offer to purchase our products. We reserve the right to accept or decline your order for any reason.</p>
          <p className="mb-2"><span className="font-medium">Payment:</span> Payment must be made through our secure payment processors. You agree to provide accurate and complete payment information.</p>
          <p><span className="font-medium">Order Confirmation:</span> You will receive an order confirmation email upon successful placement of your order.</p>
        </>
      )
    },
    {
      id: 'shipping',
      title: 'Shipping and Delivery',
      icon: <Truck className="w-5 h-5 text-blue-500" />,
      content: (
        <>
          <p className="mb-2"><span className="font-medium">Shipping:</span> We will ship your order to the address provided during checkout.</p>
          <p className="mb-2"><span className="font-medium">Delivery:</span> Delivery times may vary depending on your location and shipping method. We are not responsible for delays caused by shipping carriers.</p>
          <p><span className="font-medium">Risk of Loss:</span> The risk of loss and title for items purchased pass to you upon our delivery to the shipping carrier.</p>
        </>
      )
    },
    {
      id: 'returns',
      title: 'Returns and Refunds',
      icon: <RotateCcw className="w-5 h-5 text-blue-500" />,
      content: (
        <>
          <p className="mb-2"><span className="font-medium">Return Policy:</span> Please refer to our separate Return Policy for details on returns and refunds.</p>
          <p><span className="font-medium">Damaged or Defective Products:</span> If you receive a damaged or defective product, please contact us immediately.</p>
        </>
      )
    },
    {
      id: 'conduct',
      title: 'User Conduct',
      content: (
        <>
          <p className="mb-2">You agree to use our website and services lawfully and responsibly. You must not:</p>
          <ul className="list-disc pl-5 mb-2">
            <li>Use our website for any illegal or unauthorized purpose.</li>
            <li>Transmit any viruses or other harmful code.</li>
            <li>Attempt to gain unauthorized access to our systems.</li>
            <li>Engage in any conduct that disrupts or interferes with our website or services.</li>
          </ul>
        </>
      )
    },
    {
      id: 'ip',
      title: 'Intellectual Property',
      content: (
        <>
          <p className="mb-2"><span className="font-medium">Content:</span> All content on our website, including text, images, and logos, is our property or the property of our licensors and is protected by intellectual property laws.</p>
          <p><span className="font-medium">MOC Designs:</span> MOC designs sold by Brick Extreme are either designed by Brick Extreme or used with permission from the original designer. Copying or redistributing these designs without permission is prohibited.</p>
        </>
      )
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer of Warranties',
      content: 'Our website and products are provided "as is" and "as available" without any warranties, express or implied. We do not warrant that our website will be uninterrupted or error-free.'
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      content: 'In no event shall Brick Extreme be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or products.'
    },
    {
      id: 'indemnification',
      title: 'Indemnification',
      content: 'You agree to indemnify and hold Brick Extreme harmless from any claims, damages, or expenses arising out of your use of our website or products.'
    },
    {
      id: 'governing',
      title: 'Governing Law',
      content: 'These Terms of Use shall be governed by and construed following the laws of the United States, without regard to its conflict of law principles.'
    },
    {
      id: 'changes',
      title: 'Changes to Terms of Use',
      content: 'We may update these Terms of Use from time to time. We will notify you of any changes by posting the new Terms of Use on our website. Your continued use of our website after the changes are posted constitutes your acceptance of the updated terms.'
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: 'If you have any questions or concerns about these Terms of Use, please contact us via email at brickextremeofficial@yahoo.com'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-3">Terms of Use</h1>
          <p className="text-lg text-gray-600">Last Updated: {termsLastUpdated}</p>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
            <p className="text-sm">Welcome to Brick Extreme! By accessing and using our website (www.brickextreme.com) and purchasing our products, you agree to comply with and be bound by the following Terms of Use. Please read these terms carefully.</p>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <button
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center">
                  {section.icon && <span className="mr-3">{section.icon}</span>}
                  <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                </div>
                {expandedSection === section.id ? 
                  <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                }
              </button>
              {expandedSection === section.id && (
                <div className="p-4 pt-0 border-t border-gray-200 text-gray-700">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            By continuing to use our website, you acknowledge and agree to these Terms of Use.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">
              Accept Terms
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-medium">
              Print Terms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;