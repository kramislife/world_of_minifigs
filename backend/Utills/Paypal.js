import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

// Validate required environment variables
const requiredEnvVars = [
  "PAYPAL_CLIENT_ID",
  "PAYPAL_CLIENT_SECRET",
  "PAYPAL_MODE",
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

// PayPal client configuration
const getPayPalClient = () => {
  try {
    const environment =
      process.env.PAYPAL_MODE === "live"
        ? new paypal.core.LiveEnvironment(
            process.env.PAYPAL_CLIENT_ID,
            process.env.PAYPAL_CLIENT_SECRET
          )
        : new paypal.core.SandboxEnvironment(
            process.env.PAYPAL_CLIENT_ID,
            process.env.PAYPAL_CLIENT_SECRET
          );

    return new paypal.core.PayPalHttpClient(environment);
  } catch (error) {
    console.error("PayPal client initialization error:", error);
    throw new Error(`Failed to initialize PayPal client: ${error.message}`);
  }
};

// Create PayPal order
export const createPayPalOrder = async (orderData) => {
  const { items, totalAmount } = orderData;

  if (!items?.length || !totalAmount || totalAmount <= 0) {
    throw new Error("Invalid order data");
  }

  try {
    const client = getPayPalClient();
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    // Format items for PayPal
    const formattedItems = items.map((item) => ({
      name: item.name,
      unit_amount: {
        currency_code: "USD",
        value: item.price.toFixed(2),
      },
      quantity: item.quantity.toString(),
    }));

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalAmount.toFixed(2),
              },
            },
          },
          items: formattedItems,
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        return_url: process.env.PAYPAL_RETURN_URL,
        cancel_url: process.env.PAYPAL_CANCEL_URL,
      },
    });

    const response = await client.execute(request);
    return response.result;
  } catch (error) {
    console.error("PayPal order creation error:", error);
    throw new Error("Failed to create PayPal order");
  }
};

// Capture PayPal payment
export const capturePayPalOrder = async (orderID) => {
  if (!orderID) {
    throw new Error("Order ID is required");
  }

  try {
    const client = getPayPalClient();
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    const response = await client.execute(request);
    return response.result;
  } catch (error) {
    console.error("PayPal capture error:", error);
    throw new Error("Failed to capture PayPal payment");
  }
};

// Verify webhook signature
export const verifyWebhookSignature = async (webhookData) => {
  try {
    const client = getPayPalClient();
    const request = new paypal.notifications.VerifyWebhookSignatureRequest();
    request.requestBody(webhookData);

    const response = await client.execute(request);
    return response.result.verification_status === "SUCCESS";
  } catch (error) {
    console.error("Webhook verification error:", error);
    return false;
  }
};

// Get PayPal configuration
export const getPayPalConfig = () => ({
  clientId: process.env.PAYPAL_CLIENT_ID,
  mode: process.env.PAYPAL_MODE || "sandbox",
  currency: "USD",
});
