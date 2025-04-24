import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderStatus, isValidStatusTransition } from "@/constant/orderStatus";
import { ClockArrowDown, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const OrderStatus = ({
  selectedStatus,
  setSelectedStatus,
  order,
  user,
  handleStatusUpdate,
  isLoading,
  shippingInfo,
  handleShippingInfoChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <ClockArrowDown className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-background">Order Status</h3>
        </div>
      </CardHeader>

      <CardContent>
        <Select
          value={selectedStatus || order.orderStatus}
          onValueChange={setSelectedStatus}
          disabled={
            isLoading ||
            order.orderStatus === "Delivered" ||
            order.orderStatus === "Cancelled" ||
            !["admin", "super_admin"].includes(user?.role)
          }
        >
          <SelectTrigger className="bg-background">
            <SelectValue>
              {orderStatus.find(
                (status) =>
                  status.value === (selectedStatus || order.orderStatus)
              )?.label || order.orderStatus}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-background">
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
                  className="text-foreground cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <status.icon className={`w-4 h-4 ${status.color}`} />
                    {status.label}
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {selectedStatus === "Shipped" &&
          selectedStatus !== order.orderStatus && (
            <div className="space-y-5 pt-5">
              <h4 className="text-lg font-semibold text-background">
                Shipping Information
              </h4>

              <div className="space-y-3">
                <Label htmlFor="courier" className="text-background">
                  Courier Service
                </Label>
                <Input
                  id="courier"
                  placeholder="Enter courier service name"
                  value={shippingInfo.courier}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="trackingNumber" className="text-background">
                  Tracking Number
                </Label>
                <Input
                  id="trackingNumber"
                  placeholder="Enter tracking number"
                  value={shippingInfo.trackingNumber}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="trackingLink" className="text-background">
                  Tracking Link
                </Label>
                <Input
                  id="trackingLink"
                  placeholder="Enter tracking link"
                  value={shippingInfo.trackingLink}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="additionalInfo" className="text-background">
                  Additional Information (Optional)
                </Label>
                <Input
                  id="additionalInfo"
                  placeholder="Enter any additional shipping information"
                  value={shippingInfo.additionalInfo}
                  onChange={handleShippingInfoChange}
                />
              </div>
            </div>
          )}

        {order.orderStatus === "Cancelled" && (
          <div className="pt-5 space-y-3">
            <div className="text-red-400 font-medium">
              Cancelled on{" "}
              {order.cancelledAt
                ? format(new Date(order.cancelledAt), "PPP")
                : "N/A"}
            </div>
            {order.cancellationReason && (
              <div className="text-sm text-gray-300">
                Reason: {order.cancellationReason}
              </div>
            )}
          </div>
        )}

        <div className="pt-3">
          <Button
            variant="submit"
            className="w-full"
            onClick={handleStatusUpdate}
            disabled={
              !selectedStatus ||
              selectedStatus === order.orderStatus ||
              isLoading ||
              !["admin", "super_admin"].includes(user?.role) ||
              (selectedStatus === "Shipped" &&
                (!shippingInfo.courier ||
                  !shippingInfo.trackingNumber ||
                  !shippingInfo.trackingLink))
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Updating Status...
              </>
            ) : (
              "Update Status"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatus;
