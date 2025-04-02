import React from "react";
import { Facebook, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "@/redux/features/userSlice";
import { toast } from "react-toastify";

const footerLinks = [
  {
    id: 1,
    title: "Account",
    links: [
      {
        label: "My Account",
        action: "myAccount", // Custom action for conditional handling
      },
      {
        label: "Login",
        path: "/login",
      },
      {
        label: "Register",
        path: "/register",
      },
      {
        label: "Cart",
        action: "cart", // Custom action for cart handling
      },
    ],
  },
  {
    id: 2,
    title: "Quick Links",
    links: [
      {
        label: "Privacy Policy",
        path: "/privacy-policy",
      },
      {
        label: "Terms Of Use",
        path: "/terms-of-use",
      },
      {
        label: "FAQ",
        path: "/faq",
      },
      {
        label: "Contact",
        path: "/contact",
      },
    ],
  },
  {
    id: 3,
    title: "Support",
    links: [
      {
        label: "Lehi, Utah 84043",
        action: "location",
      },
      {
        label: "brickextremeofficial@gmail.com",
        action: "email",
      },
    ],
  },
];

const socialLinks = [
  {
    id: 1,
    icon: Facebook,
    color: "hover:text-blue-500",
    href: "https://www.facebook.com/profile.php?id=61552234252330",
    label: "Facebook",
  },
  {
    id: 2,
    icon: Instagram,
    color: "hover:text-pink-500",
    href: "https://www.instagram.com/theworldofminifigs/",
    label: "Instagram",
  },
];

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    if (typeof link === "string") {
      return; // Handle regular text links
    }

    if (link.action === "myAccount") {
      if (isAuthenticated) {
        navigate("/profile");
      } else {
        toast.info("Please login to access your account");
        navigate("/login");
      }
    } else if (link.action === "cart") {
      dispatch(setIsCartOpen(true));
    } else if (link.action === "email") {
      window.location.href = "mailto:brickextremeofficial@yahoo.com";
    } else if (link.path) {
      navigate(link.path);
    }
  };

  return (
    <footer className="bg-brand-start border-t border-gray-600/50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6">
        <div className="pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-12">
            {footerLinks.map((link) => (
              <div key={link.id} className="space-y-6">
                <h3 className="text-xl font-bold tracking-wide text-gray-200 relative inline-block">
                  {link.title}
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent"></span>
                </h3>
                <ul className="space-y-4 text-gray-300">
                  {link.links.map((item, index) => (
                    <li
                      key={typeof item === "string" ? item : item.label}
                      className="hover:text-accent cursor-pointer transition-all duration-200 flex items-center group"
                      onClick={() => handleLinkClick(item)}
                    >
                      <div className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:-ml-5 group-hover:opacity-100 transition-all duration-200 text-red-500" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {typeof item === "string" ? item : item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col space-y-6 mt-8 lg:mt-0">
              <h3 className="text-xl font-bold tracking-wide text-gray-200 relative inline-block">
                World of Minifigs
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent"></span>
              </h3>
              <div className="flex flex-col space-y-1">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Follow us on social media to stay updated on new releases,
                  exclusive promotions, and our latest collections.
                </p>
                {/* <div className="relative max-w-md">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800/50 border-gray-700 text-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent pr-24"
                  />
                  <Button className="absolute right-0 top-0 h-full bg-accent hover:bg-accent/90 text-foreground transition-all duration-200 rounded-l-none">
                    Subscribe
                  </Button>
                </div> */}
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
                        className={`w-10 h-10 rounded-full bg-brand-end/50 flex items-center justify-center`}
                      >
                        <Icon
                          className={`w-5 h-5 text-gray-200 ${social.color} transition-colors duration-200`}
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-600/50 mt-8" />

        <div className="text-center text-sm text-gray-300 py-5">
          © Copyright World of Minifigs 2025. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
