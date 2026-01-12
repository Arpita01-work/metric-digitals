import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api", // 🔴 change to your backend URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
