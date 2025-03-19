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
      providesTags: ["User"],
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

    // ------------------------------- Get User Addresses ----------------------------------- //
    getUserAddresses: builder.query({
      query: () => ({
        url: "/me/addresses",
        credentials: "include",
      }),
      transformResponse: (result) => result.addresses,
      providesTags: ["User"],
    }),

    // ------------------------------- Get Single Address ----------------------------------- //
    getSingleAddress: builder.query({
      query: (id) => ({
        url: `/me/addresses/${id}`,
        credentials: "include",
      }),
      transformResponse: (result) => result.address,
    }),

    // ------------------------------- Create Address ----------------------------------- //
    createAddress: builder.mutation({
      query: (addressData) => ({
        url: "/me/createAddress",
        method: "POST",
        body: addressData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // ------------------------------- Update Address ----------------------------------- //
    updateAddress: builder.mutation({
      query: ({ id, addressData }) => ({
        url: `/me/addresses/${id}`,
        method: "PATCH",
        body: addressData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // ------------------------------- Delete Address ----------------------------------- //
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/me/addresses/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // ------------------------------- Get All Users ----------------------------------- //
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        credentials: "include",
      }),
      transformResponse: (result) => result,
      providesTags: ["User"],
    }),

    // ------------------------------- Delete User ----------------------------------- //
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // ------------------------------- Get Single User ----------------------------------- //
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/admin/users/${id}`,
        credentials: "include",
      }),
      transformResponse: (result) => result,
      providesTags: ["User"],
    }),

    // ------------------------------- Update User ----------------------------------- //
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: userData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // ----------------------------- Update Profile Picture ----------------------------------- //
    updateProfilePicture: builder.mutation({
      query: (imageData) => ({
        url: "/me/profile/updateAvatar",
        method: "PUT",
        body: imageData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch (error) {
          // Handle error if needed
        }
      },
    }),

    // ----------------------------- Update Profile ----------------------------------- //
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/me/profile/updateProfile",
        method: "PUT",
        body: userData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // ----------------------------- Update Password ----------------------------------- //
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/me/profile/updatePassword",
        method: "PUT",
        body: passwordData,
        credentials: "include",
      }),
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
  useUpdateProfilePictureMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = userApi;
