// lib/auth.ts
"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "ghsdghsdghjsdbhcbscbjhbjc"
    ) as { id: string; email?: string; username?: string };

    return decoded;
  } catch {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getUserFromToken();
  return !!user;
}
