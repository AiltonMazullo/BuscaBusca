import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = ["/checkout", "/pagamento"];
const AUTH_COOKIE_NAME = "busca_busca_auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = PROTECTED_PATHS.some(path => pathname.startsWith(path));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Check for the auth cookie which we set in AuthContext
  const isLoggedIn = request.cookies.get(AUTH_COOKIE_NAME)?.value === "true";

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    // Add the original path as a query param so we can redirect back after login
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (svg, png, jpg, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg).*)",
  ],
};
