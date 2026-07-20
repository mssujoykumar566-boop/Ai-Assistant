import axios from "axios";

// If NEXT_PUBLIC_API_URL is set (local dev), use it. Otherwise, use empty string for relative proxying.
const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("skillpath_auth_token")
      : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
