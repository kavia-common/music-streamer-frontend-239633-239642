import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function NotFound() {
  /** Fallback route when no match is found. */
  return (
    <div className="rounded-xl bg-white/5 p-8">
      <h1 className="text-2xl font-bold text-white">Page not found</h1>
      <p className="mt-2 text-sm text-white/60">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:scale-[1.02]"
      >
        Go Home
      </Link>
    </div>
  );
}
