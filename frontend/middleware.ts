import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const pathname = request.nextUrl.pathname;

  // các route public (không cần login)
  const publicRoutes = ["/login", "/register"];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 1. CHƯA LOGIN mà vào route KHÔNG PHẢI public → đá về login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. ĐÃ LOGIN mà vào login/register → đá về users (hoặc /)
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/users", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};