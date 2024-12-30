import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    id: 1,
    title: "Account",
    links: ["My Account", "Login / Register", "Cart", "Wishlist"],
  },
  {
    id: 2,
    title: "Quick Links",
    links: ["Privacy Policy", "Terms Of Use", "FAQ", "Contact"],
  },
  {
    id: 3,
    title: "Support",
    links: [
      "sample 123",
      "address 123",
      "brickextremeofficial@gmail.com",
      "+11111-222222-3333",
    ],
  },
];

const socialLinks = [
  {
    id: 1,
    icon: Facebook,
    color: "hover:text-blue-500",
    href: "https://facebook.com",
    label: "Facebook"
  },
  {
    id: 2,
    icon: Twitter,
    color: "hover:text-blue-400",
    href: "https://twitter.com",
    label: "Twitter"
  },
  {
    id: 3,
    icon: Instagram,
    color: "hover:text-pink-500",
    href: "https://instagram.com",
    label: "Instagram"
  },
  {
    id: 4,
    icon: Linkedin,
    color: "hover:text-blue-600",
    href: "https://linkedin.com",
    label: "LinkedIn"
  }
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-brand-start to-darkBrand">
      <div className="max-w-8xl mx-auto px-5 md:px-12 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-12">
          {footerLinks.map((link) => (
            <div key={link.id} className="space-y-6">
              <h3 className="text-xl font-bold tracking-wide text-gray-200 relative inline-block">
                {link.title}
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-600"></span>
              </h3>
              <ul className="space-y-4 text-gray-400">
                {link.links.map((item) => (
                  <li
                    key={item}
                    className="hover:text-red-500 cursor-pointer transition-all duration-200 flex items-center group"
                  >
                    <div className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:-ml-5 group-hover:opacity-100 transition-all duration-200 text-red-500" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col space-y-6 mt-8 lg:mt-0">
            <h3 className="text-xl font-bold tracking-wide text-gray-200 relative inline-block">
              Brick Extreme
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-600"></span>
            </h3>
            <div className="flex flex-col space-y-6">
              <p className="text-gray-400 text-sm leading-relaxed">
                Join Brick Extreme to get updates on new releases, exclusive
                promotions, and be the first to know about our latest collections.
              </p>
              <div className="relative max-w-md">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800/50 border-gray-700 text-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent pr-24"
                />
                <Button className="absolute right-0 top-0 h-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200 rounded-l-none">
                  Subscribe
                </Button>
              </div>
              <div className="flex items-center space-x-4 pt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center group transition-all duration-200 hover:bg-gray-700/50 hover:scale-110`}
                    >
                      <Icon className={`w-5 h-5 text-gray-400 ${social.color} transition-colors duration-200`} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800/50 mt-8 max-w-[1440px] mx-auto" />

      <div className="text-center text-sm px-6 text-gray-400 py-5">
        <p className="hover:text-gray-400 transition-colors">
          © Copyright Brick Extreme 2024. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
