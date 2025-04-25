import instance from "./axios";
import { logoutUser, setAccessToken } from "../features/auth/authSlice";
import store from "../app/store";

let isRefreshing = false;
let failedRequests = [];

const setupInterceptors = () => {
  // Request interceptor
  instance.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            failedRequests.push(() => resolve(instance(originalRequest)));
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await instance.post("/auth/refresh");
          const newAccessToken = response.data.accessToken;
          store.dispatch(setAccessToken(newAccessToken));
          
          // Retry all failed requests
          failedRequests.forEach((cb) => cb());
          failedRequests = [];
          
          // Update the original request header
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          // Handle refresh token failure
          store.dispatch(logoutUser());
          window.location.href = "/sign-in";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;