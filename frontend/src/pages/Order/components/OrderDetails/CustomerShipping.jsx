import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Truck,
  StickyNote,
  CheckCheck,
  Package,
  Calendar,
  Info,
} from "lucide-react";
import { format } from "date-fns";

const CustomerShipping = ({
  shippingAddress,
  orderNotes,
  shippingInfo,
  orderStatus,
}) => {
  return (
    <Card className="bg-brand-dark/20 border border-brand-end/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Truck className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold text-white">Shipping Details</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-400">Contact Number</p>
              <p className="font-medium mt-1 text-white">
                {shippingAddress.contact_number || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Address</p>
              <p className="font-medium mt-1 text-white">
                {shippingAddress.address_line1}
                {shippingAddress.address_line2 && (
                  <>, {shippingAddress.address_line2}</>
                )}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">City & State</p>
              <p className="font-medium mt-1 text-white">
                {shippingAddress.city}, {shippingAddress.state}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Country</p>
              <p className="font-medium mt-1 text-white">
                {shippingAddress.country}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Postal Code</p>
              <p className="font-medium text-white mt-1">
                {shippingAddress.postal_code}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Tracking Information - only shown when available */}
        {shippingInfo &&
          (orderStatus === "Shipped" || orderStatus === "Delivered") && (
            <div className="mt-5 border-t border-brand-end/50 pt-5">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-semibold text-white">
                  Tracking Information
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                <div>
                  <p className="text-sm text-gray-400">Courier Service</p>
                  <p className="font-medium mt-1 text-white">
                    {shippingInfo.courier}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Tracking Number</p>
                  <p className="font-medium mt-1 text-white">
                    {shippingInfo.trackingNumber}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-400">Track Package</p>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={shippingInfo.trackingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
                    >
                      {shippingInfo.trackingLink}
                    </a>
                  </div>
                </div>

                {shippingInfo.shippedAt && (
                  <div>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Shipped On
                    </p>
                    <p className="font-medium mt-1 text-white">
                      {format(new Date(shippingInfo.shippedAt), "PPP")}
                    </p>
                  </div>
                )}

                {shippingInfo.additionalInfo && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <Info className="w-3 h-3" /> Additional Information
                    </p>
                    <p className="font-medium mt-1 text-white">
                      {shippingInfo.additionalInfo}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {orderNotes && (
          <div className="mt-5 border-t border-brand-end/50 pt-5">
            <div>
              <div className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-accent" />
                <p className="text-sm text-gray-400">Order Notes</p>
              </div>
              <div className="flex gap-2 mt-2">
                <CheckCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white leading-6">{orderNotes}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerShipping;
