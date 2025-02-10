import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query(body) {
        return {
          url: "/register",
          method: "POST",
          body,
        };
      },
    }),

    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.query({
      query: () => {
        return {
          url: "/logout",
          method: "POST",
        };
      },
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `/verify_user/${token}`,
        method: "GET",
        credentials: 'include',
      }),
      transformResponse: (response) => ({
        success: response.status === "success",
        message: response.message
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/password/forgot",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, ...body }) => ({
        url: `/password/reset/${token}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyLogoutQuery,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
