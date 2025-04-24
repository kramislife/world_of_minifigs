import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2, MessageSquare, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewDialog from "@/pages/Reviews/ReviewDialog";
import ReviewDetailsDialog from "@/pages/Reviews/components/ReviewDetailsDialog";
import { useGetReviewByOrderIdQuery } from "@/redux/api/reviewApi";
import { orderStatus } from "@/constant/orderStatus";
import { Badge } from "@/components/ui/badge";

const OrderCard = ({ order, onClick, showReviewButton, showReviewedBadge }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isReviewDetailsOpen, setIsReviewDetailsOpen] = useState(false);

  const { data: existingReview } = useGetReviewByOrderIdQuery(order._id, {
    skip: !order?._id || !order?.isReviewed,
  });

  const isEdited = existingReview?.review?.products?.some(
    (product) => product.isEdited && product.editedAt
  );

  // Get the latest edit date from all products
  const getLatestEditDate = () => {
    if (!existingReview?.review?.products) return null;

    const editDates = existingReview.review.products
      .filter((product) => product.isEdited && product.editedAt)
      .map((product) => new Date(product.editedAt));

    return editDates.length > 0 ? Math.max(...editDates) : null;
  };

  const status = orderStatus.find((s) => s.value === order.orderStatus);

  const handleClick = () => {
    // If we're in review history mode and this order has a review, show the review details
    if (showReviewedBadge && existingReview?.review) {
      setIsReviewDetailsOpen(true);
    } else if (!showReviewButton) {
      // Otherwise, handle regular order click
      order?._id && onClick(order._id);
    }
  };

  const handleReviewClick = (e) => {
    e.stopPropagation();
    setIsReviewOpen(true);
  };

  const handleEditReviewClick = (e) => {
    e.stopPropagation();
    setIsReviewOpen(true);
  };

  // Status badge component - reused in multiple places
  const StatusBadge = () => (
    <Badge className={`${status?.bgColor}`}>
      <div className="flex items-center gap-2 text-foreground">
        {status?.icon && <status.icon className="w-4 h-4" />}
        <span className="text-sm font-medium">{order.orderStatus}</span>
      </div>
    </Badge>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        className="cursor-pointer"
        onClick={handleClick}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-row gap-3 justify-between">
              {/* Order ID and Date */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-brand-dark border border-brand-end/50">
                  <Package2 className="w-5 h-5 text-blue-500" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-sm text-background">
                    Order #{order._id}
                  </CardTitle>
                  <p className="text-xs text-gray-300">
                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              {/* Status Badge - DESKTOP ONLY */}
              <div className="hidden sm:block self-center">
                <StatusBadge />
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-0">
            {/* Order Details */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between py-5 border-t border-brand-end/50">
              {/* Items Count and Status Badge on Mobile */}
              <div className="flex items-center justify-between gap-2 order-2 sm:order-1 w-full sm:w-auto pt-2">
                <p className="text-sm text-gray-300">
                  {order.orderItems.length}{" "}
                  {order.orderItems.length === 1 ? "item" : "items"}
                </p>
                {/* Status Badge - MOBILE ONLY */}
                <div className="sm:hidden">
                  <StatusBadge />
                </div>
              </div>

              {/* Price */}
              <div className="flex justify-between sm:block order-1 sm:order-2">
                <span className="text-sm text-gray-300 sm:hidden">Total:</span>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-400">
                    ${order.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Review Section */}
            {(showReviewButton || showReviewedBadge) && (
              <div className="py-5 border-t border-brand-end/50">
                {showReviewButton ? (
                  <Button
                    variant="accent"
                    onClick={handleReviewClick}
                    className="w-full hover:scale-100"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Write a Review
                  </Button>
                ) : showReviewedBadge ? (
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MessageSquare className="w-4 h-4" />
                        Reviewed
                        {isEdited && getLatestEditDate() && (
                          <span className="text-xs text-accent">
                            (Edited on{" "}
                            {format(
                              new Date(getLatestEditDate()),
                              "MMM dd, yyyy"
                            )}
                            )
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="hover:bg-input"
                      size="sm"
                      onClick={handleEditReviewClick}
                      disabled={isEdited}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      {isEdited ? "Already Edited" : "Edit Review"}
                    </Button>
                  </div>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Review Dialog - for creating/editing reviews */}
      <ReviewDialog
        open={isReviewOpen}
        onOpenChange={setIsReviewOpen}
        order={order}
        existingReview={existingReview}
      />

      {/* Review Details Dialog - for viewing submitted reviews */}
      <ReviewDetailsDialog
        open={isReviewDetailsOpen}
        onOpenChange={setIsReviewDetailsOpen}
        review={existingReview?.review}
        order={order}
      />
    </>
  );
};

export default OrderCard;
