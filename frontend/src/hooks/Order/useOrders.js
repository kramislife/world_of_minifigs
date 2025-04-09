import { useMemo, useState, useEffect } from "react";
import {
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
} from "@/redux/api/orderApi";
import { useProcessRefundMutation } from "@/redux/api/checkoutApi";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { orderStatus } from "@/constant/orderStatus";
import { toast } from "react-toastify";
import { useGetReviewByOrderIdQuery } from "@/redux/api/reviewApi";
import { ShoppingCart } from "lucide-react";

export const useOrders = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const reviewTabParam = searchParams.get("reviewTab");
  const navigate = useNavigate();

  // Default status if not provided
  const [selectedStatus, setSelectedStatus] = useState(
    statusParam || "Pending"
  );
  const [selectedReviewTab, setSelectedReviewTab] = useState(
    reviewTabParam || "pending"
  );

  // NEW: Mobile detection logic
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedLabel, setSelectedLabel] = useState("All Orders");

  // Review dialog related states
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showReviewDetails, setShowReviewDetails] = useState(false);

  // Only fetch review data when we have a valid order ID AND the dialog is showing
  const { data: reviewData } = useGetReviewByOrderIdQuery(selectedOrderId, {
    skip:
      !selectedOrderId || !showReviewDetails || selectedOrderId === "undefined",
  });

  // Update state when URL params change
  useEffect(() => {
    if (statusParam) {
      setSelectedStatus(statusParam);
    }
    if (reviewTabParam) {
      setSelectedReviewTab(reviewTabParam);
    }
  }, [statusParam, reviewTabParam]);

  // NEW: Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // NEW: Update selected label based on status param
  useEffect(() => {
    // Set selected label based on statusParam
    if (selectedStatus === "all" || !selectedStatus) {
      setSelectedLabel("All Orders");
    } else {
      const status = orderStatus.find((s) => s.value === selectedStatus);
      if (status) setSelectedLabel(status.label);
    }
  }, [selectedStatus]);

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

  // NEW: Filter main and dropdown statuses
  const mainStatus = useMemo(
    () =>
      orderStatus.filter(
        (status) => !["Cancelled", "On Hold"].includes(status.value)
      ),
    []
  );

  const dropdownStatus = useMemo(
    () =>
      orderStatus.filter((status) =>
        ["Cancelled", "On Hold"].includes(status.value)
      ),
    []
  );

  // NEW: Create allStatuses array
  const allStatuses = useMemo(
    () => [
      { id: "all", value: "all", label: "All Orders", icon: ShoppingCart },
      ...orderStatus,
    ],
    []
  );

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

  // NEW: Handle tab change specifically for the OrderStatusTabs component
  const handleTabChange = (value) => {
    handleStatusChange(value);
    if (value === "all") {
      setSelectedLabel("All Orders");
    } else {
      const status = orderStatus.find((s) => s.value === value);
      if (status) setSelectedLabel(status.label);
    }
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

  // Update the order details part too to ensure we never fetch with undefined
  const { id } = useParams();
  const {
    data: orderDetails,
    isLoading: isLoadingDetails,
    error: errorDetails,
  } = useGetOrderDetailsQuery(id, {
    skip: !id || id === "undefined",
  });

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

  // Navigation to order details - with validation
  const handleOrderClick = (orderId) => {
    if (!orderId) return; // Exit early if no orderId
    navigate(`/order/${orderId}`);
  };

  // Handle order card click for reviews - with validation
  const handleOrderCardClick = (orderId, isHistory) => {
    if (!orderId) return; // Exit early if no orderId

    if (isHistory) {
      // For history tab, show review details
      setSelectedOrderId(orderId);
      setShowReviewDetails(true);
    } else {
      // For pending tab, navigate to order page
      handleOrderClick(orderId);
    }
  };

  // Handle review details dialog close
  const handleReviewDetailsClose = () => {
    setShowReviewDetails(false);
    setSelectedOrderId(null);
  };

  // Handle edit button click on review details
  const handleReviewEditClick = () => {
    setShowReviewDetails(false);
    // The component using this function should handle finding and clicking the edit button
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
    getStatusConfig,
    filteredOrderStatus,
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

    // Review management
    selectedOrderId,
    showReviewDetails,
    reviewData,
    handleOrderClick,
    handleOrderCardClick,
    handleReviewDetailsClose,
    handleReviewEditClick,
    setShowReviewDetails,

    // NEW: OrderStatusTabs related values
    isMobile,
    selectedLabel,
    mainStatus,
    dropdownStatus,
    allStatuses,
    handleTabChange,
  };
};
