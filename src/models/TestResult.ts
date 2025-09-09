import mongoose, { Schema, model, models } from "mongoose";

const TestResultSchema = new Schema({
  exerciseType: { type: String, required: true },
  score: { type: Number, required: true },
  feedback: { type: [String], default: [] },
  corrections: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

const TestResult = models.TestResult || model("TestResult", TestResultSchema);
export default TestResult;
