
import axios from "axios";

// Separate instances for public/private routes
const publicInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/auth/users",
  headers: {
    "Content-Type": "application/json",
  }
});

const privateInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/auth/users",
  withCredentials: true, // Only for authenticated routes
  headers: {
    "Content-Type": "application/json",
  }
});

export { publicInstance, privateInstance };