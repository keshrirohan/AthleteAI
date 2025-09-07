import mongoose, { Schema, Document } from "mongoose";

const ProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    name: { type: String },
    age: { type: Number },
    gender: { type: String },
    sport: { type: String },
    state: { type: String },
    profileImage: { type: String, default: "/defaultImg.png" },
  },
  { timestamps: true }
);

export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
