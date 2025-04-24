import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Facebook, Instagram } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartSheet from "@/components/layout/header/CartSheet";

const footerLinks = [
  {
    id: 1,
    title: "Account",
    links: [
      { label: "My Account", action: "myAccount" },
      { label: "Login", path: "/login" },
      { label: "Register", path: "/register" },
      { label: "Cart", action: "cart" },
    ],
  },
  {
    id: 2,
    title: "Quick Links",
    links: [
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms Of Use", path: "/terms-of-use" },
      // { label: "FAQ", path: "/faq" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    id: 3,
    title: "Support",
    links: [
      { label: "Lehi, Utah 84043", action: "location" },
      { label: "brickextremeofficial@gmail.com", action: "email" },
    ],
  },
  {
    id: 4,
    title: "World of Minifigs",
    description:
      "Follow us on social media to stay updated on new releases, exclusive promotions, and our latest collections.",
    isSocial: true,
    links: [
      {
        id: "facebook",
        icon: Facebook,
        color: "hover:text-blue-500",
        href: "https://www.facebook.com/profile.php?id=61552234252330",
        label: "Facebook",
      },
      {
        id: "instagram",
        icon: Instagram,
        color: "hover:text-pink-500",
        href: "https://www.instagram.com/theworldofminifigs/",
        label: "Instagram",
      },
    ],
  },
];

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLinkAction = {
    myAccount: () => {
      if (isAuthenticated) {
        navigate("/profile");
      } else {
        toast.info("Please login to access your account");
        navigate("/login");
      }
    },
    email: () => {
      window.location.href = "mailto:brickextremeofficial@yahoo.com";
    },
    default: (path) => path && navigate(path),
  };

  const FooterLink = ({ item }) => {
    // Social Media Link
    if (item.icon) {
      const Icon = item.icon;
      return (
        <Link
          to={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="w-10 h-10 rounded-full bg-brand-end/50 flex items-center justify-center"
        >
          <Icon
            className={`w-5 h-5 text-gray-200 ${item.color} transition-colors duration-200`}
          />
        </Link>
      );
    }

    const linkClasses =
      "hover:text-accent hover:translate-x-2 transition-transform duration-200 py-1 text-sm sm:text-base";

    // Regular or Action Link
    const handleClick = () => {
      const action =
        handleLinkAction[item.action] ||
        (() => handleLinkAction.default(item.path));
      action();
    };

    // Cart Link wrapped in Sheet
    if (item.action === "cart") {
      return (
        <Sheet>
          <SheetTrigger className={linkClasses}>{item.label}</SheetTrigger>
          <CartSheet />
        </Sheet>
      );
    }

    // Regular Link
    return (
      <div onClick={handleClick} className={`${linkClasses} cursor-pointer`}>
        {item.label}
      </div>
    );
  };

  const SectionTitle = ({ title }) => (
    <h3 className="text-xl font-bold relative">
      {title}
      <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent" />
    </h3>
  );

  const renderSection = ({ id, title, description, links, isSocial }) => (
    <div
      key={id}
      className={`space-y-5 ${isSocial ? "col-span-2 lg:col-span-1" : ""}`}
    >
      <SectionTitle title={title} />
      <div className="space-y-3 text-gray-300">
        {description && (
          <p className="text-sm sm:text-base leading-6">{description}</p>
        )}
        <div className={isSocial ? "flex items-center space-x-2" : "space-y-2"}>
          {links.map((item, index) => (
            <FooterLink key={item.id || `${item.label}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <footer className="bg-brand-dark/50">
      <div className="max-w-[1920px] mx-auto px-5 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-10">
          {footerLinks.map(renderSection)}
        </div>
        <div className="text-center text-sm text-gray-300 py-5 border-t border-brand-end/50">
          © Copyright World of Minifigs {new Date().getFullYear()}. All rights
          reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
