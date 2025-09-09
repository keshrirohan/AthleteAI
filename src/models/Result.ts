// src/models/Result.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IResult extends Document {
  athleteId?: string;
  exercise: string;
  score: number;
  feedback: string[];
  corrections: string[];
  reps?: number;
  jumpHeightCm?: number;
  jumpDisplacementNorm?: number;
  turns?: number;
  splitTimes?: number[];
  cadence?: number;
  trunkAngleAvg?: number;
  trunkAngleMin?: number;
  trunkAngleMax?: number;
  distanceKm?: number;
  durationSec?: number;
  paceMinPerKm?: number;
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResultSchema = new Schema<IResult>(
  {
    athleteId: { type: String },
    exercise: { type: String, required: true },
    score: { type: Number, required: true },
    feedback: [String],
    corrections: [String],
    reps: Number,
    jumpHeightCm: Number,
    jumpDisplacementNorm: Number,
    turns: Number,
    splitTimes: [Number],
    cadence: Number,
    trunkAngleAvg: Number,
    trunkAngleMin: Number,
    trunkAngleMax: Number,
    distanceKm: Number,
    durationSec: Number,
    paceMinPerKm: Number,
    videoUrl: String,
  },
  { timestamps: true }
);

export default mongoose.models.Result || mongoose.model<IResult>("Result", ResultSchema);
