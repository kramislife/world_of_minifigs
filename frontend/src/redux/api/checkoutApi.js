import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPayPalOrder: builder.mutation({
      query: (orderData) => ({
        url: "/payment/create-paypal-order",
        method: "POST",
        body: orderData,
      }),
    }),
    capturePayPalOrder: builder.mutation({
      query: (orderID) => ({
        url: `/payment/capture-paypal-order/${orderID}`,
        method: "POST",
      }),
    }),
    getStripeApiKey: builder.query({
      query: () => "/stripeapikey",
    }),
    processStripePayment: builder.mutation({
      query: (amount) => ({
        url: "/payment/process",
        method: "POST",
        body: { amount },
      }),
    }),
  }),
});

export const {
  useCreatePayPalOrderMutation,
  useCapturePayPalOrderMutation,
  useGetStripeApiKeyQuery,
  useProcessStripePaymentMutation,
} = checkoutApi;
