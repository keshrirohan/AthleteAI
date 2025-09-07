// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (
    token &&
    (pathname === "/" ||
      pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/signup"))
  ) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "default-secret");
      return NextResponse.redirect(new URL(`/${decoded.username}`, req.url));
    } catch {
  
      const res = NextResponse.next();
      res.cookies.set("token", "", { expires: new Date(0) });
      return res;
    }
  }

  if (
    !token &&
    (pathname.startsWith("/profile") ||
      pathname.startsWith("/settings") ||
      pathname.startsWith("/workout"))
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/signup",
    "/profile/:path*",
    "/settings/:path*",
    "/workout/:path*",
  ],
};
