import axios from "axios";
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true
});

export const config = {
  headers: {
    'content-type': ' application/json ' // application/x-www.form-urlencoded
  }
};

export const multipartConfig = {
  headers: {
    'content-type': 'multipart/form-data'
  }
};

export default axiosInstance;