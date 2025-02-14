import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useProcessRefundMutation } from "@/redux/api/checkoutApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const commonReasons = [
  "Changed my mind about the purchase",
  "Found a better price elsewhere",
  "Ordered by mistake",
  "Shipping time is too long",
  "Payment issues",
  "Ordered wrong item/size",
  "Other",
];

const CancelOrderDialog = ({
  open,
  onOpenChange,
  orderId,
  isLoading: isLoadingProp,
}) => {
  const navigate = useNavigate();
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [otherReason, setOtherReason] = useState("");
  const [processRefund, { isLoading: isProcessingRefund }] =
    useProcessRefundMutation();

  const isLoading = isLoadingProp || isProcessingRefund;

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

  const handleConfirm = async () => {
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

  const isOtherSelected = selectedReasons.includes("Other");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Cancel Order</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please select reason(s) for cancelling your order.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {commonReasons.map((reason) => (
            <div key={reason}>
              <div className="flex items-center space-x-3 space-y-0">
                <Checkbox
                  id={reason}
                  checked={selectedReasons.includes(reason)}
                  onCheckedChange={() => handleReasonChange(reason)}
                  className="border-gray-600 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                />
                <Label
                  htmlFor={reason}
                  className="text-gray-300 font-normal cursor-pointer"
                >
                  {reason}
                </Label>
              </div>
              {reason === "Other" && isOtherSelected && (
                <div className="mt-2 ml-7">
                  <Input
                    placeholder="Please specify your reason"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={
              selectedReasons.length === 0 ||
              (isOtherSelected && !otherReason.trim()) ||
              isLoading
            }
            className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
          >
            {isLoading ? "Cancelling..." : "Confirm Cancellation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderDialog;
