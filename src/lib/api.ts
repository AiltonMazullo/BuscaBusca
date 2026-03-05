/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ex: http://localhost:3333
});

// Pega token do localStorage (client-side)
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("@buscabusca:token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Padroniza erro (opcional)
export function getApiErrorMessage(err: unknown) {
  if (axios.isAxiosError(err)) {
    return (
      (err.response?.data as any)?.message ||
      err.response?.statusText ||
      err.message
    );
  }
  return "Unexpected error";
}
