import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setisAuthenticated, setUser } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/profile/me",
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setisAuthenticated(true));
        } catch (error) {}
      },
    }),
    getUserAddresses: builder.query({
      query: () => "/me/addresses",
      transformResponse: (result) => result.addresses,
    }),
    getSingleAddress: builder.query({
      query: (id) => `/me/addresses/${id}`,
      transformResponse: (result) => result.address,
    }),
    createAddress: builder.mutation({
      query: (addressData) => ({
        url: "/me/createAddress",
        method: "POST",
        body: addressData,
      }),
      invalidates: ["getUserAddresses"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, addressData }) => ({
        url: `/me/addresses/${id}`,
        method: "PATCH",
        body: addressData,
      }),
      invalidates: ["getUserAddresses"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/me/addresses/${id}`,
        method: "DELETE",
      }),
      invalidates: ["getUserAddresses"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUserAddressesQuery,
  useGetSingleAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = userApi;
