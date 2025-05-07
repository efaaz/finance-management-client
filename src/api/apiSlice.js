import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { setUser } from "../features/auth/authSlice"; // Removed setError import

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"], 
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/current-user",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
      }),
      providesTags: ["User"], // For cache tagging
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("getMe data:", data.data);
          await dispatch(setUser(data.data));
        } catch (error) {
          // Error is automatically handled by baseQueryWithReauth
          console.error("getMe error:", error);
          // No need to dispatch setError - it's handled in authSlice matchers
        }
      },
    }),
  }),
});

export const { useGetMeQuery } = api;