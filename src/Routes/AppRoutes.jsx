import { Routes, Route } from "react-router";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import FeaturePage from "../pages/FeaturePage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import AboutUs from "../pages/AboutUs";
import AuthInitializer from "../components/AuthInitializer/AuthInitializer";

const AppRoutes = () => {
  return (
    <AuthInitializer>
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<FeaturePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/About-us" element={<AboutUs />} />
        </Route>

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthInitializer>
  );
};

export default AppRoutes;
