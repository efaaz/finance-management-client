import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { silentRefresh } from "../../features/auth/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(silentRefresh());
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
