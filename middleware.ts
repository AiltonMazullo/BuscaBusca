// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = ["/checkout", "/pagamento"];
const AUTH_COOKIE_NAME = "busca_busca_auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (!isProtectedRoute) return NextResponse.next();

  const isLoggedIn = request.cookies.get(AUTH_COOKIE_NAME)?.value === "true";

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const res = NextResponse.next();
  // evita cache em páginas sensíveis
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = {
  matcher: ["/checkout/:path*", "/pagamento/:path*"],
};








