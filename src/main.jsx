import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import AppRoutes from "./Routes/AppRoutes.jsx";
import { ThemeProvider } from "./components/ui/theme-provider.jsx";
import { Provider, useDispatch } from "react-redux";
import store from "./app/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "./components/ui/toaster.jsx";
import setupInterceptors from "./api/axiosInterceptors.js";

// Create app component with proper hook usage
const AppWrapper = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
};

// Initialize interceptors before creating root
setupInterceptors();

// Create root and render app
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOGGLE_CLIENT_ID}>
    <Provider store={store}>
      <SpeedInsights />
      <AppWrapper />
      <Analytics />
    </Provider>
  </GoogleOAuthProvider>
);
