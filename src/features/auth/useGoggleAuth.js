import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "./authSlice";
import { useDispatch } from "react-redux";

const useGoogleAuth = () => {
    const dispatch = useDispatch();
  return useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        await dispatch(googleLogin(code)).unwrap();
      } catch (error) {
        console.error("Google login failed:", error);
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
    flow: "auth-code",
  });
};

export default useGoogleAuth;
