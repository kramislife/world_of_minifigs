import React from "react";

const ColorFilter = ({ option }) => (
  <div className="flex items-center space-x-2">
    <div
      className="w-4 h-4 rounded-full"
      style={{ backgroundColor: option.code }}
    />
    <span className="text-sm text-gray-300">{option.label}</span>
  </div>
);

export default ColorFilter;
