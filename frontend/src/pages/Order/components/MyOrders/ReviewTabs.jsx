import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare, CheckSquare } from "lucide-react";
import EmptyState from "./EmptyState";
import OrderCard from "./OrderCard";
import { useOrders } from "@/hooks/Order/useOrders";
import ReviewDetailsDialog from "@/pages/Reviews/components/ReviewDetailsDialog";
import { useGetReviewByOrderIdQuery } from "@/redux/api/reviewApi";

export const ReviewTabs = ({ ordersByStatus, onOrderClick }) => {
  const { selectedReviewTab, handleReviewTabChange } = useOrders();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showReviewDetails, setShowReviewDetails] = useState(false);

  // Fetch review data when an order is selected from history
  const { data: reviewData } = useGetReviewByOrderIdQuery(selectedOrderId, {
    skip: !selectedOrderId || !showReviewDetails,
  });

  const handleOrderCardClick = (orderId, isHistory) => {
    if (isHistory) {
      // For history tab, show review details
      setSelectedOrderId(orderId);
      setShowReviewDetails(true);
    } else {
      // For pending tab, navigate to order page
      onOrderClick(orderId);
    }
  };

  // Extract ReviewTabContent as a sub-component
  const ReviewTabContent = ({
    type,
    orders,
    onOrderClick,
    emptyTitle,
    emptyMessage,
    showReviewButton,
    showReviewedBadge,
  }) => {
    const isHistory = type === "history";

    return (
      <TabsContent value={type}>
        {!orders.length ? (
          <EmptyState title={emptyTitle} message={emptyMessage} />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onClick={(orderId) => handleOrderCardClick(orderId, isHistory)}
                showReviewButton={showReviewButton}
                showReviewedBadge={showReviewedBadge}
              />
            ))}
          </div>
        )}
      </TabsContent>
    );
  };

  return (
    <>
      <Tabs
        defaultValue={selectedReviewTab}
        className="w-full"
        onValueChange={handleReviewTabChange}
      >
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Pending Reviews</span>
            <span className="sm:hidden">Pending</span>
            {ordersByStatus["To Review"]?.pending.length > 0 && (
              <span className="ml-1 text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
                {ordersByStatus["To Review"].pending.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Review History</span>
            <span className="sm:hidden">History</span>
            {ordersByStatus["To Review"]?.history.length > 0 && (
              <span className="ml-1 text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
                {ordersByStatus["To Review"].history.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <ReviewTabContent
          type="pending"
          orders={ordersByStatus["To Review"]?.pending || []}
          onOrderClick={onOrderClick}
          emptyTitle="No Pending Reviews"
          emptyMessage="You don't have any products waiting to be reviewed."
          showReviewButton={true}
        />

        <ReviewTabContent
          type="history"
          orders={ordersByStatus["To Review"]?.history || []}
          onOrderClick={onOrderClick}
          emptyTitle="No Review History"
          emptyMessage="You haven't reviewed any products yet."
          showReviewedBadge={true}
        />
      </Tabs>

      {/* Review Details Dialog */}
      {showReviewDetails && (
        <ReviewDetailsDialog
          open={showReviewDetails}
          onOpenChange={setShowReviewDetails}
          review={reviewData?.review}
          order={ordersByStatus["To Review"]?.history.find(
            (o) => o._id === selectedOrderId
          )}
        />
      )}
    </>
  );
};
