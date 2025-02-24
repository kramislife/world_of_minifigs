export const OrderStatusUpdateTemplate = (
  customerName,
  orderId,
  newStatus,
  orderDetails
) => {
  // Format status message based on the new status
  const getStatusMessage = (status) => {
    switch (status) {
      case "Processing":
        return "We're now processing your order and will begin preparing your items.";
      case "Shipped":
        return "Your order has been shipped and is on its way to you!";
      case "Delivered":
        return "Your order has been successfully delivered.";
      case "Cancelled":
        return "Your order has been cancelled as requested.";
      case "On Hold":
        return "Your order has been placed on hold. We'll contact you shortly with more information.";
      default:
        return "There has been an update to your order.";
    }
  };

  const supportEmail = process.env.SMTP_FROM_EMAIL || "support@example.com";

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Status Update</title>
    <style>
      /* Reset styles for email clients */
      body, table, td, div, p {
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #1a1a1a;
        color: #ffffff;
      }
      
      .header {
        text-align: center;
        padding: 20px 0;
        background: linear-gradient(to right, #4f46e5, #7c3aed);
        border-radius: 8px;
        margin-bottom: 20px;
      }
      
      .status-badge {
        display: inline-block;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: bold;
        margin: 10px 0;
        background-color: ${
          newStatus === "Processing"
            ? "#1d4ed8"
            : newStatus === "Shipped"
            ? "#047857"
            : newStatus === "Delivered"
            ? "#059669"
            : newStatus === "Cancelled"
            ? "#dc2626"
            : "#4b5563"
        };
        color: white;
      }
      
      .card {
        background-color: #262626;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        border: 1px solid #404040;
      }
      
      .order-info {
        margin: 20px 0;
      }
      
      .footer {
        text-align: center;
        color: #9ca3af;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #404040;
      }
      
      .button {
        display: inline-block;
        padding: 12px 24px;
        background: linear-gradient(to right, #4f46e5, #7c3aed);
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin: 20px 0;
      }
      
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
          padding: 10px !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0a0a0a;">
    <div class="container">
      <div class="header">
        <h1 style="margin: 0; color: white; font-size: 24px;">Order Status Update</h1>
      </div>

      <div class="card">
        <h2 style="margin-top: 0; color: #e5e7eb;">Hello, ${customerName}!</h2>
        <p style="color: #e5e7eb;">
          Your order <span style="color: #93c5fd; font-weight: bold;">#${orderId}</span> 
          has been updated to:
        </p>
        
        <div class="status-badge">
          ${newStatus}
        </div>

        <p style="color: #e5e7eb;">${getStatusMessage(newStatus)}</p>

        <div class="order-info">
          <h3 style="color: #e5e7eb;">Order Details:</h3>
          <p style="color: #d1d5db; margin: 5px 0;">
            Order Date: ${new Date(orderDetails.createdAt).toLocaleDateString()}
          </p>
          <p style="color: #d1d5db; margin: 5px 0;">
            Total Amount: $${orderDetails.totalPrice.toFixed(2)}
          </p>
          ${
            newStatus === "Shipped" && orderDetails.shippingInfo?.trackingNumber
              ? `
            <p style="color: #d1d5db; margin: 5px 0;">
              Tracking Number: ${orderDetails.shippingInfo.trackingNumber}
            </p>
            `
              : ""
          }
        </div>

        <div style="text-align: center;">
          <a href="${
            process.env.FRONTEND_URL || "http://localhost:3000"
          }/order/${orderId}" 
            class="button" 
            style="color: white;">
            View Order Details
          </a>
        </div>
      </div>

      <div class="footer">
        <p>
          If you have any questions about your order, please contact our support team at
          <a href="mailto:${supportEmail}" style="color: #93c5fd;">${supportEmail}</a>
        </p>
        <p style="margin-top: 10px; font-size: 12px;">
          &copy; ${new Date().getFullYear()} ${
    process.env.SMTP_FROM_NAME
  }. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
  `;
};
