"use client"

import { FormEvent, useState } from "react";
import api from "../../services/api";
import Link from "next/link";

export default function Register() {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: FormEvent) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);

    //   const response = await api.post(
    //     "/auth/register",
    //     {
    //       name,
    //       email,
    //       phone,
    //       password,
    //     }
    //   );

    //   setSuccess(
    //     `Registration successful. Your Staff ID is ${response.data.staff_id}. Your account is waiting for manager verification.`
    //   );

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

    } catch (error: any) {

      setError(
        error.response?.data?.error ||
        "Registration failed."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen bg-slate-50">

      <div className="grid min-h-screen lg:grid-cols-2">


        {/* BRAND */}

        <div className="hidden lg:flex bg-red-600 p-12 text-white">

          <div className="m-auto max-w-lg">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl font-bold text-red-600">
                F
              </div>

              <span className="text-3xl font-bold">
                FraudLens
              </span>

            </div>

            <h1 className="mt-10 text-5xl font-bold leading-tight">
              Join the
              <br />
              FraudLens team.
            </h1>

            <p className="mt-6 text-lg leading-8 text-red-100">
              Create your staff account and start
              securely verifying insurance customers.
            </p>

          </div>

        </div>


        {/* REGISTER */}

        <div className="flex items-center justify-center px-5 py-10 sm:px-8">

          <div className="w-full max-w-md">


            {/* MOBILE BRAND */}

            <div className="mb-8 text-center lg:hidden">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-2xl font-bold text-white">
                F
              </div>

              <h1 className="mt-3 text-2xl font-bold">
                FraudLens
              </h1>

            </div>


            <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200 sm:p-8">

              <h2 className="text-2xl font-bold text-slate-900">
                Create staff account
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Your account must be verified by a manager.
              </p>


              {/* ERROR */}

              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}


              {/* SUCCESS */}

              {success && (
                <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}


              <form
                onSubmit={handleRegister}
                className="mt-6 space-y-4"
              >

                {/* NAME */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />

                </div>


                {/* PHONE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="+94 7X XXX XXXX"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />

                </div>


                {/* PASSWORD */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Minimum 8 characters"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />

                </div>


                {/* CONFIRM */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Confirm password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Repeat your password"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />

                </div>


                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-red-600 py-3.5 font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:opacity-60"
                >
                  {loading
                    ? "Creating account..."
                    : "Create Staff Account"}
                </button>

              </form>


              <div className="mt-6 border-t border-slate-200 pt-6 text-center">

                <p className="text-sm text-slate-500">

                  Already have an account?

                  <Link
                    href="/"
                    className="ml-1 font-semibold text-red-600 hover:text-red-700"
                  >
                    Sign in
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}