import {
  Truck,
  StickyNote,
  CheckCheck,
  Package,
  Calendar,
  Info,
} from "lucide-react";
import { format } from "date-fns";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const ShippingDetails = ({
  shippingAddress,
  orderNotes,
  shippingInfo,
  orderStatus,
}) => {
  const addressDetails = [
    {
      section: [
        {
          label: "Contact Number",
          value: shippingAddress?.contact_number || "N/A",
        },
        {
          label: "Address",
          value: `${shippingAddress?.address_line1}${
            shippingAddress?.address_line2
              ? `, ${shippingAddress.address_line2}`
              : ""
          }`,
        },
      ],
    },
    {
      section: [
        {
          label: "City & State",
          value: `${shippingAddress?.city}, ${shippingAddress?.state}`,
        },
        {
          label: "Country",
          value: shippingAddress?.country,
        },
      ],
    },
    {
      section: [
        {
          label: "Postal Code",
          value: shippingAddress?.postal_code,
        },
      ],
    },
  ];

  const trackingDetails = [
    {
      label: "Courier Service",
      value: shippingInfo?.courier,
      colSpan: 1,
    },
    {
      label: "Tracking Number",
      value: shippingInfo?.trackingNumber,
      colSpan: 1,
    },
    {
      label: "Track Package",
      value: shippingInfo?.trackingLink,
      colSpan: 2,
      isLink: true,
    },
    {
      label: "Shipped On",
      value: shippingInfo?.shippedAt
        ? format(new Date(shippingInfo.shippedAt), "PPP")
        : null,
      colSpan: 1,
      icon: <Calendar className="w-3 h-3" />,
    },
    {
      label: "Additional Information",
      value: shippingInfo?.additionalInfo,
      colSpan: 2,
      icon: <Info className="w-3 h-3" />,
    },
  ];

  const renderDetail = ({ label, value }) => (
    <div key={label}>
      <p className="text-sm text-gray-300">{label}</p>
      <p className="font-medium mt-1 text-background">{value}</p>
    </div>
  );

  const renderTrackingDetail = ({ label, value, colSpan, isLink, icon }) => {
    if (!value) return null;

    return (
      <div key={label} className={`${colSpan === 2 ? "md:col-span-2" : ""}`}>
        <p className="text-sm text-gray-300 flex items-center gap-1">
          {icon}
          {label}
        </p>
        <div className="font-medium mt-1 text-background">
          {isLink ? (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
            >
              {value}
            </a>
          ) : (
            value
          )}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Truck className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold text-background">
            Shipping Details
          </h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {addressDetails.map((group, index) => (
            <div key={index} className="space-y-5">
              {group.section.map(renderDetail)}
            </div>
          ))}
        </div>

        {/* Shipping Tracking Information */}
        {shippingInfo &&
          (orderStatus === "Shipped" || orderStatus === "Delivered") && (
            <div className="mt-5 border-t border-brand-end/50 pt-5">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-semibold text-background">
                  Tracking Information
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                {trackingDetails.map(renderTrackingDetail)}
              </div>
            </div>
          )}

        {/* Order Notes */}
        {orderNotes && (
          <div className="mt-5 border-t border-brand-end/50 pt-5">
            <div>
              <div className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-accent" />
                <p className="text-sm text-gray-300">Order Notes</p>
              </div>
              <div className="flex gap-2 mt-2">
                <CheckCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-background leading-6">
                  {orderNotes}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingDetails;
