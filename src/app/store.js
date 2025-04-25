import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const createStore = () => 
  configureStore({
    reducer: {
      auth: authReducer,
    },
  });

const store = createStore();
export default store;