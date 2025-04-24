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
import { Loader2 } from "lucide-react";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Order</DialogTitle>
          <DialogDescription className="text-gray-300">
            Please select reason(s) for cancelling your order.
          </DialogDescription>
        </DialogHeader>
        {commonReasons.map((reason) => (
          <div key={reason} className="mb-3">
            <div className="flex items-center space-x-3 space-y-0">
              <Checkbox
                id={reason}
                checked={selectedReasons.includes(reason)}
                onCheckedChange={() => handleReasonChange(reason)}
                className="border-background"
              />
              <Label htmlFor={reason} className="text-background">
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

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleCancelOrder(orderId, onOpenChange)}
            disabled={isCancelButtonDisabled}
            className="flex items-center justify-center gap-2"
          >
            {isProcessingRefund ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderDialog;
