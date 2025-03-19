import React from "react";
import { useNavigate } from "react-router-dom";
import Metadata from "@/components/layout/Metadata/Metadata";
import { Tabs } from "@/components/ui/tabs";
import { orderStatus } from "@/constant/orderStatus";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import ErrorState from "./components/MyOrders/ErrorState";
import EmptyState from "./components/MyOrders/EmptyState";
import { OrderStatusTabs } from "./components/MyOrders/OrderStatusTabs";
import { useOrders } from "@/hooks/Order/useOrders";
import OrdersHeader from "./components/MyOrders/OrdersHeader";
import OrdersContent from "./components/MyOrders/OrdersContent";

const MyOrders = () => {
  const navigate = useNavigate();

  const {
    orders,
    ordersByStatus,
    isLoading,
    error,
    selectedStatus,
    handleStatusChange,
    handleReviewTabChange,
  } = useOrders();

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  // Loading state
  if (isLoading) return <LoadingSpinner className="min-h-screen" />;

  // Error state
  if (error && error.status !== 404) {
    return <ErrorState message={error.data?.message || error.message} />;
  }

  // Empty state
  if (!orders.length || error?.status === 404) {
    return (
      <EmptyState
        title="My Orders"
        message="You haven't placed any orders yet."
      />
    );
  }

  return (
    <>
      <Metadata title="My Orders" />
      <div className="p-4 md:p-10">
        <OrdersHeader totalOrders={orders.length} />

        <Tabs
          defaultValue={selectedStatus}
          className="w-full"
          onValueChange={handleStatusChange}
        >
          <OrderStatusTabs
            totalOrders={orders.length}
            ordersByStatus={ordersByStatus}
            statusParam={selectedStatus}
            onTabChange={handleStatusChange}
          />

          <OrdersContent
            ordersByStatus={ordersByStatus}
            selectedStatus={selectedStatus}
            orderStatus={orderStatus}
            onReviewTabChange={handleReviewTabChange}
            onOrderClick={handleOrderClick}
            orders={orders}
          />
        </Tabs>
      </div>
    </>
  );
};

export default MyOrders;
