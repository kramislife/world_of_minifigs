import React from "react";
import { Badge } from "@/components/ui/badge";

const ProductStatus = ({ stock, variant = "default" }) => {
  const getStockStatus = () => {
    if (!stock || stock <= 0) {
      return {
        text: "Unavailable",
        badgeVariant: "destructive",
        dotColor: "bg-destructive",
        textColor: "text-destructive",
      };
    }
    if (stock > 50) {
      return {
        text: "In Stock",
        badgeVariant: "success",
        dotColor: "bg-green-500",
        textColor: "text-green-500",
      };
    }
    if (stock > 0) {
      return {
        text: "Low Stock",
        badgeVariant: "warning",
        dotColor: "bg-yellow-500",
        textColor: "text-accent",
      };
    }
    return {
      text: "Unavailable",
      badgeVariant: "destructive",
      dotColor: "bg-destructive",
      textColor: "text-destructive",
    };
  };

  const stockStatus = getStockStatus();

  switch (variant) {
    case "pill":
      return (
        <Badge variant={stockStatus.badgeVariant}>{stockStatus.text}</Badge>
      );

    case "dot":
      return (
        <div className="flex items-center gap-2 relative">
          <span
            className={`w-2 h-2 rounded-full ${stockStatus.dotColor} animate-ping absolute`}
          />
          <span className={`w-2 h-2 rounded-full ${stockStatus.dotColor}`} />
          <span className={`text-sm font-medium ${stockStatus.textColor}`}>
            {stockStatus.text === "Low Stock"
              ? `Hurry up, ${stock} stocks left!`
              : stockStatus.text}
          </span>
        </div>
      );

    default:
      return (
        <span className={`text-sm font-medium ${stockStatus.textColor}`}>
          {stockStatus.text}
        </span>
      );
  }
};

export default ProductStatus;
