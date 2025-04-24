import MasterCard from "@/assets/mastercard.svg";
import Visa from "@/assets/visa.png";
import Stripe from "@/assets/stripe.svg";
import PayPal from "@/assets/Paypal.png";

// Payment method options
export const PAYMENT_METHODS = {
  CREDIT_CARD: "Stripe",
  PAYPAL: "PayPal",
  COD: "COD",
};

// Stripe appearance configuration
export const STRIPE_APPEARANCE = {
  theme: "stripe",
  variables: {
    colorPrimary: "#2563eb",
    colorDanger: "#FFDF00",
    fontFamily: "'Poppins', sans-serif",
    spacingUnit: "4px",
    borderRadius: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid #334155",
      boxShadow: "none",
    },
    ".Input:focus": {
      border: "1px solid #2563eb",
    },
    ".Label": {
      color: "#d2d9e2",
      padding: "0px 0px 3px 3px",
    },
  },
};

// Payment method configurations
export const PAYMENT_METHOD_CONFIG = [
  {
    type: PAYMENT_METHODS.CREDIT_CARD,
    content: {
      images: [
        { src: MasterCard, alt: "MasterCard", className: "h-8 w-auto" },
        { src: Visa, alt: "Visa", className: "h-8 w-auto" },
        { src: Stripe, alt: "Stripe", className: "h-6 w-auto" },
      ],
    },
  },
  {
    type: PAYMENT_METHODS.PAYPAL,
    content: {
      images: [{ src: PayPal, alt: "PayPal", className: "h-20 w-auto" }],
    },
  },
];

// Form field names (for consistency across components)
export const FORM_FIELDS = {
  EMAIL: "email",

  // Updated address fields to match the backend structure
  ADDRESS: {
    FULL_NAME: "full_name",
    CONTACT_NUMBER: "contact_number",
    ADDRESS_LINE1: "address_line1",
    ADDRESS_LINE2: "address_line2",
    CITY: "city",
    STATE: "state",
    POSTAL_CODE: "postal_code",
    COUNTRY: "country",
  },
};
