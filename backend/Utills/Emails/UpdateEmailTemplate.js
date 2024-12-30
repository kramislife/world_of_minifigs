export const getOrderUpdateEmailTemplate = (
  customerName,
  orderId,
  orderStatus
) => {
  return `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Update</title>
        <style>
          @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        </style>
      </head>
  <body class="bg-gray-100 text-gray-800 font-sans">
      <div class="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md mt-10">
        <div class="bg-blue-600 text-white text-center py-6 rounded-t-lg">
          <h1 class="text-2xl font-semibold">Order Update</h1>
        </div>
        <div class="p-6">
          <p class="text-lg">Hi <span class="font-semibold">${customerName}</span>,</p>
          <p class="mt-4">We wanted to inform you that the status of your order <strong>#${orderId}</strong> has been updated to:</p>
          <p class="text-xl font-bold text-blue-600 mt-2">${orderStatus}</p>
          <p class="mt-4">Thank you for shopping with us. You can view your order details or contact our support team using the button below:</p>
          <a href="${process.env.FRONTEND_URL}/orders/${orderId}" 
             class="inline-block mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700">
            View Order
          </a>
          <p class="mt-6">If you have any questions, feel free to reply to this email or contact us at <a href="mailto:${
            process.env.SUPPORT_EMAIL
          }" class="text-blue-600">${process.env.SUPPORT_EMAIL}</a>.</p>
          <p class="mt-6">Best regards,</p>
          <p>${process.env.SMTP_FROM_NAME}</p>
        </div>
        <div class="bg-gray-100 text-center py-4 rounded-b-lg text-sm text-gray-600">
          <p>&copy; ${new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
          <p>${process.env.SMTP_FROM_NAME}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
