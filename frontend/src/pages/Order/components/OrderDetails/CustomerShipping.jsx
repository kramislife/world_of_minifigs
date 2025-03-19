import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Truck, StickyNote, CheckCheck } from "lucide-react";

const CustomerShipping = ({ shippingAddress, orderNotes }) => {
  return (
    <Card className="bg-brand/80 border-gray-600/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Truck className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold text-white">Shipping Details</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        {orderNotes && (
          <div className="mt-5 border-t border-white/10 pt-5">
            <div>
              <div className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-yellow-500" />
                <p className="text-sm text-gray-400">Order Notes</p>
              </div>
              <div className="flex gap-2 mt-2">
                <CheckCheck className="w-4 h-4 text-green-500" />
                <p className="text-sm text-white">{orderNotes}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerShipping;
