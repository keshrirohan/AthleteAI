// app/api/submit/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import ResultModel from "@/models/Result";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // expects { metadata, videoUrl }
    const metadata = body.metadata || {};
    const videoUrl = body.videoUrl || "";

    await connectDB();

    const doc = await ResultModel.create({
      athleteId: metadata.athleteId || null,
      exercise: metadata.exercise || "unknown",
      score: metadata.score ?? 0,
      feedback: metadata.feedback || [],
      corrections: metadata.corrections || [],
      reps: metadata.reps,
      jumpHeightCm: metadata.jumpHeightCm,
      jumpDisplacementNorm: metadata.jumpDisplacementNorm,
      turns: metadata.turns,
      splitTimes: metadata.splitTimes,
      cadence: metadata.cadence,
      trunkAngleAvg: metadata.trunkAngleAvg,
      trunkAngleMin: metadata.trunkAngleMin,
      trunkAngleMax: metadata.trunkAngleMax,
      distanceKm: metadata.distanceKm,
      durationSec: metadata.durationSec,
      paceMinPerKm: metadata.paceMinPerKm,
      videoUrl: videoUrl || undefined,
    });

    return NextResponse.json({ success: true, result: doc }, { status: 200 });
  } catch (err: any) {
    console.error("submit error:", err);
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
