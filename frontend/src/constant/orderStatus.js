import {
  Clock,
  Truck,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  RotateCcw,
  Star,
} from "lucide-react";

export const orderStatus = [
  {
    id: "Pending",
    value: "Pending",
    icon: Clock,
    color: "text-accent",
    bgColor: "bg-accent",
    label: "Pending",
    allowedTransitions: ["Processing", "On Hold", "Cancelled"],
  },
  {
    id: "Processing",
    value: "Processing",
    icon: RotateCcw,
    color: "text-blue-400",
    bgColor: "bg-blue-500",
    label: "Processing",
    allowedTransitions: ["Shipped", "On Hold", "Cancelled"],
  },
  {
    id: "Shipped",
    value: "Shipped",
    icon: Truck,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500",
    label: "Shipped",
    allowedTransitions: ["Delivered", "Returned"],
  },
  {
    id: "Delivered",
    value: "Delivered",
    icon: CheckCircle2,
    color: "text-green-400",
    bgColor: "bg-green-500",
    label: "Delivered",
    allowedTransitions: ["Returned"],
  },
  {
    id: "To Review",
    value: "To Review",
    icon: Star,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500",
    label: "To Review",
    allowedTransitions: ["Returned"],
  },
  {
    id: "Cancelled",
    value: "Cancelled",
    icon: AlertCircle,
    color: "text-red-400",
    bgColor: "bg-red-500",
    label: "Cancelled",
    allowedTransitions: [],
  },
  {
    id: "On Hold",
    value: "On Hold",
    icon: PauseCircle,
    color: "text-orange-400",
    bgColor: "bg-orange-500",
    label: "On Hold",
    allowedTransitions: ["Processing", "Cancelled"],
  },
];

// Helper function to check if a status transition is valid
export const isValidStatusTransition = (currentStatus, newStatus) => {
  const status = orderStatus.find((s) => s.value === currentStatus);
  return status?.allowedTransitions.includes(newStatus);
};
