// app/api/auth/logout/route.ts
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
  return clearAuthCookie();
}
