import axios from "axios";

// In dev, Vite proxies /api -> http://localhost:8000 (see vite.config.ts).
// In production (Vercel), set VITE_API_BASE_URL to the deployed Render URL,
// e.g. https://trusted-ev-fleet-api.onrender.com
const baseURL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}`
  : "/api";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
