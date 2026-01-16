import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://metric-digitals-backend.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
