import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest,
) {
  const token =
    request.cookies.get(
      "access_token",
    )?.value;

  const pathname =
    request.nextUrl.pathname;

  const authPages = [
    "/login",
    "/register",
  ];

  const protectedPages = [
    "/users",
  ];

  const isAuthPage =
    authPages.includes(
      pathname,
    );

  const isProtected =
    protectedPages.some(
      (route) =>
        pathname.startsWith(
          route,
        ),
    );

  // chưa login
  if (
    !token &&
    isProtected
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url,
      ),
    );
  }

  // đã login
  if (
    token &&
    isAuthPage
  ) {
    return NextResponse.redirect(
      new URL(
        "/users",
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/users/:path*",
    "/login",
    "/register",
  ],
};