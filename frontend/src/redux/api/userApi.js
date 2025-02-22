import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setisAuthenticated, setUser } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/profile/me",
        credentials: "include",
      }),
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setisAuthenticated(true));
        } catch (error) {
          dispatch(setisAuthenticated(false));
          dispatch(setUser(null));
        }
      },
    }),
    getUserAddresses: builder.query({
      query: () => ({
        url: "/me/addresses",
        credentials: "include",
      }),
      transformResponse: (result) => result.addresses,
    }),
    getSingleAddress: builder.query({
      query: (id) => ({
        url: `/me/addresses/${id}`,
        credentials: "include",
      }),
      transformResponse: (result) => result.address,
    }),
    createAddress: builder.mutation({
      query: (addressData) => ({
        url: "/me/createAddress",
        method: "POST",
        body: addressData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, addressData }) => ({
        url: `/me/addresses/${id}`,
        method: "PATCH",
        body: addressData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/me/addresses/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        credentials: "include",
      }),
      transformResponse: (result) => result,
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/admin/users/${id}`,
        credentials: "include",
      }),
      transformResponse: (result) => result,
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: userData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
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
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = userApi;
