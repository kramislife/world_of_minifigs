import { OrderBaseTemplate } from "../OrderBaseStatus.js";

export const OrderShippedTemplate = (
  customerName,
  orderId,
  orderStatus,
  orderDetails
) => {
  const trackingInfo = orderDetails.shippingInfo?.trackingNumber
    ? `Your tracking number is: <strong>${orderDetails.shippingInfo.trackingNumber}</strong>`
    : "";

  const customMessage = `Great news! Your order <strong>#${orderId}</strong> has been shipped and is on its way to you. ${trackingInfo}`;

  return OrderBaseTemplate(
    customerName,
    orderId,
    orderStatus,
    orderDetails,
    customMessage,
    "Your Order is On Its Way!"
  );
};
