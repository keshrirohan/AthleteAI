// src/lib/auth.ts
import jwt, { SignOptions } from "jsonwebtoken"; // Import SignOptions
import { NextResponse } from "next/server";

// Define a type for your JWT payload for better safety across your app
export interface JwtPayload {
  userId: string;
  // You can add other properties like email, roles, etc.
}

const JWT_SECRET = process.env.JWT_SECRET || "change_this_in_production";
const TOKEN_NAME = "token";
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
};

/**
 * Signs a payload and returns a JWT token.
 * @param payload The payload to sign.
 * @param expiresIn Token expiration time (e.g., "7d").
 * @returns The signed JWT.
 */
export function signToken(payload: JwtPayload, expiresIn = "7d") {
  // ✅ FIX: Explicitly define options and algorithm
  const options: SignOptions = {
    algorithm: "HS256", // The default algorithm for string secrets
    expiresIn: "7d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

/**
 * Verifies a JWT token.
 * @param token The token to verify.
 * @returns The decoded payload if valid, otherwise null.
 */
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    return null;
  }
}

/**
 * Creates a NextResponse and sets the authentication cookie.
 * @param body The response body.
 * @param token The JWT to set in the cookie.
 * @param maxAgeSec Cookie's max age in seconds.
 * @returns A NextResponse object with the cookie set.
 */
export function createAuthResponse(
  body: any,
  token: string,
  maxAgeSec = 60 * 60 * 24 * 7
) {
  const res = NextResponse.json(body, { status: 200 });
  res.cookies.set({
    name: TOKEN_NAME,
    value: token,
    ...COOKIE_OPTIONS,
    maxAge: maxAgeSec,
  });
  return res;
}

/**
 * Creates a NextResponse that clears the authentication cookie.
 * @returns A NextResponse object that clears the cookie.
 */
export function clearAuthCookie() {
  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: TOKEN_NAME,
    value: "",
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
  return res;
}
