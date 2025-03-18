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
            onClick={() => handleCancelOrder(orderId, onOpenChange)}
            disabled={isCancelButtonDisabled}
            className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
          >
            {isProcessingRefund ? "Cancelling..." : "Confirm Cancellation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderDialog;
