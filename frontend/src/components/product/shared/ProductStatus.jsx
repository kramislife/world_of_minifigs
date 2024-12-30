import React from "react";

const ProductStatus = ({ stock, variant = "default" }) => {
  const getStockStatus = () => {
    if (!stock || stock <= 0) {
      return {
        text: "Unavailable",
        color: "text-red-500",
        bgColor: "bg-red-500",
        pillTextColor: "text-light",
      };
    }
    if (stock > 50) {
      return {
        text: "In Stock",
        color: "text-green-500",
        bgColor: "bg-green-500",
        pillTextColor: "text-black",
      };
    }
    if (stock > 0) {
      return {
        text: "Low Stock",
        color: "text-yellow-500",
        bgColor: "bg-yellow-500",
        pillTextColor: "text-black",
      };
    }
    return {
      text: "Unavailable",
      color: "text-red-500",
      bgColor: "bg-red-500",
      pillTextColor: "text-light",
    };
  };

  const stockStatus = getStockStatus();

  switch (variant) {
    case "pill":
      return (
        <span
          className={`px-5 py-1 rounded-full text-xs ${stockStatus.bgColor} ${stockStatus.pillTextColor}`}
        >
          {stockStatus.text}
        </span>
      );
    case "dot":
      return (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${stockStatus.bgColor}`} />
          <span className={`text-sm font-medium ${stockStatus.color}`}>
            {stockStatus.text === "Low Stock" 
              ? `Hurry up, ${stock} stocks left!`
              : stockStatus.text}
          </span>
        </div>
      );
    default:
      return (
        <span className={`text-sm font-medium ${stockStatus.color}`}>
          {stockStatus.text}
        </span>
      );
  }
};

export default ProductStatus;
