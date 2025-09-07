"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/common/NavBar";
import { getUserFromToken} from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  if (await getUserFromToken()) {
    redirect("/");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        toast.success("Login Successful", {
          description: "You have been logged in successfully.",
        });
      } else {
        toast.error("Login Failed", {
          description: "Invalid credentials. Please try again.",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong. Try again later.",
      });
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-lg shadow-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-white">
            Login
          </CardTitle>
          <p className="text-center text-slate-400 text-sm mt-1">
            Please Login in to continue
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 text-white border-slate-700 h-12 text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800 text-white border-slate-700 h-12 text-base"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer"
            >
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-slate-400 text-sm">
            Don’t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-500 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
    </>
  );
}
