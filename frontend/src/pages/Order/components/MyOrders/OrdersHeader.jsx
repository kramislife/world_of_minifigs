import React from "react";

const OrdersHeader = ({ totalOrders }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        My Orders
      </h1>
      <div className="text-gray-400 text-sm">Total Orders: {totalOrders}</div>
    </div>
  );
};

export default OrdersHeader;
