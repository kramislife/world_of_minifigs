import { OrderBaseTemplate } from "../OrderBaseStatus.js";

export const OrderShippedTemplate = (
  customerName,
  orderId,
  orderStatus,
  orderDetails
) => {
  const customMessage = `
    <p>Great news! Your order <strong>#${orderId}</strong> has been shipped and is on its way to you.</p>
    `;

  return OrderBaseTemplate(
    customerName,
    orderId,
    orderStatus,
    orderDetails,
    customMessage,
    "Your Order is On Its Way!"
  );
};
