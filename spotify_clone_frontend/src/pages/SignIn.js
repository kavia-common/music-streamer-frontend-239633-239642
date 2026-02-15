import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";

// PUBLIC_INTERFACE
export default function SignIn() {
  /** Mock Sign In page (frontend-only). */
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = useMemo(() => {
    return (email ?? "").trim().includes("@") && (password ?? "").length >= 6;
  }, [email, password]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Mock only: in a real app you'd call your auth provider here.
    navigate("/");
  };

  return (
    <div className="py-6 sm:py-10">
      <AuthShell
        title="Sign in"
        subtitle="This is a mock auth screen (no backend connected)."
        footer={
          <>
            Don’t have an account?{" "}
            <Link to="/signup" className="font-semibold text-white/80 hover:text-white">
              Sign up
            </Link>
          </>
        }
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-white/70">
              Email
            </label>
            <input
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-spotify-green/70"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-white/70">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="mt-2 w-full rounded-xl bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-spotify-green/70"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-bold text-black transition hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100"
          >
            Continue
          </button>

          <div className="text-center text-xs text-white/50">
            Tip: any email + any password ≥ 6 chars works (mock).
          </div>
        </form>
      </AuthShell>
    </div>
  );
}
