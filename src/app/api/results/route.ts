// app/api/results/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Result from "@/models/Result";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    // expect: { athleteId, exercise, score, feedback, corrections, ...optional metrics..., videoUrl }
    const doc = await Result.create({
      athleteId: body.athleteId,
      exercise: body.exercise,
      score: body.score ?? 0,
      feedback: body.feedback ?? [],
      corrections: body.corrections ?? [],
      reps: body.reps,
      jumpHeightCm: body.jumpHeightCm,
      jumpDisplacementNorm: body.jumpDisplacementNorm,
      turns: body.turns,
      splitTimes: body.splitTimes,
      cadence: body.cadence,
      trunkAngleAvg: body.trunkAngleAvg,
      trunkAngleMin: body.trunkAngleMin,
      trunkAngleMax: body.trunkAngleMax,
      distanceKm: body.distanceKm,
      durationSec: body.durationSec,
      paceMinPerKm: body.paceMinPerKm,
      videoUrl: body.videoUrl,
    });

    return NextResponse.json({ success: true, result: doc }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/results error", err);
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
