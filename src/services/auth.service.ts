// src/services/auth.service.ts
import { api } from "@/lib/api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/auth.types";

const TOKEN_KEY = "@buscabusca:token";
const USER_KEY = "@buscabusca:user";

export const authService = {
  async register(data: Omit<RegisterRequest, "role">) {
    const payload: RegisterRequest = {
      ...data,
      role: "USER",
    };

    const { data: response } = await api.post<AuthResponse>(
      "/auth/register",
      payload,
    );

    return response;
  },

  async login(payload: LoginRequest) {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  saveSession(session: AuthResponse) {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
  },

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser(): User | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  },

  logout() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
