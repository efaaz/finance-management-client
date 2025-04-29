import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import ProtectedLayout from "./Layouts/ProtectedLayout";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <ProtectedLayout /> : <Navigate to="/sign-in" replace />;

  
};

export default ProtectedRoute;
