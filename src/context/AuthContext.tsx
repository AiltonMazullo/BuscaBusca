"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  startTransition,
} from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import type { User, AuthResponse } from "@/types/auth.types";

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
  isHydrated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const AUTH_USER_STORAGE_KEY = "@buscabusca:user";
const AUTH_TOKEN_STORAGE_KEY = "@buscabusca:token";

function safeParseUser(raw: string | null): User | null {
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

type AuthState = {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isHydrated: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = safeParseUser(
      localStorage.getItem(AUTH_USER_STORAGE_KEY),
    );
    const storedToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

    startTransition(() => {
      setAuthState({
        user: storedUser,
        token: storedToken,
        isHydrated: true,
      });
    });
  }, []);

  const persistSession = (session: AuthResponse) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(session.user));
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, session.token);
    }

    setAuthState({
      user: session.user,
      token: session.token,
      isHydrated: true,
    });
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
    const session = await authService.register({
      name,
      email,
      password,
    });

    persistSession(session);
    router.push("/login");
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_USER_STORAGE_KEY);
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    }

    setAuthState({
      user: null,
      token: null,
      isHydrated: true,
    });

    router.push("/login");
  };

  const isAuthenticated = !!authState.user && !!authState.token;

  const isAdmin = useMemo(() => {
    const role = (authState.user?.role ?? "").toString().toLowerCase();
    return role === "admin";
  }, [authState.user]);

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
        isHydrated: authState.isHydrated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
