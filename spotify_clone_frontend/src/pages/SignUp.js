import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";

// PUBLIC_INTERFACE
export default function SignUp() {
  /** Mock Sign Up page (frontend-only). */
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const canSubmit = useMemo(() => {
    const eOk = (email ?? "").trim().includes("@");
    const pOk = (password ?? "").length >= 6;
    const cOk = password === confirm && confirm.length > 0;
    return eOk && pOk && cOk;
  }, [email, password, confirm]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Mock only: in a real app you'd create the user here.
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <AuthShell
        title="Sign up"
        subtitle="Create an account (mock UI only)."
        footer={
          <>
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-white/80 hover:text-white"
            >
              Sign in
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
            <label
              htmlFor="password"
              className="text-sm font-semibold text-white/70"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="mt-2 w-full rounded-xl bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-spotify-green/70"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="text-sm font-semibold text-white/70">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter password"
              className="mt-2 w-full rounded-xl bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-spotify-green/70"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-spotify-green px-4 py-3 text-sm font-bold text-black transition hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100"
          >
            Create account
          </button>

          <div className="text-center text-xs text-white/50">
            Tip: email must include “@”, password ≥ 6 chars, and both passwords must match (mock).
          </div>
        </form>
      </AuthShell>
    </div>
  );
}
