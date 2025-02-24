import { OrderBaseTemplate } from "../OrderBaseStatus.js";

export const OrderPreOrderTemplate = (
  customerName,
  orderId,
  orderStatus,
  orderDetails
) => {
  const availabilityDate = orderDetails.orderItems[0]?.availabilityDate
    ? `Expected availability date: ${new Date(
        orderDetails.orderItems[0].availabilityDate
      ).toLocaleDateString()}`
    : "We will notify you when your items become available";

  const customMessage = `Thank you for pre-ordering! Your order <strong>#${orderId}</strong> has been confirmed. ${availabilityDate}`;

  return OrderBaseTemplate(
    customerName,
    orderId,
    orderStatus,
    orderDetails,
    customMessage,
    "Pre-Order Confirmation"
  );
};
