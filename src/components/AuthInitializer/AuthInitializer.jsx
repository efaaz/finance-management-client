import { useEffect } from "react";
import { useGetMeQuery } from "../../api/apiSlice";
import { setUser } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { data, isLoading, isUninitialized } = useGetMeQuery();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  // Optional: Return loading state if needed
  if (isLoading && !isUninitialized) {
    return <div>Loading session...</div>; // Or your loader component
  }

  return children;
};

export default AuthInitializer;