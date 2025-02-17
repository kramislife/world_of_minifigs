import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderStatus, isValidStatusTransition } from "@/constant/orderStatus";

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
      <h3 className="text-xl font-bold text-white mb-6">Order Status</h3>
      <div className="space-y-4 text-white">
        <Select
          value={selectedStatus}
          onValueChange={setSelectedStatus}
          disabled={
            order.orderStatus === "Delivered" ||
            order.orderStatus === "Cancelled" ||
            !["admin", "super_admin"].includes(user?.role)
          }
        >
          <SelectTrigger className="w-full bg-brand border border-gray-700">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-brand border border-gray-700">
            {orderStatus.map((status) => (
              <SelectItem
                key={status.id}
                value={status.value}
                className="text-white bg-brand cursor-pointer py-3"
                disabled={!isValidStatusTransition(selectedStatus, status.value)}
              >
                <div className="flex items-center gap-2">
                  <status.icon className={`w-4 h-4 ${status.color}`} />
                  {status.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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