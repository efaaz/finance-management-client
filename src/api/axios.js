import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/auth/users",
  headers: {
    "Content-Type": "application/json",
  },
});

// remove tokens form local storage access only form rtk store for accestoken
//  delete refresh token form rtk store state update the slice
// next update the logout function
// protected routes 






// request interceptor to inject token before sending requests to the backend
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    console.log(response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    throw new Error("Refresh token failed");
  }
};

// Add response interceptor to refresh token if it's expired
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        localStorage.setItem("accessToken", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        store.dispatch(logoutUser());
        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
