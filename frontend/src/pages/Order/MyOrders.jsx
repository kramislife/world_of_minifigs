import React from "react";
import Metadata from "@/components/layout/Metadata/Metadata";
import { Tabs } from "@/components/ui/tabs";
import { orderStatus } from "@/constant/orderStatus";
import { FallbackMessage } from "@/components/product/shared/FallbackStates";
import MyOrderSkeleton from "@/components/layout/skeleton/Order/MyOrderSkeleton";
import OrdersHeader from "./components/MyOrders/OrdersHeader";
import OrderStatusTabs from "./components/MyOrders/OrderStatusTabs";
import OrdersContent from "./components/MyOrders/OrdersContent";
import { useOrders } from "@/hooks/Order/useOrders";

// MAIN COMPONENT: MyOrders
const MyOrders = () => {
  const {
    orders,
    ordersByStatus,
    isLoading,
    error,
    selectedStatus,
    handleStatusChange,
    handleReviewTabChange,
    selectedReviewTab,
    handleOrderClick,

    // Tab-related props
    isMobile,
    selectedLabel,
    mainStatus,
    dropdownStatus,
    allStatuses,
    handleTabChange,

    // Review-related props
    showReviewDetails,
    reviewData,
    handleOrderCardClick,
    setShowReviewDetails,
    handleReviewEditClick,
  } = useOrders();

  // Loading state
  if (isLoading) return <MyOrderSkeleton />;

  // Empty state
  if (!orders.length || error?.status === 404) {
    return (
      <FallbackMessage
        title="No Orders Found"
        message="You haven't placed any orders yet."
      />
    );
  }

  return (
    <>
      <Metadata title="My Orders" />
      <div className="px-5 py-8">
        <OrdersHeader totalOrders={orders.length} />

        <Tabs value={selectedStatus} onValueChange={handleStatusChange}>
          <OrderStatusTabs
            totalOrders={orders.length}
            ordersByStatus={ordersByStatus}
            statusParam={selectedStatus}
            onTabChange={handleStatusChange}
            orderStatus={orderStatus}
            // Tab-related props
            isMobile={isMobile}
            selectedLabel={selectedLabel}
            mainStatus={mainStatus}
            dropdownStatus={dropdownStatus}
            allStatuses={allStatuses}
            handleTabChange={handleTabChange}
          />

          <OrdersContent
            ordersByStatus={ordersByStatus}
            selectedStatus={selectedStatus}
            orderStatus={orderStatus}
            onReviewTabChange={handleReviewTabChange}
            onOrderClick={handleOrderClick}
            orders={orders}
            selectedReviewTab={selectedReviewTab}
            // Review-related props
            showReviewDetails={showReviewDetails}
            reviewData={reviewData}
            handleOrderCardClick={handleOrderCardClick}
            setShowReviewDetails={setShowReviewDetails}
            handleReviewEditClick={handleReviewEditClick}
          />
        </Tabs>
      </div>
    </>
  );
};

export default MyOrders;
