import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/newOrder",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    getAllOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Order"],
    }),

    getOrderDetails: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ["Order"],
    }),

    // Admin endpoints
    getAllOrdersAdmin: builder.query({
      query: () => "/admin/orders",
      providesTags: ["Order"],
    }),

    updateOrderAdmin: builder.mutation({
      query: ({ id, orderData }) => ({
        url: `/admin/orders/${id}`,
        method: "PUT",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    // User endpoints
    updateOrder: builder.mutation({
      query: ({ id, orderData }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
  useGetAllOrdersAdminQuery,
  useUpdateOrderAdminMutation,
  useUpdateOrderMutation,
} = orderApi;
