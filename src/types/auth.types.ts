export type UserRole = "USER" | "ADMIN";

export interface User {
  id: number | string;
  name: string;
  email: string;
  role: UserRole;
}

/* FRONTEND FORM */
export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
