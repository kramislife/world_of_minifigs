import React from "react";
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
  selectedReasons,
  otherReason,
  isProcessingRefund,
  handleReasonChange,
  handleCancelOrder,
  setOtherReason,
  isOtherSelected,
  isCancelButtonDisabled,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-brand-dark border-none">
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
                  className="border-brand-end/50 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                />
                <Label
                  htmlFor={reason}
                  className="text-gray-200 font-normal cursor-pointer"
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
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <DialogFooter className="md:gap-0 gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleCancelOrder(orderId, onOpenChange)}
            disabled={isCancelButtonDisabled}
          >
            {isProcessingRefund ? "Cancelling..." : "Confirm Cancellation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderDialog;
