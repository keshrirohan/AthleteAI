// src/lib/getCurrentUser.ts
import { verifyToken } from "@/lib/auth"; // verifyToken returns payload or null

export function getCurrentUserFromCookie(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  if (!cookie) return null;
  const tokenPair = cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith("token="));
  if (!tokenPair) return null;
  const token = tokenPair.split("=")[1];
  if (!token) return null;
  const payload = verifyToken(token);
  return payload; // { sub, iat, exp, ... } or null
}
