import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { productApi } from "./productApi";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/newOrder",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(productApi.util.invalidateTags(["Product"]));
        } catch (error) {
          // Handle error if needed
        }
      },
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),

    // Admin endpoints to get all orders
    getAllOrdersAdmin: builder.query({
      query: () => ({
        url: "/admin/orders",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),

    // Admin endpoints to update order status
    updateOrderAdmin: builder.mutation({
      query: ({ id, orderData }) => ({
        url: `/admin/orders/${id}`,
        method: "PUT",
        body: orderData,
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),

    // User endpoints to cancel order when status is pending
    updateOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Order"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.orderStatus === "Cancelled") {
            dispatch(productApi.util.invalidateTags(["Product", "Products"]));
          }
        } catch (error) {
          // Handle error if needed
        }
      },
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
