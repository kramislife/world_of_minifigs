export const OrderBaseTemplate = (
  customerName,
  orderId,
  orderStatus,
  orderDetails,
  customMessage,
  customTitle
) => {
  const appName = process.env.SMTP_FROM_NAME || "World of Minifigs";
  const supportEmail = process.env.SMTP_FROM_EMAIL;
  const formattedItems = orderDetails.orderItems || [];

  // Extract shipping information
  const shippingInfo = orderDetails.shippingInfo || {};

  // Create tracking information section that only shows for shipped or delivered orders
  const trackingSection =
    (orderStatus === "Shipped" || orderStatus === "Delivered") &&
    shippingInfo.trackingNumber
      ? `
    <div class="card" style="background-color: #f8f9fa; border-radius: 12px; padding: 20px 14px; margin: 10px 0; width: 100%; border-left: 4px solid #4a90e2;">
      <div class="section-header">
        <table>
          <tr>
            <td style="width: 24px;">
              <img src="https://res.cloudinary.com/dhpccjumk/image/upload/v1742874893/gz06nekeonycawenqkn0.png" alt="" />
            </td>
            <td>
              <h2 style="font-size: 18px; font-weight: 700; margin: 0; color: #1a237e; vertical-align: middle; padding-left: 10px;">Shipping Information</h2>
            </td>
          </tr>
        </table>
      </div>
      
      <p style="margin: 8px 0; font-size: 14px;">
        <strong>Courier:</strong> ${shippingInfo.courier || "N/A"}
      </p>
      
      <p style="margin: 8px 0; font-size: 14px;">
        <strong>Tracking Number:</strong> ${shippingInfo.trackingNumber}
      </p>
      
      ${
        shippingInfo.trackingLink
          ? `
        <p style="margin: 15px 0;">
          <a href="${shippingInfo.trackingLink}" 
             style="display: inline-block; padding: 10px 15px; background-color: #4a90e2; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Track Your Package
          </a>
        </p>
      `
          : ""
      }
      
      ${
        shippingInfo.shippedAt
          ? `
        <p style="margin: 8px 0; font-size: 14px;">
          <strong>Shipped On:</strong> ${new Date(
            shippingInfo.shippedAt
          ).toLocaleDateString()}
        </p>
      `
          : ""
      }
      
      ${
        shippingInfo.additionalInfo
          ? `
        <p style="margin: 8px 0; font-size: 14px;">
          <strong>Additional Information:</strong> ${shippingInfo.additionalInfo}
        </p>
      `
          : ""
      }
    </div>
  `
      : "";

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${customTitle} | ${appName}</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif;
        line-height: 1.5;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
      }

      .container {
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .header {
        background-color: #1a237e;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        color: #ffffff;
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
        font-size: 14px;
      }

      .order-info {
        padding: 10px 0;
        line-height: 1.6;
      }

      .card {
        background-color: #f8f9fa;
        border-radius: 12px;
        padding: 20px 14px;
        margin: 10px 0;
        width: 100%;
      }

      .section-header {
        color: #1a237e;
        margin-bottom: 15px;
        width: 100%;
      }

      .section-header table {
        width: 100%;
        color: #1a237e;
      }

      .section-header img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        color: #1a237e;
      }

      .section-header h2 {
        font-size: 18px;
        font-weight: 700;
        margin: 0;
        color: #1a237e;
        vertical-align: middle;
        padding-left: 10px;
      }

      .delivery-details p {
        margin: 10px 0;
      }
      .delivery-details .address {
        line-height: 2;
      }

      .order-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        margin: 10px 0;
      }

      .order-table td {
        padding: 20px 0;
        border-bottom: 1px solid #eee;
      }

      .img-cell {
        width: 80px;
        vertical-align: top;
        padding-right: 0;
      }

      .order-table img {
        width: 60px;
        height: 60px;
        border-radius: 5px;
        display: block;
      }

      .details-cell {
        vertical-align: top;
        padding-left: 20px;
      }

      .item-name {
        font-weight: bold;
        margin-bottom: 5px;
        display: block;
      }

      .item-meta {
        color: #666;
        font-size: 14px;
        margin: 3px 0;
        display: block;
        line-height: 1.5;
      }

      .item-price {
        font-weight: 700;
        font-size: 14px;
        margin: 3px 0;
        display: block;
      }

      .card-table {
        background-color: #f8f9fa;
        border-radius: 12px;
        padding: 10px 14px;
        margin: 20px 0;
        width: 100%;
        border-left: 4px solid #1a237e;
      }

      .summary-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
      }

      .summary-table td {
        font-size: 16px;
        padding: 10px 0;
      }

      .summary-table .total {
        font-weight: bold;
        border-top: 1px solid #333;
      }

      @media only screen and (max-width: 480px) {
        .order-table td {
          padding: 20px 0;
        }

        .img-cell {
          width: 60px;
        }

        .order-table img {
          width: 50px;
          height: 50px;
        }

        .details-cell {
          width: calc(100% - 140px);
          padding-left: 20px;
        }

        .item-meta {
          font-size: 13px;
        }
      }
    </style>
  </head>
  <body></body>
    <div class="container">
      <div class="header">
        <h1>${customTitle}</h1>
      </div>
      <div class="content">
        <div class="order-info">
          Hi ${customerName},<br /><br />
          ${customMessage}
        </div>

           <!-- Shipping tracking information section -->
        ${trackingSection}

        <div class="card delivery-details" style="border-left: 4px solid #4CAF50;">
          <div class="section-header">
            <table>
              <tr>
                <td style="width: 24px;">
                  <img src="https://res.cloudinary.com/mark-legostore/image/upload/v1738720061/Location_xz7gzf.png" alt="" />
                </td>
                <td>
                  <h2>Delivery Details</h2>
                </td>
              </tr>
            </table>
          </div>
          <p class="address">
            <strong>Address:</strong> ${
              orderDetails.shippingAddress?.address || "N/A"
            }
          </p>
          <p>
            <strong>Phone:</strong> ${
              orderDetails.shippingAddress?.phoneNo || "N/A"
            }
          </p>
          <p>
            <strong>Email:</strong> ${orderDetails.email || "N/A"}
          </p>
        </div>

        <div class="card" style="border-left: 4px solid #FF9800;">
          <div class="section-header">
            <table>
              <tr>
                <td style="width: 24px;">
                  <img src="https://res.cloudinary.com/mark-legostore/image/upload/v1738720061/Shopping_Cart_am7d9i.png" alt="" />
                </td>
                <td>
                  <h2>Order Items</h2>
                </td>
              </tr>
            </table>
          </div>
          <table class="order-table" width="100%" cellpadding="0" cellspacing="0">
            ${formattedItems
              .map(
                (item) => `
            <tr>
              <td class="img-cell" width="100" valign="top" align="left" style="width: 100px; max-width: 100px;">
                <img 
                  src="${item.image}" 
                  alt="${item.name}" 
                  width="100" 
                  height="100" 
                  style="display: block; border-radius: 5px; width: 100px !important; height: 100px !important;"
                />
              </td>
              <td class="details-cell" valign="top" style="padding-left: 10px;">
                <span class="item-name">${item.name}</span>
                <span class="item-price">
                  $${item.discountedPrice.toFixed(2)} 
                  ${
                    item.hasDiscount
                      ? `<span style="text-decoration: line-through; color: #999; margin-left: 5px; font-size: 12px;">$${item.price.toFixed(
                          2
                        )}</span>`
                      : ""
                  }
                </span>
                <span class="item-meta">Color: ${item.color || "N/A"}</span>
                ${
                  item.includes && item.includes !== "N/A"
                    ? `<span class="item-meta">Includes: ${item.includes.replace(
                        /^,\s*/,
                        ""
                      )}</span>`
                    : ""
                }
                <span class="item-meta">Quantity: ${item.quantity}</span>
              </td>
            </tr>
            `
              )
              .join("")}
          </table>
        </div>

        <div class="card-table">
          <table class="summary-table">
            <tr>
              <td align="left">Subtotal:</td>
              <td align="right">$${orderDetails.totalPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td align="left">Shipping Fee:</td>
              <td align="right">$${orderDetails.shippingPrice.toFixed(2)}</td>
            </tr>
            <tr class="total">
              <td align="left">Total:</td>
              <td align="right">$${orderDetails.totalPrice.toFixed(2)}</td>
            </tr>
          </table>
        </div>

        <div class="footer" style="text-align: center; margin-top: 20px; color: #999">
          <p style="line-height: 2">
            For any questions, contact us at
            <a href="mailto:${supportEmail}">${supportEmail}</a>
          </p>
          <p style="margin-top: 10px">
            &copy; ${new Date().getFullYear()} ${appName}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
