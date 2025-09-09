"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  const [view, setView] = useState<"district" | "state">("district");

const districtLeaderboard = [
    { rank: 1, name: "Arjun Mehta", district: "Lucknow", score: 95, status: "Qualified" },
    { rank: 2, name: "Kabir Nair", district: "Kanpur", score: 91, status: "Qualified" },
    { rank: 3, name: "Sahil Reddy", district: "Varanasi", score: 87, status: "Pending" },
    { rank: 4, name: "Ravi Patel", district: "Prayagraj", score: 84, status: "Pending" },
  ];

  const stateLeaderboard = [
    { rank: 1, name: "Aarav Sharma", state: "Uttar Pradesh", score: 96, status: "Qualified" },
    { rank: 2, name: "Devansh Singh", state: "Maharashtra", score: 93, status: "Qualified" },
    { rank: 3, name: "Kunal Joshi", state: "Delhi", score: 89, status: "Pending" },
    { rank: 4, name: "Harsh Malhotra", state: "Punjab", score: 86, status: "Pending" },
  ];

  const leaderboard =
    view === "district" ? districtLeaderboard : stateLeaderboard;

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <Badge className="animate-pulse">🏆 Leaderboard</Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-[Neucha]">
          Athlete Performance Rankings
        </h1>
        <p className="text-muted-foreground">
          Track top athletes district-wise and state-wise based on benchmark
          scores.
        </p>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setView("district")}
          className={`px-4 py-2 rounded-xl border ${
            view === "district"
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          District Leaderboard
        </button>
        <button
          onClick={() => setView("state")}
          className={`px-4 py-2 rounded-xl border ${
            view === "state" ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          State Leaderboard
        </button>
      </div>

      {/* Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto max-w-4xl mx-auto"
      >
        <table className="w-full border rounded-xl overflow-hidden shadow-sm">
          <thead className="bg-secondary/40">
            <tr className="text-left">
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Athlete</th>
              <th className="px-4 py-3">
                {view === "district" ? "District" : "State"}
              </th>
              <th className="px-4 py-3">Score</th>
              
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((athlete) => (
              <tr
                key={athlete.rank}
                className="border-b hover:bg-muted/40 transition"
              >
                <td className="px-4 py-3 font-bold flex items-center gap-2">
                  {athlete.rank === 1 && (
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  )}
                  {athlete.rank}
                </td>
                <td className="px-4 py-3">{athlete.name}</td>
                <td className="px-4 py-3">
                  {view === "district"}
                </td>
                <td className="px-4 py-3">{athlete.score}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
