import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, appLoaded } = useSelector((state) => state.auth);
  
  if (!appLoaded) return <LoadingScreen />;
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
