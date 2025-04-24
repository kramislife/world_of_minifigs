import React from "react";

const OrdersHeader = ({ totalOrders }) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-background">My Orders</h1>
      <div className="text-accent text-sm font-medium">
        Total Orders: {totalOrders}
      </div>
    </div>
  );
};

export default OrdersHeader;
