// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Auth Context
 * - stores minimal user object in memory (not token)
 * - login/register call API endpoints which set HttpOnly cookie (server sets)
 * - refreshUser() reads /api/auth/me to populate user on reload
 *
 * IMPORTANT: keep token server-side only (HttpOnly cookie). Do NOT store JWT in localStorage.
 */

type User = {
  _id: string;
  name?: string;
  email?: string;
  username?: string;
  // any other public fields you want available client-side
};

type AuthContextValue = {
  user: User | null;
  loading: boolean; // initial load of current user
  authProcessing: boolean; // in-flight login/register/logout
  isAuthenticated: boolean;
  refreshUser: () => Promise<User | null>;
  login: (payload: { emailOrUsername: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  register: (payload: { name: string; username: string; email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // initial fetch of current user
  const [authProcessing, setAuthProcessing] = useState(false);
  const router = useRouter();

  // fetch current user from server (reads cookie)
  const refreshUser = async (): Promise<User | null> => {
    try {
      setLoading(true);
      const resp = await fetch("/api/auth/me", { method: "GET", credentials: "include" });
      const data = await resp.json();
      if (!resp.ok) {
        setUser(null);
        return null;
      }
      setUser(data.user || null);
      return data.user || null;
    } catch (err) {
      console.error("refreshUser error:", err);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial mount: try to get user
    refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (payload: { emailOrUsername: string; password: string }) => {
    setAuthProcessing(true);
    try {
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include", // important so cookie set/returned is handled
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await resp.json();
      if (!resp.ok) {
        return { success: false, error: data.error || "Login failed" };
      }
      // server sets HttpOnly cookie; now fetch user
      await refreshUser();
      return { success: true };
    } catch (err: any) {
      console.error("login error", err);
      return { success: false, error: err?.message || "Network error" };
    } finally {
      setAuthProcessing(false);
    }
  };

  const register = async (payload: { name: string; username: string; email: string; password: string }) => {
    setAuthProcessing(true);
    try {
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await resp.json();
      if (!resp.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }
      // server sets cookie; populate user
      await refreshUser();
      return { success: true };
    } catch (err: any) {
      console.error("register error", err);
      return { success: false, error: err?.message || "Network error" };
    } finally {
      setAuthProcessing(false);
    }
  };

  const logout = async () => {
    setAuthProcessing(true);
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      setUser(null);
      // optionally redirect to login page
      router.push("/auth/login");
    } catch (err) {
      console.error("logout error", err);
    } finally {
      setAuthProcessing(false);
    }
  };

  const value: AuthContextValue = {
    user,
    loading,
    authProcessing,
    isAuthenticated: !!user,
    refreshUser,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
