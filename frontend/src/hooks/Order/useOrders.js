import { useMemo, useState, useEffect } from "react";
import {
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
} from "@/redux/api/orderApi";
import { useProcessRefundMutation } from "@/redux/api/checkoutApi";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { orderStatus } from "@/constant/orderStatus";
import { toast } from "react-toastify";

export const useOrders = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const reviewTabParam = searchParams.get("reviewTab");

  // Default status if not provided
  const [selectedStatus, setSelectedStatus] = useState(
    statusParam || "Pending"
  );
  const [selectedReviewTab, setSelectedReviewTab] = useState(
    reviewTabParam || "pending"
  );

  // Update state when URL params change
  useEffect(() => {
    if (statusParam) {
      setSelectedStatus(statusParam);
    }
    if (reviewTabParam) {
      setSelectedReviewTab(reviewTabParam);
    }
  }, [statusParam, reviewTabParam]);

  // Group orders by status
  const ordersByStatus = useMemo(() => {
    if (!data?.data) return {};

    return data.data.reduce((acc, order) => {
      const status = order.orderStatus;

      // Add delivered orders to appropriate review categories
      if (status === "Delivered") {
        if (!acc["To Review"]) {
          acc["To Review"] = { pending: [], history: [] };
        }
        // Check isReviewed flag to determine category
        if (!order.isReviewed) {
          acc["To Review"].pending.push(order);
        } else {
          acc["To Review"].history.push(order);
        }
      }

      // Add to regular status category
      if (!acc[status]) acc[status] = [];
      acc[status].push(order);

      return acc;
    }, {});
  }, [data]);

  // All statuses for dropdown/tabs with counts
  const statusesWithCounts = useMemo(() => {
    const allStatuses = [
      { id: "all", value: "all", label: "All Orders" },
      ...orderStatus,
    ];

    return allStatuses.map((status) => ({
      ...status,
      count:
        status.value === "all"
          ? data?.data?.length || 0
          : status.value === "To Review"
          ? ordersByStatus["To Review"]?.pending.length || 0
          : ordersByStatus[status.value]?.length || 0,
    }));
  }, [ordersByStatus, data]);

  // Handle status tab change
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setSearchParams({ status: value });
  };

  // Handle review tab change
  const handleReviewTabChange = (value) => {
    setSelectedReviewTab(value);
    setSearchParams({ status: "To Review", reviewTab: value });
  };

  // Add new helper function for status configuration
  const getStatusConfig = (status) => {
    return (
      orderStatus.find((s) => s.value === status) || {
        color: "text-gray-400",
        bgColor: "bg-gray-500/20",
      }
    );
  };

  // Add filtered order status
  const filteredOrderStatus = useMemo(() => {
    return orderStatus.filter((status) =>
      ["Pending", "Processing", "Shipped", "Delivered"].includes(status.value)
    );
  }, []);

  // Add order details functionality
  const { id } = useParams();
  const {
    data: orderDetails,
    isLoading: isLoadingDetails,
    error: errorDetails,
  } = useGetOrderDetailsQuery(id);

  // Prepare status configuration for the current order
  const currentOrderStatus = orderDetails?.data?.orderStatus;
  const statusConfig = useMemo(
    () => getStatusConfig(currentOrderStatus),
    [currentOrderStatus]
  );
  const StatusIcon = statusConfig?.icon;

  // Check if order is cancelled
  const isOrderCancelled = currentOrderStatus === "Cancelled";

  // Cancel order dialog state and logic
  const navigate = useNavigate();
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [otherReason, setOtherReason] = useState("");
  const [processRefund, { isLoading: isProcessingRefund }] =
    useProcessRefundMutation();

  const handleReasonChange = (reason) => {
    setSelectedReasons((prev) => {
      if (prev.includes(reason)) {
        // If removing "Other", clear the otherReason text
        if (reason === "Other") {
          setOtherReason("");
        }
        return prev.filter((r) => r !== reason);
      } else {
        return [...prev, reason];
      }
    });
  };

  const handleCancelOrder = async (orderId, onOpenChange) => {
    if (selectedReasons.length > 0) {
      const reasons = selectedReasons.map((reason) =>
        reason === "Other" ? `Other: ${otherReason}` : reason
      );
      const formattedReason = reasons.join(", ");

      try {
        await processRefund({
          orderId,
          reason: formattedReason,
        }).unwrap();

        toast.success("Order cancelled and refund initiated successfully");
        onOpenChange(false);
        navigate("/my-orders?status=Cancelled");
      } catch (error) {
        toast.error(error?.data?.message || "Failed to process refund");
      }
    }
  };

  const isOtherSelected = selectedReasons.includes("Other");
  const isCancelButtonDisabled =
    selectedReasons.length === 0 ||
    (isOtherSelected && !otherReason.trim()) ||
    isProcessingRefund;

  return {
    orders: data?.data || [],
    ordersByStatus,
    isLoading,
    error,
    selectedStatus,
    selectedReviewTab,
    statusesWithCounts,
    handleStatusChange,
    handleReviewTabChange,
    getStatusConfig, // Export the helper function
    filteredOrderStatus, // Export filtered status
    orderDetails: orderDetails?.data,
    isLoadingDetails,
    errorDetails,
    statusConfig,
    StatusIcon,
    isOrderCancelled,

    // Cancel dialog related values
    selectedReasons,
    otherReason,
    isProcessingRefund,
    handleReasonChange,
    handleCancelOrder,
    setOtherReason,
    isOtherSelected,
    isCancelButtonDisabled,
  };
};
