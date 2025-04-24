import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare, CheckSquare } from "lucide-react";
import { FallbackMessage } from "@/components/product/shared/FallbackStates";
import OrderCard from "./OrderCard";

const ReviewTabs = ({
  ordersByStatus,
  selectedReviewTab,
  onReviewTabChange,
  handleOrderCardClick,
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
    if (!orders || !orders.length) {
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
          orders.length > 1 ? "md:grid-cols-1 lg:grid-cols-2" : ""
        } gap-4`}
      >
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onClick={(orderId) =>
              handleOrderCardClick(orderId, type === "history")
            }
            showReviewButton={showReviewButton}
            showReviewedBadge={showReviewedBadge}
            data-order-id={order._id}
          />
        ))}
      </div>
    );
  };

  return (
    <Tabs
      defaultValue={selectedReviewTab}
      className="w-full"
      onValueChange={onReviewTabChange}
    >
      <TabsList className="grid grid-cols-2 gap-2 bg-gray-900/50 mb-5">
        <TabsTrigger value="pending">
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Pending Reviews</span>
          <span className="sm:hidden">Pending</span>
          <span className="ml-1 text-xs bg-accent px-1.5 py-0.5 rounded-full text-foreground">
            {ordersByStatus["To Review"]?.pending?.length || 0}
          </span>
        </TabsTrigger>
        <TabsTrigger value="history">
          <CheckSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Review History</span>
          <span className="sm:hidden">History</span>
          <span className="ml-1 text-xs bg-accent px-1.5 py-0.5 rounded-full text-foreground">
            {ordersByStatus["To Review"]?.history?.length || 0}
          </span>
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
  );
};

export default ReviewTabs;
