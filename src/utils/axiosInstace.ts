import axios from "axios";
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL
});

export default axiosInstance;