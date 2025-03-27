// src/components/ProtectedRoute.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem('accessToken');

  if (!user || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};