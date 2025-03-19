import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ShoppingCart } from "lucide-react";
import { orderStatus } from "@/constant/orderStatus";
import { useState, useEffect } from "react";
import { MobileOrderStatusDropdown } from "./MobileOrderStatusDropdown";

export const OrderStatusTabs = ({
  totalOrders,
  ordersByStatus,
  statusParam,
  onTabChange,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedLabel, setSelectedLabel] = useState("All Orders");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Set selected label based on statusParam
    if (statusParam === "all" || !statusParam) {
      setSelectedLabel("All Orders");
    } else {
      const status = orderStatus.find((s) => s.value === statusParam);
      if (status) setSelectedLabel(status.label);
    }
  }, [statusParam]);

  const mainStatus = orderStatus.filter(
    (status) => !["Cancelled", "On Hold"].includes(status.value)
  );
  const dropdownStatus = orderStatus.filter((status) =>
    ["Cancelled", "On Hold"].includes(status.value)
  );

  const allStatuses = [
    { id: "all", value: "all", label: "All Orders", icon: ShoppingCart },
    ...orderStatus,
  ];

  // 
  if (isMobile) {
    return (
      <MobileOrderStatusDropdown
        statusParam={statusParam}
        selectedLabel={selectedLabel}
        totalOrders={totalOrders}
        ordersByStatus={ordersByStatus}
        onTabChange={onTabChange}
        allStatuses={allStatuses}
      />
    );
  }

  return (
    <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 lg:grid-cols-7 gap-2 bg-gray-900/50 p-1 rounded-lg">
      <TabsTrigger
        value="all"
        className="transition-all duration-200 hover:bg-gray-700/50"
      >
        All Orders
        <span className="ml-1 text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
          {totalOrders}
        </span>
      </TabsTrigger>

      {/* Display main statuses */}
      {mainStatus.map((status) => (
        <TabsTrigger
          key={status.id}
          value={status.value}
          disabled={!ordersByStatus[status.value]}
          className="flex items-center gap-2 transition-all duration-200 hover:bg-gray-700/50"
        >
          {status.icon && <status.icon className={`w-4 h-4 ${status.color}`} />}
          <span className="hidden md:inline">{status.label}</span>
          <span className="md:hidden">{status.label.slice(0, 3)}</span>
          {status.value === "To Review"
            ? ordersByStatus["To Review"]?.pending.length > 0 && (
                <span className="ml-1 text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
                  {ordersByStatus["To Review"].pending.length}
                </span>
              )
            : ordersByStatus[status.value] && (
                <span className="ml-1 text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
                  {ordersByStatus[status.value].length}
                </span>
              )}
        </TabsTrigger>
      ))}

      {/* Display dropdown statuses - Cancelled and On Hold */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TabsTrigger
            value={statusParam}
            className="transition-all duration-200 hover:bg-gray-700/50"
          >
            <span className="hidden md:inline">More</span>
            <div className="flex items-center mt-1 ml-1">
              <MoreHorizontal className="w-4 h-4" />
            </div>
          </TabsTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          {dropdownStatus.map((status) => (
            <DropdownMenuItem
              key={status.id}
              onClick={() => onTabChange(status.value)}
              disabled={!ordersByStatus[status.value]}
              className="flex items-center gap-2 cursor-pointer"
            >
              {status.icon && (
                <status.icon className={`w-4 h-4 ${status.color}`} />
              )}
              {status.label}
              {ordersByStatus[status.value] && (
                <span className="ml-auto text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
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
