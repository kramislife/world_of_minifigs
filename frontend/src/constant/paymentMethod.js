// Payment method options
export const PAYMENT_METHODS = {
    CREDIT_CARD: "Stripe",
    PAYPAL: "PayPal",
    COD: "COD",
  };
  
  // Form field names (for consistency across components)
  export const FORM_FIELDS = {
    EMAIL: "email",
    PAYMENT: {
      CARD_NUMBER: "cardNumber",
      EXPIRY_DATE: "expiryDate",
      SECURITY_CODE: "securityCode",
      NAME_ON_CARD: "nameOnCard",
    },
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
  