// src/types/auth.types.ts
export type UserRole = "admin" | "user" | string

export interface User {
  id: number | string
  name: string
  email: string
  role: UserRole
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}