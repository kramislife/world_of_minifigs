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
  }),
});

export const { useCreatePayPalOrderMutation, useCapturePayPalOrderMutation } =
  checkoutApi;
