"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/common/NavBar";
import { redirectIfAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  if (await redirectIfAuth()) {
      redirect("/");
    }
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Controlled states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Handle username input
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toLowerCase();
    value = value.replace(/[^a-z0-9]/g, ""); 
    setUsername(value);

    if (/[^a-z0-9]/.test(e.target.value)) {
      setUsernameError("Only letters and numbers allowed. No spaces.");
    } else {
      setUsernameError("");
    }
  };

  // Check username availability from backend
  useEffect(() => {
    if (!username) return;

    const timeout = setTimeout(async () => {
      setCheckingUsername(true);
      try {
        const res = await fetch(`/api/check-username?username=${username}`);
        const data = await res.json();
        if (data.exists) setUsernameError("Username is already taken");
        else setUsernameError(""); // username available
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingUsername(false);
      }
    }, 500); // debounce 500ms

    return () => clearTimeout(timeout);
  }, [username]);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameError) return;

    setLoading(true);
    const payload = { name, username, email, password };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      toast.success("Account created ✅", { description: "Redirecting to home..." });
      router.push(`/${username}`);
    } catch (err: any) {
      toast.error("Signup failed ❌", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 px-4">
        <Card className="w-full max-w-md shadow-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold text-white">
              Create Account
            </CardTitle>
            <p className="text-center text-slate-400 text-sm mt-1">
              Please signup to continue
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Name</label>
                <Input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-800 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Username</label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  required
                  value={username}
                  onChange={handleUsernameChange}
                  className="bg-slate-800 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {checkingUsername && <p className="text-gray-400 text-sm mt-1">Checking username...</p>}
                {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                {!usernameError && username && !checkingUsername && (
                  <p className="text-green-500 text-sm mt-1">Username available ✅</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Email</label>
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Password</label>
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-800 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2"
                disabled={loading || !!usernameError || checkingUsername}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Creating...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            <p className="text-sm text-center text-gray-400 mt-6">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="text-blue-500 hover:text-blue-400 hover:underline font-medium transition"
              >
                Log in
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
