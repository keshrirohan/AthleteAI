// app/api/profile/[id]/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Profile from "@/models/Profile";
import Result from "@/models/Result";
import User from "@/models/User";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    // Find profile by userId (Profile.userId stores ObjectId of User)
    const profile = await Profile.findOne({ userId: params.id }).lean();
    const user = await User.findById(params.id).lean();
    if (!profile && !user) {
      return NextResponse.json({ success: false, error: "User/Profile not found" }, { status: 404 });
    }

    // Get results for this athlete (Result.athleteId stored as string userId)
    const results = await Result.find({ athleteId: params.id }).sort({ createdAt: 1 }).lean();

    return NextResponse.json({ success: true, profile: profile || null, user: user || null, results }, { status: 200 });
  } catch (err: any) {
    console.error("GET /api/profile/:id error", err);
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    // Only allow specific profile fields to be updated
    const updates: any = {};
    if (typeof body.name === "string") updates.name = body.name;
    if (typeof body.age === "number") updates.age = body.age;
    if (typeof body.gender === "string") updates.gender = body.gender;
    if (typeof body.sport === "string") updates.sport = body.sport;
    if (typeof body.state === "string") updates.state = body.state;
    if (typeof body.profileImage === "string") updates.profileImage = body.profileImage;

    // Upsert: if profile not found, create new (attach userId)
    const profile = await Profile.findOneAndUpdate(
      { userId: params.id },
      { $set: updates, $setOnInsert: { userId: params.id } },
      { upsert: true, new: true }
    ).lean();

    // Optionally update name on User model if provided
    if (typeof body.name === "string") {
      await User.findByIdAndUpdate(params.id, { $set: { name: body.name } });
    }

    return NextResponse.json({ success: true, profile }, { status: 200 });
  } catch (err: any) {
    console.error("PUT /api/profile/:id error", err);
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
