"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import api from "../services/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("fraudlens_token", response.data.token);

      localStorage.setItem(
        "fraudlens_user",
        JSON.stringify(response.data.user),
      );

      const role = response.data.user.role;

if (role === "MANAGER") {
  router.push("/manager/dashboard");
} else if (role === "STAFF") {
  router.push("/staff/dashboard");
} else {
  router.push("/dashboard");
}
    } catch (error: any) {
      setError(
  error.response?.data?.error ||
  error.response?.data?.message ||
  "Unable to login. Please try again.",
);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT BRANDING */}

        <div className="hidden lg:flex bg-red-600 p-12 text-white">
          <div className="m-auto max-w-lg">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl font-bold text-red-600">
                F
              </div>

              <span className="text-3xl font-bold">FraudLens</span>
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Insurance Fraud
              <br />
              Intelligence
            </h1>

            <p className="mt-6 text-lg leading-8 text-red-100">
              Securely verify customers, investigate suspicious records and
              protect your insurance operations.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                  ✓
                </div>

                <span>Customer verification</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                  ✓
                </div>

                <span>Fraud detection</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                  ✓
                </div>

                <span>Secure staff management</span>
              </div>
            </div>
          </div>
        </div>

        {/* LOGIN */}

        <div className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* MOBILE LOGO */}

            <div className="mb-10 text-center lg:hidden">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-2xl font-bold text-white">
                F
              </div>

              <h1 className="mt-3 text-2xl font-bold text-slate-900">
                FraudLens
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Insurance Fraud Intelligence
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200 sm:p-8">
              <h2 className="text-2xl font-bold text-red-600 mb-8">Login</h2>

              {/* ERROR */}

              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                {/* EMAIL */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />
                </div>

                {/* PASSWORD */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-semibold text-slate-700">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />
                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-red-600 py-3.5 font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              {/* REGISTER */}

              <div className="mt-7 border-t border-slate-200 pt-6 text-center">
                <p className="text-sm text-slate-500">
                  Don't have an account?
                  <Link
                    href="/register"
                    className="ml-1 font-semibold text-red-600 hover:text-red-700"
                  >
                    Register as staff
                  </Link>
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              FraudLens © 2026. Secure insurance verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
