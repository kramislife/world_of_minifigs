import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { orderApi } from "./orderApi";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: `/order/reviews`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(orderApi.util.invalidateTags(["Order"]));
        } catch (error) {
          // Handle error if needed
        }
      },
    }),

    getProductReviews: builder.query({
      query: (productId) => ({
        url: `/reviews/${productId}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),

    updateReview: builder.mutation({
      query: ({ reviewId, reviewData }) => ({
        url: `/reviews/${reviewId}`,
        method: "PUT",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
    }),

    getReviewByOrderId: builder.query({
      query: (orderId) => ({
        url: `/reviews/order/${orderId}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),

    voteReview: builder.mutation({
      query: (data) => ({
        url: "/reviews/vote",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),

    addReplyToReview: builder.mutation({
      query: (data) => ({
        url: "/reviews/reply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),

    getAllReviews: builder.query({
      query: () => ({
        url: "/admin/reviews",
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetProductReviewsQuery,
  useUpdateReviewMutation,
  useGetReviewByOrderIdQuery,
  useVoteReviewMutation,
  useAddReplyToReviewMutation,
  useGetAllReviewsQuery,
} = reviewApi;
