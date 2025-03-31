import React from "react";
import { Clock, PackageX } from "lucide-react";
import logo from "@/assets/worldofminifigs.png";

// Placeholder image for product card
export const PlaceholderImage = ({ width = "w-28" }) => (
  <div className="w-full h-full aspect-square bg-brand-gradient flex flex-col items-center justify-center gap-4 group-hover:scale-110 transition-transform duration-500 border-b border-gray-600/50">
    <img
      src={logo}
      alt="logo"
      className={`${width} h-auto opacity-30 grayscale`}
    />
  </div>
);

// Placeholder image for product thumbnail in product details page
export const ProductThumbnailPlaceholder = ({ width = "w-16" }) => (
  <div className="w-full flex md:flex-col gap-2">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="min-w-[130px] md:min-w-0 aspect-square rounded-lg bg-brand-gradient border border-slate-700 flex items-center justify-center"
      >
        <img
          src={logo}
          alt="logo"
          className={`${width} h-auto opacity-30 grayscale`}
        />
      </div>
    ))}
  </div>
);

// Fallback message for category page
export const FallbackMessage = ({ title, message }) => (
  <div className="w-full min-h-[600px] md:min-h-[700px] bg-gradient-to-b from-brand/30 to-brand/10 flex flex-col items-center justify-center gap-6 rounded-xl backdrop-blur-sm px-4">
    <div className="relative">
      <div className="absolute -inset-1 bg-brand/20 rounded-full blur-md" />
      <PackageX className="w-20 h-20 text-gray-300 relative animate-pulse" />
    </div>

    <div className="space-y-3 text-center">
      <h3 className="text-3xl font-bold text-gray-200 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-400 max-w-lg leading-relaxed">{message}</p>
    </div>
  </div>
);
