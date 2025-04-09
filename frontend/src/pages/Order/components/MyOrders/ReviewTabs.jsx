import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare, CheckSquare } from "lucide-react";
import { FallbackMessage } from "@/components/product/shared/FallbackStates";
import OrderCard from "./OrderCard";
import ReviewDetailsDialog from "@/pages/Reviews/components/ReviewDetailsDialog";

const ReviewTabs = ({
  ordersByStatus,
  selectedReviewTab,
  onReviewTabChange,
  showReviewDetails,
  reviewData,
  handleOrderCardClick,
  setShowReviewDetails,
  handleReviewEditClick,
}) => {
  // Extract ReviewTabContent as a sub-component
  const ReviewTabContent = ({
    type,
    orders,
    emptyTitle,
    emptyMessage,
    showReviewButton,
    showReviewedBadge,
  }) => {
    const isHistory = type === "history";
    const isSingleOrder = orders?.length === 1;

    if (!orders?.length) {
      return (
        <FallbackMessage
          title={emptyTitle}
          message={emptyMessage}
          minHeight="min-h-[300px]"
        />
      );
    }

    return (
      <div
        className={`grid grid-cols-1 ${
          !isSingleOrder ? "md:grid-cols-1 lg:grid-cols-2" : ""
        } gap-4`}
      >
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onClick={(orderId) => handleOrderCardClick(orderId, isHistory)}
            showReviewButton={showReviewButton}
            showReviewedBadge={showReviewedBadge}
            data-order-id={order._id}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Tabs
        defaultValue={selectedReviewTab}
        className="w-full"
        onValueChange={onReviewTabChange}
      >
        <TabsList className="grid grid-cols-2 gap-2 bg-gray-900/50 mb-5">
          <TabsTrigger
            value="pending"
            className=" gap-2 hover:bg-brand-start hover:text-white"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Pending Reviews</span>
            <span className="sm:hidden">Pending</span>
            {ordersByStatus["To Review"]?.pending.length > 0 && (
              <span className="ml-1 text-xs bg-accent px-1.5 py-0.5 rounded-full text-foreground">
                {ordersByStatus["To Review"].pending.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="gap-2 hover:bg-brand-start hover:text-white"
          >
            <CheckSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Review History</span>
            <span className="sm:hidden">History</span>
            {ordersByStatus["To Review"]?.history.length > 0 && (
              <span className="ml-1 text-xs bg-accent px-1.5 py-0.5 rounded-full text-foreground">
                {ordersByStatus["To Review"].history.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <ReviewTabContent
            type="pending"
            orders={ordersByStatus["To Review"]?.pending || []}
            emptyTitle="No Pending Reviews"
            emptyMessage="You don't have any products waiting to be reviewed."
            showReviewButton={true}
          />
        </TabsContent>

        <TabsContent value="history">
          <ReviewTabContent
            type="history"
            orders={ordersByStatus["To Review"]?.history || []}
            emptyTitle="No Review History"
            emptyMessage="You haven't reviewed any products yet."
            showReviewedBadge={true}
          />
        </TabsContent>
      </Tabs>

      {/* Review Details Dialog */}
      {showReviewDetails && (
        <ReviewDetailsDialog
          open={showReviewDetails}
          onOpenChange={setShowReviewDetails}
          review={reviewData?.review}
          onEditClick={handleReviewEditClick}
        />
      )}
    </>
  );
};

export default ReviewTabs;
