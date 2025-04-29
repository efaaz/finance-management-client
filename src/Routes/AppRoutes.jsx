import { Routes, Route } from "react-router";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import FeaturePage from "../pages/FeaturePage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import AboutUs from "../pages/AboutUs";
import AuthInitializer from "../components/AuthInitializer/AuthInitializer";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/PrivatePages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Layout */}
      <Route path="/" element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<FeaturePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/About-us" element={<AboutUs />} />
      </Route>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          {/* <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Route>
      {/* Error Page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
