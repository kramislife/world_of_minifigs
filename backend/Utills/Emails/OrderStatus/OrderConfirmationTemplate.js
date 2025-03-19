import { OrderBaseTemplate } from "../OrderBaseStatus.js";

export const OrderConfirmationTemplate = (
  customerName,
  orderId,
  orderStatus,
  orderDetails
) => {
  const orderDate = new Date().toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  let customMessage;
  let headerMessage;

  if (orderDetails.isAdminNotification) {
    customMessage = `A new order <strong>#${orderId}</strong> has been placed on ${orderDate}. Customer <strong>${
      orderDetails.user?.username || "Guest User"
    }</strong> has paid via <strong>${
      orderDetails.paymentInfo.method
    }</strong>. Please review the order details below and process it accordingly.`;
    headerMessage = "New Order Notification!";
  } else {
    customMessage = `We received your order <strong>#${orderId}</strong> on ${orderDate} and you've paid for this via <strong>${orderDetails.paymentInfo.method}</strong>. We're getting your order ready and will let you know once it's on the way. We wish you enjoy shopping with us and hope to see you again real soon!`;
    headerMessage = "Thanks for shopping with us!";
  }

  return OrderBaseTemplate(
    customerName,
    orderId,
    orderStatus,
    orderDetails,
    customMessage,
    headerMessage
  );
};
