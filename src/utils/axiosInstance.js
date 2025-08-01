import axios from "axios";

// Choose base URL based on mode
const isDevelopment = import.meta.env.MODE === "development";

const API = axios.create({
  baseURL: isDevelopment
    ? import.meta.env.VITE_BACKEND_URL_LOCAL + "/api"
    : import.meta.env.VITE_BACKEND_URL + "/api",
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
