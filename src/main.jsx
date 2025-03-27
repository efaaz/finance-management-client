import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import AppRoutes from "./Routes/AppRoutes.jsx";
import { ThemeProvider } from "./components/ui/theme-provider.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Check for existing token on app load
const token = localStorage.getItem("token");
if (token) {
  // You might want to add a "verify token" API call here
  store.dispatch({ type: "auth/verifyToken" });
}


createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOGGLE_CLIENT_ID}>
    <Provider store={store}>
      <SpeedInsights />
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
      <Analytics />
    </Provider>
  </GoogleOAuthProvider>
);
