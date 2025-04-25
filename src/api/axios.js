import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/auth/users", // General API base URL
  withCredentials: true, // Include credentials (cookies) in requests
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
