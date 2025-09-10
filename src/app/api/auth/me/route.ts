// api/auth/me/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";
import { getCurrentUserFromCookie } from "@/lib/getCurrentUser";

export async function GET(req: Request) {
  try {
    const payload = getCurrentUserFromCookie(req);
    if (!payload) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });

    await connectDB();
    const user = await User.findById((payload as any).sub).select("_id name email username imageUrl").lean();
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (err: any) {
    console.error("GET /api/auth/me error", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}