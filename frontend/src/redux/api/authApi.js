import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    // --------------------- Register A New User --------------------------------- //
    register: builder.mutation({
      query(body) {
        return {
          url: "/register",
          method: "POST",
          body,
        };
      },
    }),

    // --------------------- Login A User --------------------------------- //
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

    // --------------------- Logout A User --------------------------------- //
    logout: builder.query({
      query: () => {
        return {
          url: "/logout",
          method: "POST",
        };
      },
    }),

    // --------------------- Verify Email --------------------------------- //
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `/verify_user/${token}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response) => ({
        success: response.status === "success",
        message: response.message,
      }),
    }),

    // --------------------- Forgot Password --------------------------------- //
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/password/forgot",
        method: "POST",
        body,
      }),
    }),

    // --------------------- Reset Password --------------------------------- //
    resetPassword: builder.mutation({
      query: ({ token, ...body }) => ({
        url: `/password/reset/${token}`,
        method: "PUT",
        body,
      }),
    }),

    // --------------------- Contact Form --------------------------------- //
    contact: builder.mutation({
      query: (formData) => ({
        url: "/contact",
        method: "POST",
        body: formData,
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
  useContactMutation,
} = authApi;
