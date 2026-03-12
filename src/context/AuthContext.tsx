"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import type { User, AuthResponse } from "@/types/auth.types";

type UpdateProfileData = {
  name?: string;
  email?: string;
  cep?: string;
  address?: string;
  street?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    cep?: string,
    address?: string,
    street?: string,
    complement?: string,
    neighborhood?: string,
    city?: string,
    state?: string,
  ) => Promise<void>;
  updateProfile: (data: UpdateProfileData) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    return safeParseUser(localStorage.getItem(AUTH_USER_STORAGE_KEY));
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  });

  const persistSession = (session: AuthResponse) => {
    setUser(session.user);
    setToken(session.token);

    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(session.user));
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, session.token);
  };

  const login = async (email: string, password: string) => {
    const session = await authService.login({ email, password });
    persistSession(session);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    cep?: string,
    address?: string,
    street?: string,
    complement?: string,
    neighborhood?: string,
    city?: string,
    state?: string,
  ) => {
    const session = await authService.register({
      name,
      email,
      password,
      cep,
      address,
      street,
      complement,
      neighborhood,
      city,
      state,
    });

    persistSession(session);
    router.push("/login");
  };

  const updateProfile = (data: UpdateProfileData) => {
    setUser((currentUser) => {
      if (!currentUser) return null;

      const updatedUser: User = {
        ...currentUser,
        ...data,
      };

      localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);

    router.push("/login");
  };

  const isAuthenticated = !!user && !!token;

  const isAdmin = useMemo(() => {
    const role = (user?.role ?? "").toString().toLowerCase();
    return role === "admin";
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        updateProfile,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
