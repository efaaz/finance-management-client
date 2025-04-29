import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import {
  logoutUser,
  setAccessToken,
  setUser,
} from "../features/auth/authSlice";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1/auth/users",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    // console.log("getting token from rtk:", token);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    // Add CSRF protection if using cookies
    headers.set("X-Requested-With", "XMLHttpRequest");
    return headers;
  },
  credentials: "include",
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  // Wait for any ongoing refresh to complete
  await mutex.waitForUnlock();

  // Make the initial request
  let result = await baseQuery(args, api, extraOptions);
  // console.log("Initial result:", result);

  if (result?.error?.originalStatus === 401) {
    // console.log("401 Unauthorized detected");

    // Only proceed if no other refresh is in progress
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // console.log("Attempting token refresh");
        // Call /refresh-token with POST method
        const refreshResult = await baseQuery(
          {
            url: "/refresh-token",
            method: "POST",
            credentials: "include", // Force include cookies
          },
          api,
          extraOptions
        );

        // console.log("Refresh result:", refreshResult);

        if (refreshResult.data?.data && refreshResult.data?.data.accessToken) {
          // Update access token in Redux store
          api.dispatch(setAccessToken(refreshResult.data.data.accessToken));
           // Clone original args and add new token
        const retryArgs = {
          ...args,
          headers: {
            ...args.headers,
            Authorization: `Bearer ${refreshResult.data.accessToken}`
          }
        };
        
        // Wait briefly to ensure token is stored
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // Retry original query with new token
        return await baseQuery(retryArgs, api, extraOptions);
      }else {
          // console.log("Refresh failed, logging out");
          api.dispatch(logoutUser());
        }
      } finally {
        release(); // Release the mutex
      }
    } else {
      // If another refresh is in progress, wait and retry
      console.log("Waiting for ongoing refresh");
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
