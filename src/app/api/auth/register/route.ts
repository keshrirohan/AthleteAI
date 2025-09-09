// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken, createAuthResponse } from "@/lib/auth";
import Profile from "@/models/Profile";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, username, email, password } = body;

    if (!email || !password || !username || !name) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    // check existing by email or username
    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    }).lean();

    if (existing) {
      return NextResponse.json({ success: false, error: "User already exists (email or username)" }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashed,
    });

    // create empty profile
    await Profile.create({
      userId: user._id,
      name,
      profileImage: "/defaultImg.png",
    });

    const token = signToken({ sub: user._id.toString(), email: user.email });
    // respond with cookie set
    return createAuthResponse({ success: true, user: { _id: user._id, name: user.name, email: user.email } }, token);
  } catch (err: any) {
    console.error("REGISTER ERROR", err);
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
