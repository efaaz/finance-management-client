import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import ErrorDisplay from "../components/ErrorDisplay/ErrorDisplay";
import PublicLayout from "./Layouts/PublicLayout";

const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return !isAuthenticated ? (
    <>
      <PublicLayout /> <ErrorDisplay />
    </>
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default PublicRoute;
