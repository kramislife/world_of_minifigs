import React, { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Package2, MessageSquare, Edit2 } from "lucide-react";
import { orderStatus } from "@/constant/orderStatus";
import { Button } from "@/components/ui/button";
import ReviewDialog from "@/pages/Reviews/ReviewDialog";
import { useGetReviewByOrderIdQuery } from "@/redux/api/reviewApi";

const OrderCard = ({ order, onClick, showReviewButton, showReviewedBadge }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { data: existingReview } = useGetReviewByOrderIdQuery(order._id, {
    skip: !showReviewedBadge,
  });

  const isEdited = existingReview?.review?.products?.some(
    (product) => product.isEdited
  );

  const status = orderStatus.find((s) => s.value === order.orderStatus);

  const handleClick = (e) => {
    if (!showReviewButton) {
      onClick(order._id);
    }
  };

  const handleReviewClick = (e) => {
    e.stopPropagation(); // Prevent the card click event from firing
    setIsReviewOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        className={!showReviewButton ? "cursor-pointer" : ""}
        onClick={handleClick}
      >
        <Card className="bg-brand/80 border-gray-600/50 hover:border-gray-500/50 transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-950 border border-blue-800">
                  <Package2 className="w-5 h-5 text-blue-400" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold text-white">
                    #{order._id}
                  </CardTitle>
                  <p className="text-xs text-gray-400">
                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
              <div
                className={`px-3 py-1.5 rounded-full ${status?.color} ${status?.bgColor} border border-gray-600/50`}
              >
                <div className="flex items-center gap-1.5">
                  {status?.icon && <status.icon className="w-4 h-4" />}
                  <span className="text-sm font-medium">
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Items</p>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-950 border border-blue-800">
                    <Package className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-sm text-white">
                    {order.orderItems.length}{" "}
                    {order.orderItems.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                <p className="text-xl font-bold text-emerald-400">
                  ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Display Write a Review if Review is Pending otherwise show Reviewed */}
            {(showReviewButton || showReviewedBadge) && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                {showReviewButton ? (
                  <Button
                    onClick={handleReviewClick}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Write a Review
                  </Button>
                ) : showReviewedBadge ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MessageSquare className="w-4 h-4" />
                      Reviewed
                      {isEdited && (
                        <span className="text-xs text-yellow-400">
                          (Edited)
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReviewClick}
                      disabled={isEdited}
                      className={`border-gray-700 hover:bg-gray-300 ${
                        isEdited ? "opacity-50 cursor-not-allowed" : ""
                      }`}
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

      {/* Review Dialog */}
      <ReviewDialog
        open={isReviewOpen}
        onOpenChange={setIsReviewOpen}
        order={order}
        existingReview={existingReview}
      />
    </>
  );
};

export default OrderCard;
