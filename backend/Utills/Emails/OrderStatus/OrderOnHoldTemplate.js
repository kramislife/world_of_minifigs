import { OrderBaseTemplate } from "../OrderBaseStatus.js";

export const OrderOnHoldTemplate = (
  customerName,
  orderId,
  orderStatus,
  orderDetails
) => {
  const customMessage = `Your order <strong>#${orderId}</strong> has been placed on hold. Our team will contact you shortly with more information. We appreciate your patience.`;

  return OrderBaseTemplate(
    customerName,
    orderId,
    orderStatus,
    orderDetails,
    customMessage,
    "Your Order is On Hold"
  );
};
