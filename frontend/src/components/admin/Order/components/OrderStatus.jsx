import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderStatus, isValidStatusTransition } from "@/constant/orderStatus";
import { ClockArrowDown } from "lucide-react";
import { format } from "date-fns";

const OrderStatus = ({
  selectedStatus,
  setSelectedStatus,
  order,
  user,
  handleStatusUpdate,
  isLoading,
}) => {
  return (
    <div className="bg-brand/80 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <ClockArrowDown className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Order Status</h3>
      </div>
      <div className="space-y-4 text-white">
        <Select
          value={selectedStatus || order.orderStatus}
          onValueChange={setSelectedStatus}
          disabled={
            order.orderStatus === "Delivered" ||
            order.orderStatus === "Cancelled" ||
            !["admin", "super_admin"].includes(user?.role)
          }
        >
          <SelectTrigger className="w-full bg-brand border border-gray-700">
            <SelectValue>
              {orderStatus.find(
                (status) =>
                  status.value === (selectedStatus || order.orderStatus)
              )?.label || order.orderStatus}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-brand border border-gray-700">
            {orderStatus
              .filter(
                (status) =>
                  isValidStatusTransition(order.orderStatus, status.value) &&
                  !(
                    status.value === "Cancelled" &&
                    ["admin", "super_admin"].includes(user?.role)
                  )
              )
              .map((status) => (
                <SelectItem
                  key={status.id}
                  value={status.value}
                  className="text-white bg-brand cursor-pointer py-3 px-5"
                >
                  <div className="flex items-center gap-2">
                    <status.icon className={`w-4 h-4 ${status.color}`} />
                    {status.label}
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {order.orderStatus === "Cancelled" && (
          <div className="mb-4 p-1">
            <div className="text-red-400 font-medium text-sm mb-2">
              Cancelled on{" "}
              {order.cancelledAt
                ? format(new Date(order.cancelledAt), "PPP")
                : "N/A"}
            </div>
            {order.cancellationReason && (
              <div className="text-gray-400 text-sm">
                Reason: {order.cancellationReason}
              </div>
            )}
          </div>
        )}
        <Button
          onClick={handleStatusUpdate}
          disabled={
            !selectedStatus ||
            selectedStatus === order.orderStatus ||
            isLoading ||
            !["admin", "super_admin"].includes(user?.role)
          }
          className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          {isLoading ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  );
};

export default OrderStatus;
