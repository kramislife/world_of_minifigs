import React from "react";
import {
  X,
  Package,
  Truck,
  CreditCard,
  CalendarClock,
  MapPin,
  ShoppingBag,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const OrderDetailsDialog = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  const renderAddress = (address, title) => (
    <div className="p-4 bg-gray-900/40 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
      <h4 className="font-medium text-white flex items-center gap-2 mb-3">
        <MapPin className="h-4 w-4 text-primary" />
        {title}
      </h4>
      <div className="text-sm text-gray-300 space-y-1">
        <p>{address?.street}</p>
        <p>
          {address?.city}, {address?.state} {address?.postalCode}
        </p>
        <p>{address?.country}</p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[60vw] p-0 bg-brand-gradient border-none">
        <DialogHeader className="p-6 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="flex gap-2 items-center text-white font-semibold text-xl leading-none tracking-tight">
                <Package className="h-6 w-6 text-primary" />
                Order Details
              </DialogTitle>
              <p className="text-gray-400 text-sm mt-2">
                Order ID: <span className="font-mono">{order._id}</span>
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 max-h-[80vh] overflow-y-auto scrollbar-none">
          <div className="space-y-6">
            {/* Status Section - Enhanced with better spacing and visual hierarchy */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-900/40 rounded-lg border border-gray-800 space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Order Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-sm font-medium
                    ${
                      order.orderStatus === "Pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : ""
                    }
                    ${
                      order.orderStatus === "Processing"
                        ? "bg-blue-500/20 text-blue-300"
                        : ""
                    }
                    ${
                      order.orderStatus === "Shipped"
                        ? "bg-indigo-500/20 text-indigo-300"
                        : ""
                    }
                    ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-500/20 text-green-300"
                        : ""
                    }
                    ${
                      order.orderStatus === "Cancelled"
                        ? "bg-red-500/20 text-red-300"
                        : ""
                    }
                  `}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Payment Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-sm font-medium
                    ${
                      order.paymentInfo?.status === "Success"
                        ? "bg-green-500/20 text-green-300"
                        : ""
                    }
                    ${
                      order.paymentInfo?.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : ""
                    }
                    ${
                      order.paymentInfo?.status === "Failed"
                        ? "bg-red-500/20 text-red-300"
                        : ""
                    }
                  `}
                  >
                    {order.paymentInfo?.status || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CalendarClock className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Priority:</span>
                  <span className="text-gray-300">{order.priority}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Payment Method:</span>
                  <span className="text-gray-200">
                    {order.paymentInfo?.method}
                  </span>
                </div>
                {order.paymentInfo?.transactionId && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="font-semibold">Transaction ID:</span>
                    <span className="font-mono text-sm">
                      {order.paymentInfo.transactionId}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-900/40 rounded-lg border border-gray-800">
                <h3 className="font-semibold text-white mb-2">Order Summary</h3>
                <p className="text-gray-400">
                  Items Price:{" "}
                  <span className="text-white">
                    ${order.itemsPrice?.toFixed(2)}
                  </span>
                </p>
                <p className="text-gray-400">
                  Tax:{" "}
                  <span className="text-white">
                    ${order.taxPrice?.toFixed(2)}
                  </span>
                </p>
                <p className="text-gray-400">
                  Shipping:{" "}
                  <span className="text-white">
                    ${order.shippingPrice?.toFixed(2)}
                  </span>
                </p>
                <p className="text-gray-400">
                  Discount:{" "}
                  <span className="text-white">
                    -${order.discountPrice?.toFixed(2)}
                  </span>
                </p>
                <p className="text-lg font-semibold text-primary">
                  Total: ${order.totalPrice?.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Order Items - Enhanced with better visual hierarchy */}
            <div className="p-4 bg-gray-900/40 rounded-lg border border-gray-800">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                Order Items ({order.orderItems?.length})
              </h3>
              <div className="divide-y divide-gray-700/50">
                {order.orderItems?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-4 group hover:bg-gray-800/20 rounded-lg transition-colors"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">
                        {item.name}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-400">
                          Qty: {item.quantity} × ${item.price}
                        </span>
                        <span className="text-primary font-medium">
                          ${(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {item.isPreOrder && (
                          <Badge variant="warning" className="text-xs">
                            Pre-order
                          </Badge>
                        )}
                        <Badge
                          variant={
                            item.status === "Delivered"
                              ? "success"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderAddress(order.shippingAddress, "Shipping Address")}
            </div>

            {/* Shipping Details */}
            {order.shippingInfo && (
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  Shipping Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p className="text-gray-300">
                    Courier:{" "}
                    <span className="text-white">
                      {order.shippingInfo.courier}
                    </span>
                  </p>
                  <p className="text-gray-300">
                    Tracking:{" "}
                    <span className="text-white">
                      {order.shippingInfo.trackingNumber}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Additional Information */}
            {(order.orderNotes || order.cancellationReason) && (
              <div className="p-4 bg-gray-900/50 rounded-lg space-y-4">
                {order.orderNotes && (
                  <div>
                    <h3 className="font-semibold text-white mb-2">
                      Order Notes
                    </h3>
                    <p className="text-gray-300 text-sm">{order.orderNotes}</p>
                  </div>
                )}
                {order.cancellationReason && (
                  <div className="flex items-start gap-2 text-red-400">
                    <AlertTriangle className="h-4 w-4 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">
                        Cancellation Reason
                      </h3>
                      <p className="text-sm">{order.cancellationReason}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                onClick={onClose}
                className="text-gray-300 hover:text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
