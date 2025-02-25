import { OrderBaseTemplate } from "../OrderBaseStatus.js";

export const OrderProcessingTemplate = (
  customerName,
  orderId,
  orderStatus,
  orderDetails
) => {
  const customMessage = `Your order <strong>#${orderId}</strong> is now being processed. Our team is carefully preparing your items for shipment. We'll notify you once your order is ready to ship.`;

  return OrderBaseTemplate(
    customerName,
    orderId,
    orderStatus,
    orderDetails,
    customMessage,
    "Your Order is Being Processed"
  );
};
