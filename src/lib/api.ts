import axios from "axios";

// Use the Next.js `/api/*` rewrite instead of making a cross-origin browser request.
const baseURL = "";

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
