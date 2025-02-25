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

  const customMessage = `We received your order <strong>#${orderId}</strong> on ${orderDate} and you've paid for this via <strong>${orderDetails.paymentInfo.method}</strong>. We're getting your order ready and will let you know once it's on the way. We wish you enjoy shopping with us and hope to see you again real soon!`;

  return OrderBaseTemplate(
    customerName,
    orderId,
    orderStatus,
    orderDetails,
    customMessage,
    "Thanks for shopping with us!"
  );
};
