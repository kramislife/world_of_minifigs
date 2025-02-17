import { Truck, StickyNote, CheckCheck } from "lucide-react";

const ShippingDetails = ({ shippingAddress, orderNotes }) => {
  return (
    <div className="bg-brand/80 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Truck className="w-5 h-5 text-green-500" />
        <h3 className="text-lg font-semibold text-white">Shipping Details</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-5">
          <div>
            <p className="text-sm text-gray-400">Contact Number</p>
            <p className="font-medium mt-1 text-white">
              {shippingAddress?.contact_number || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Address</p>
            <p className="font-medium mt-1 text-white">
              {shippingAddress?.address_line1}
              {shippingAddress?.address_line2 && (
                <>, {shippingAddress.address_line2}</>
              )}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">City & State</p>
            <p className="font-medium mt-1 text-white">
              {shippingAddress?.city}, {shippingAddress?.state}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Country</p>
            <p className="font-medium mt-1 text-white">
              {shippingAddress?.country}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Postal Code</p>
            <p className="font-medium text-white mt-1">
              {shippingAddress?.postal_code}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 border-t border-white/10 pt-5">
        {orderNotes && (
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
        )}
      </div>
    </div>
  );
};

export default ShippingDetails;