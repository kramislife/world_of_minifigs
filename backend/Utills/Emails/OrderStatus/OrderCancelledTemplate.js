import { OrderBaseTemplate } from "../OrderBaseStatus.js";

export const OrderCancelledTemplate = (
  customerName,
  orderId,
  orderStatus,
  orderDetails
) => {
  const reason = orderDetails.cancellationReason
    ? `Reason: ${orderDetails.cancellationReason}`
    : "";

  const customMessage = `Your order <strong>#${orderId}</strong> has been cancelled. ${reason} If you have any questions, please contact our customer support team.`;

  return OrderBaseTemplate(
    customerName,
    orderId,
    orderStatus,
    orderDetails,
    customMessage,
    "Order Cancellation Notice"
  );
};
