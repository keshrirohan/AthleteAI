// app/auth/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, authProcessing, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ emailOrUsername: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  // If user is already authenticated, navigate away (client-side)
  if (isAuthenticated) {
    // small guard to avoid routing during render — prefer a micro-task
    if (typeof window !== "undefined") {
      router.replace("/profile"); // or route to "/" or profile with id
    }
    return <div className="p-6">Redirecting…</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.emailOrUsername || !form.password) {
      setError("Please enter username/email and password.");
      return;
    }

    const res = await login({
      emailOrUsername: form.emailOrUsername.trim(),
      password: form.password,
    });

    if (!res.success) {
      setError(res.error || "Login failed");
      return;
    }

    // successful login — refreshUser is already called inside login; redirect
    router.replace("/profile"); // or router.replace(`/profile/${userId}`) if you want specific page
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full border rounded p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>

        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={form.emailOrUsername}
            onChange={(e) =>
              setForm({ ...form, emailOrUsername: e.target.value })
            }
            placeholder="Email or username"
            className="w-full p-2 border rounded"
            autoComplete="username"
          />

          <input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            type="password"
            className="w-full p-2 border rounded"
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={authProcessing}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
            >
              {authProcessing ? "Signing in…" : "Sign in"}
            </button>

            <a className="text-sm text-blue-600" href="/auth/signup">
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
