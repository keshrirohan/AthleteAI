"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  ReferenceLine,
} from "recharts";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const COLORS = ["#f44336", "#ff9800", "#ffd600", "#4caf50", "#2196f3"];

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams =
    params && typeof (params as any).then === "function"
      ? (React.use(params as any) as { id: string })
      : (params as { id: string });

  const userId = resolvedParams?.id;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: 0,
    gender: "",
    sport: "",
    state: "",
    profileImage: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!userId) return;
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/profile/${userId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to fetch");
      setUser(data.user || null);
      setProfile(data.profile || null);
      setResults(data.results || []);
      setForm({
        name: (data.profile?.name || data.user?.name) ?? "",
        age: data.profile?.age ?? 0,
        gender: data.profile?.gender ?? "",
        sport: data.profile?.sport ?? "",
        state: data.profile?.state ?? "",
        profileImage: data.profile?.profileImage ?? data.user?.avatarUrl ?? "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const overall = useMemo(() => {
    if (!results.length) return { score: 0, badge: "Bronze" };
    const avg = Math.round(
      results.reduce((s, r) => s + (r.score || 0), 0) / results.length
    );
    const badge = avg >= 80 ? "Gold" : avg >= 60 ? "Silver" : "Bronze";
    return { score: avg, badge };
  }, [results]);

  const growthSeries = useMemo(() => {
    return results
      .slice()
      .reverse()
      .map((r) => {
        const date = new Date(r.createdAt);
        return {
          dateIso: date.toISOString(),
          dateShort: date.toLocaleDateString(),
          dateLabel: date.toLocaleString(),
          score: Number(r.score ?? 0),
        };
      });
  }, [results]);

  const { yDomain, bestScore, lastTest } = useMemo(() => {
    const scores = results.map((r) => Number(r.score ?? 0));
    if (!scores.length)
      return { yDomain: [0, 100], bestScore: 0, lastTest: null };
    const min = Math.max(0, Math.min(...scores) - 10);
    const max = Math.min(100, Math.max(...scores) + 10);
    const best = Math.max(...scores);
    const last = results.length
      ? new Date(results[results.length - 1].createdAt)
      : null;
    return { yDomain: [min, max], bestScore: best, lastTest: last };
  }, [results]);

  const distribution = useMemo(() => {
    const counts = Object.entries(
      results.reduce((acc: any, r: any) => {
        acc[r.exercise] = (acc[r.exercise] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));
    return counts;
  }, [results]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setAvatarFile(f);
  };

  async function uploadToCloudinary(file: File) {
    if (!CLOUD_NAME || !UPLOAD_PRESET)
      throw new Error("Missing Cloudinary client config");
    return new Promise<{ secure_url: string }>((resolve, reject) => {
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable)
          setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const d = JSON.parse(xhr.responseText);
            resolve({ secure_url: d.secure_url });
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error("Cloudinary upload failed: " + xhr.responseText));
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", UPLOAD_PRESET);
      xhr.send(fd);
    });
  }

  const saveProfile = async () => {
    setSaving(true);
    try {
      let profileImageUrl = form.profileImage;
      if (avatarFile) {
        const uploaded = await uploadToCloudinary(avatarFile);
        profileImageUrl = uploaded.secure_url;
      }

      const body = {
        name: form.name,
        age: Number(form.age || 0),
        gender: form.gender,
        sport: form.sport,
        state: form.state,
        profileImage: profileImageUrl,
      };

      const res = await fetch(`/api/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      setProfile(data.profile);
      setEditing(false);
      setAvatarFile(null);
      setUploadProgress(0);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Save error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center p-6 rounded-lg shadow space-y-3 mb-6">
        <img
          src={form.profileImage || user?.imageUrl || "/defaultImg.png"}
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-center">
          {form.name || user?.name || "Athlete"}
        </h2>
        <div className="text-gray-600 text-sm text-center">
          Rank: <strong>{overall.badge}</strong> • Benchmark:{" "}
          <strong>{overall.score}</strong>
        </div>
        <div className="text-xs text-gray-500 text-center space-y-1">
          <div>Total tests: <strong>{results.length}</strong></div>
          <div>Best score: <strong>{bestScore}</strong></div>
          <div>
            Last test:{" "}
            <strong>{lastTest ? lastTest.toLocaleString() : "—"}</strong>
          </div>
        </div>
        <div>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={saveProfile}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setAvatarFile(null);
                }}
                className="px-4 py-2 bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Editable Form */}
      {editing && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Performance Over Time</h3>
          {growthSeries.length ? (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart
                  data={growthSeries}
                  margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="dateIso"
                    tickFormatter={(iso) => new Date(iso).toLocaleDateString()}
                  />
                  <YAxis domain={yDomain} allowDecimals={false} />
                  <Tooltip
                    formatter={(value: any) => [`${value}`, "Score"]}
                    labelFormatter={(label: any) =>
                      new Date(label).toLocaleString()
                    }
                  />
                  <ReferenceLine
                    y={overall.score}
                    stroke="#4caf50"
                    strokeDasharray="3 3"
                    label={{
                      value: `Avg ${overall.score}`,
                      position: "right",
                      fill: "#4caf50",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-sm text-gray-500">No results yet</div>
          )}
        </div>

        {/* Distribution Chart */}
        <div className="p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Test Distribution</h3>
          {distribution.length ? (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={distribution}
                    outerRadius={90}
                    innerRadius={40}
                    label={({ name, value, percent }) =>
                      `${name}: ${value} (${Math.round((percent ?? 0) * 100)}%)`
                    }
                  >
                    {distribution.map((entry: any, idx: number) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={COLORS[idx % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any) => [value, name]}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-sm text-gray-500">No data</div>
          )}
        </div>
      </div>

      {/* Recent Results */}
      <div className="mt-6 p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Recent Results</h3>
        {results.length ? (
          results.map((r) => (
            <details
              key={r._id}
              className="mb-2 border rounded p-3 cursor-pointer group"
            >
              <summary className="flex justify-between items-center font-medium">
                {r.exercise} – Score: {r.score}
                <span className="text-sm text-gray-500 group-open:hidden">
                  Tap to expand
                </span>
              </summary>
              <div className="mt-2 text-sm text-gray-600">
                Date: {new Date(r.createdAt).toLocaleString()}
              </div>
              {typeof r.reps !== "undefined" && (
                <div className="text-sm">Reps: <strong>{r.reps}</strong></div>
              )}
              {typeof r.jumpHeightCm !== "undefined" && (
                <div className="text-sm">
                  Jump: <strong>{r.jumpHeightCm} cm</strong>
                </div>
              )}
              {r.videoUrl && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={r.videoUrl}
                  className="text-sm text-blue-600"
                >
                  View video
                </a>
              )}
            </details>
          ))
        ) : (
          <div className="text-sm text-gray-500">No results.</div>
        )}
      </div>
    </div>
  );
}
