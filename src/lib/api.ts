import axios from "axios";

// If NEXT_PUBLIC_API_URL is set (local dev), use it. Otherwise, use empty string for relative proxying.
const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
});
