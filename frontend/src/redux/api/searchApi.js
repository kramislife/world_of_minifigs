import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  tagTypes: ["SearchHistory"],
  endpoints: (builder) => ({
    getSearchHistory: builder.query({
      query: () => "/search/history",
      providesTags: ["SearchHistory"],
    }),
    addToSearchHistory: builder.mutation({
      query: (data) => ({
        url: "/search/history",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SearchHistory"],
    }),
    deleteSearchTerm: builder.mutation({
      query: (data) => ({
        url: "/search/history/term",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["SearchHistory"],
    }),
    clearSearchHistory: builder.mutation({
      query: () => ({
        url: "/search/history",
        method: "DELETE",
      }),
      invalidatesTags: ["SearchHistory"],
    }),
  }),
});

export const {
  useGetSearchHistoryQuery,
  useAddToSearchHistoryMutation,
  useDeleteSearchTermMutation,
  useClearSearchHistoryMutation,
} = searchApi;
