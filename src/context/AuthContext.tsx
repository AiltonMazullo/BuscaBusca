"use client";

import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/services/auth.service";
import type { AuthResponse, User } from "@/types/auth.types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role?: string,
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hydrate: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const AUTH_USER_STORAGE_KEY = "@buscabusca:user";
const AUTH_TOKEN_STORAGE_KEY = "@buscabusca:token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const hydrate = () => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);
    const storedToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

    // token
    setToken(storedToken ?? null);

    // user
    if (!storedUser) {
      setUser(null);
      return;
    }

    try {
      setUser(JSON.parse(storedUser) as User);
    } catch {
      setUser(null);
    }
  };

  const persistSession = (session: AuthResponse) => {
    setUser(session.user);
    setToken(session.token);

    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(session.user));
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, session.token);
    }
  };

  const login = async (email: string, password: string) => {
    const session = await authService.login({ email, password });
    persistSession(session);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role = "user",
  ) => {
    const session = await authService.register({ name, email, password, role });
    persistSession(session);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_USER_STORAGE_KEY);
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    }

    router.replace("/login");
  };

  const isAuthenticated = !!user && !!token;

  const isAdmin = useMemo(() => {
    return (user?.role ?? "").toLowerCase() === "admin";
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
        hydrate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
