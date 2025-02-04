import {
  Clock,
  Truck,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  RotateCcw,
} from "lucide-react";

export const orderStatus = [
  {
    id: "Pending",
    value: "Pending",
    icon: Clock,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    label: "Pending",
  },
  {
    id: "Processing",
    value: "Processing",
    icon: RotateCcw,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    label: "Processing",
  },
  {
    id: "Shipped",
    value: "Shipped",
    icon: Truck,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/20",
    label: "Shipped",
  },
  {
    id: "Delivered",
    value: "Delivered",
    icon: CheckCircle2,
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    label: "Delivered",
  },
  {
    id: "Cancelled",
    value: "Cancelled",
    icon: AlertCircle,
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    label: "Cancelled",
  },
  {
    id: "On Hold",
    value: "On Hold",
    icon: PauseCircle,
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
    label: "On Hold",
  }
];