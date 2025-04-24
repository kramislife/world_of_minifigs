import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileOrderStatusDropdown from "./MobileOrderStatusDropdown";

const OrderStatusTabs = ({
  totalOrders,
  ordersByStatus,
  statusParam,
  onTabChange,
  isMobile,
  selectedLabel,
  mainStatus,
  dropdownStatus,
  allStatuses,
  handleTabChange,
}) => {
  if (isMobile) {
    return (
      <MobileOrderStatusDropdown
        statusParam={statusParam}
        selectedLabel={selectedLabel}
        totalOrders={totalOrders}
        ordersByStatus={ordersByStatus}
        onTabChange={handleTabChange || onTabChange}
        allStatuses={allStatuses}
      />
    );
  }

  return (
    <TabsList className="grid grid-cols-7 gap-2">
      {/* All Orders */}
      <TabsTrigger
        value="all"
        onClick={() => (handleTabChange || onTabChange)("all")}
      >
        All Orders
        <span className="ml-1 text-xs bg-accent text-foreground px-1.5 py-0.5 rounded-full">
          {totalOrders}
        </span>
      </TabsTrigger>

      {/* Display main statuses */}
      {mainStatus.map((status) => {
        const hasOrders =
          status.value === "To Review"
            ? true
            : ordersByStatus[status.value]?.length > 0;

        return (
          <TabsTrigger
            key={status.id}
            value={status.value}
            disabled={status.value !== "To Review" && !hasOrders}
            onClick={() => (handleTabChange || onTabChange)(status.value)}
          >
            {status.icon && (
              <status.icon className={`w-4 h-4 ${status.color}`} />
            )}
            <span>{status.label}</span>

            {status.value !== "To Review" &&
              ordersByStatus[status.value]?.length > 0 && (
                <span className="ml-1 text-xs bg-accent px-1.5 py-0.5 rounded-full text-foreground">
                  {ordersByStatus[status.value].length}
                </span>
              )}
          </TabsTrigger>
        );
      })}

      {/* Display dropdown statuses - Cancelled and On Hold */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TabsTrigger value={statusParam}>
            <span className="hidden md:inline">More</span>
            <div className="flex items-center mt-1 ml-1">
              <MoreHorizontal className="w-4 h-4" />
            </div>
          </TabsTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] mt-1 ml-2">
          {dropdownStatus.map((status) => (
            <DropdownMenuItem
              key={status.id}
              onClick={() => onTabChange(status.value)}
              disabled={
                !ordersByStatus[status.value] ||
                ordersByStatus[status.value]?.length === 0
              }
            >
              {status.icon && (
                <status.icon className={`w-4 h-4 ${status.color}`} />
              )}
              {status.label}
              {ordersByStatus[status.value]?.length > 0 && (
                <span className="ml-auto text-xs bg-accent px-1.5 py-0.5 rounded-full text-foreground">
                  {ordersByStatus[status.value].length}
                </span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TabsList>
  );
};

export default OrderStatusTabs;
