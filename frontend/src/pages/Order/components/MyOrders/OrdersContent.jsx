import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { FallbackMessage } from "@/components/product/shared/FallbackStates";
import OrderCard from "./OrderCard";
import ReviewTabs from "./ReviewTabs";

const OrdersContent = ({
  ordersByStatus,
  orderStatus,
  onReviewTabChange,
  onOrderClick,
  orders,
  selectedReviewTab,
  showReviewDetails,
  reviewData,
  handleOrderCardClick,
  setShowReviewDetails,
  handleReviewEditClick,
}) => {
  return (
    <>
      {/* Orders by Status */}
      {orderStatus.map((status) => {
        // Determine the number of orders for this status
        const statusOrders = ordersByStatus[status.value] || [];
        const isSingleOrder = statusOrders.length === 1;

        return (
          <TabsContent key={status.id} value={status.value} className="mt-5">
            {status.value === "To Review" ? (
              <ReviewTabs
                ordersByStatus={ordersByStatus}
                onOrderClick={onOrderClick}
                selectedReviewTab={selectedReviewTab}
                onReviewTabChange={onReviewTabChange}
                showReviewDetails={showReviewDetails}
                reviewData={reviewData}
                handleOrderCardClick={handleOrderCardClick}
                setShowReviewDetails={setShowReviewDetails}
                handleReviewEditClick={handleReviewEditClick}
              />
            ) : (
              <div
                className={`grid grid-cols-1 ${
                  !isSingleOrder ? "md:grid-cols-1 lg:grid-cols-2" : ""
                } gap-4`}
              >
                {statusOrders.map((order) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    onClick={onOrderClick}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        );
      })}

      {/* All Orders*/}
      <TabsContent value="all" className="mt-5">
        {orders.length > 0 ? (
          <div
            className={`grid gap-4 grid-cols-1 ${
              orders.length > 1 ? "md:grid-cols-1 lg:grid-cols-2" : ""
            }`}
          >
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} onClick={onOrderClick} />
            ))}
          </div>
        ) : (
          <FallbackMessage
            title="No Orders Found"
            message="You haven't placed any orders yet."
            minHeight="min-h-[300px]"
          />
        )}
      </TabsContent>
    </>
  );
};

export default OrdersContent;
