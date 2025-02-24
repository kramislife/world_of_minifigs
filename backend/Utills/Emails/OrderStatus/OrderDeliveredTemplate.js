import { OrderBaseTemplate } from "../OrderBaseStatus.js";

export const OrderDeliveredTemplate = (
  customerName,
  orderId,
  orderStatus,
  orderDetails
) => {
  const customMessage = `Your order <strong>#${orderId}</strong> has been delivered! We hope you're enjoying your purchase. If you have any questions or concerns, please don't hesitate to contact us.`;

  return OrderBaseTemplate(
    customerName,
    orderId,
    orderStatus,
    orderDetails,
    customMessage,
    "Your Order Has Been Delivered!"
  );
};
