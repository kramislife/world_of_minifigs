import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ShoppingCart } from "lucide-react";

export const MobileOrderStatusDropdown = ({
  statusParam,
  selectedLabel,
  totalOrders,
  ordersByStatus,
  onTabChange,
  allStatuses,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center gap-2">
          {statusParam && statusParam !== "all" ? (
            (() => {
              const statusObj = allStatuses.find(
                (s) => s.value === statusParam
              );
              const StatusIcon = statusObj?.icon;
              return StatusIcon ? (
                <StatusIcon className="w-5 h-5" />
              ) : (
                <ShoppingCart className="w-5 h-5" />
              );
            })()
          ) : (
            <ShoppingCart className="w-5 h-5" />
          )}
          <span>{selectedLabel}</span>
          {statusParam === "all" && (
            <span className="ml-1 text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
              {totalOrders}
            </span>
          )}
        </div>
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[90vw] max-w-[300px]">
        {allStatuses.map((status) => (
          <DropdownMenuItem
            key={status.id || status.value}
            onClick={() => onTabChange(status.value)}
            disabled={status.value !== "all" && !ordersByStatus[status.value]}
            className="flex items-center gap-2 cursor-pointer py-3 px-4"
          >
            {status.icon && (
              <status.icon className={`w-5 h-5 ${status.color || ""}`} />
            )}
            {status.label}
            {status.value === "all" ? (
              <span className="ml-auto text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
                {totalOrders}
              </span>
            ) : status.value === "To Review" ? (
              ordersByStatus["To Review"]?.pending.length > 0 && (
                <span className="ml-auto text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
                  {ordersByStatus["To Review"].pending.length}
                </span>
              )
            ) : (
              ordersByStatus[status.value] && (
                <span className="ml-auto text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
                  {ordersByStatus[status.value].length}
                </span>
              )
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
