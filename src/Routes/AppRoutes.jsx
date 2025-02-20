import { Routes, Route } from "react-router";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import FeaturePage from "../pages/FeaturePage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<FeaturePage />} />
        {/* <Route path="sign-in" element={<Login />} /> */}
        {/* <Route path="/sign-up" element={<SignUp />} /> */}
      </Route>

      {/* Error Page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;