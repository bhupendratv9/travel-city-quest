import axios from "axios";
import useAuthStore from "@/store/auth-store";
import useGameStore from "@/store/game-store";
import { getQueryClient } from "@/app/get-query-client";

const isServer = typeof window === 'undefined';

const clientApiBase =
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api`.replace(/\/{2,}/g, "/");

// Replicates the logout side effects when the server reports an invalid token.
// Mirrors useLogoutMutation's onSuccess, but runs outside React (no router),
// so it falls back to a full navigation to /dashboard.
let isLoggingOut = false;
const forceLogout = () => {
  if (isServer || isLoggingOut) return;
  isLoggingOut = true;
  useGameStore.getState().restartGame();
  getQueryClient().clear();
  useAuthStore.getState().logout();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  window.location.assign(`${basePath}/dashboard`);
};

const isInvalidToken = (status?: number, message?: string) =>
  status === 401 && message === "Invalid token";

export const axiosPublic = axios.create({
  baseURL: isServer ? process.env.NEXT_PUBLIC_API_BASE_URL : clientApiBase,
});

const { accessToken } = useAuthStore.getState();

export const axiosPrivate = axios.create({
  baseURL: isServer ? process.env.NEXT_PUBLIC_API_BASE_URL : clientApiBase,
  headers: {
    Authorization: `Bearer ${accessToken ? accessToken: ""}`
  }
});

axiosPrivate.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosPrivate.interceptors.response.use(
  (response) => {
    // Some requests use validateStatus to resolve 4xx responses instead of
    // throwing, so the invalid-token signal can arrive on a fulfilled response.
    if (isInvalidToken(response.data?.status, response.data?.message)) {
      forceLogout();
    }
    return response;
  },
  (error) => {
    const data = error.response?.data;
    if (
      isInvalidToken(error.response?.status, data?.message) ||
      isInvalidToken(data?.status, data?.message)
    ) {
      forceLogout();
    }
    return Promise.reject(error);
  },
);


