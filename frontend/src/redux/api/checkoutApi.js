import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { productApi } from "./productApi";

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
    getPayPalCredentials: builder.query({
      query: () => "/payment/paypal-credentials",
    }),
    processRefund: builder.mutation({
      query: (data) => ({
        url: "/payment/refund",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(productApi.util.invalidateTags(["Product", "Products"]));
        } catch (error) {
          // Handle error if needed
        }
      },
    }),
  }),
});

export const {
  useCreatePayPalOrderMutation,
  useCapturePayPalOrderMutation,
  useGetStripeApiKeyQuery,
  useProcessStripePaymentMutation,
  useGetPayPalCredentialsQuery,
  useProcessRefundMutation,
} = checkoutApi;
