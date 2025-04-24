import React from "react";
import { ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MobileOrderStatusDropdown = ({
  statusParam,
  selectedLabel,
  totalOrders,
  ordersByStatus,
  onTabChange,
  allStatuses,
}) => {
  // Find the current status object
  const currentStatus =
    statusParam && statusParam !== "all"
      ? allStatuses.find((s) => s.value === statusParam)
      : { value: "all", label: "All Orders", icon: ShoppingCart };

  // Function to render icon for selected value
  const renderSelectedIcon = () => {
    if (currentStatus) {
      const Icon = currentStatus.icon || ShoppingCart;
      return <Icon className="w-5 h-5 mr-2" />;
    }
    return <ShoppingCart className="w-5 h-5 mr-2" />;
  };

  return (
    <Select value={statusParam || "all"} onValueChange={onTabChange}>
      <SelectTrigger>
        <div className="flex items-center">
          {renderSelectedIcon()}
          <SelectValue placeholder="Select status">
            {selectedLabel}
            {statusParam === "all" && totalOrders > 0 && (
              <span className="ml-1 text-xs bg-accent px-1.5 py-0.5 rounded-full text-foreground">
                {totalOrders}
              </span>
            )}
          </SelectValue>
        </div>
      </SelectTrigger>

      <SelectContent>
        {allStatuses.map((status) => {
          // Check if orders exist for this status and if there are any
          const hasOrders =
            status.value === "all" || status.value === "To Review"
              ? true // Always enable "all" and "To Review"
              : ordersByStatus[status.value]?.length > 0;

          // Get count badge based on status
          const getCountBadge = () => {
            if (status.value === "all" && totalOrders > 0) {
              return totalOrders;
            } else if (
              status.value === "To Review" &&
              ordersByStatus["To Review"]?.pending?.length > 0
            ) {
              return ordersByStatus["To Review"].pending.length;
            } else if (ordersByStatus[status.value]?.length > 0) {
              return ordersByStatus[status.value].length;
            }
            return null;
          };

          const count = getCountBadge();

          return (
            <SelectItem
              key={status.id || status.value}
              value={status.value}
              disabled={status.value !== "all" && !hasOrders}
              className="py-3 focus:bg-brand-end/50 focus:text-background"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {status.icon && (
                    <status.icon className={`w-5 h-5 ${status.color || ""}`} />
                  )}
                  <span>{status.label}</span>
                </div>

                {count && (
                  <span className="ml-3 text-xs bg-accent px-1.5 py-0.5 rounded-full text-foreground">
                    {count}
                  </span>
                )}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default MobileOrderStatusDropdown;
