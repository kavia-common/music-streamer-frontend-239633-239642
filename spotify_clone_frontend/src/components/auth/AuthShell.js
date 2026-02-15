import React from "react";
import { Link } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";

// PUBLIC_INTERFACE
export default function AuthShell({ title, subtitle, children, footer }) {
  /** Layout wrapper for mock auth pages, matching the app dark theme. */
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-white/10 bg-spotify-black p-6 sm:p-7 shadow-xl ring-1 ring-white/5">
        <div className="flex items-center justify-center gap-2">
          <FaSpotify className="h-7 w-7 text-spotify-green" />
          <span className="text-sm font-bold tracking-wide text-white">
            Spotify Clone
          </span>
        </div>

        <h1 className="mt-6 text-center text-2xl font-extrabold text-white">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-center text-sm text-white/60">{subtitle}</p>
        ) : null}

        <div className="mt-6">{children}</div>

        {footer ? (
          <div className="mt-6 border-t border-white/10 pt-4 text-center text-sm text-white/60">
            {footer}
          </div>
        ) : (
          <div className="mt-6 border-t border-white/10 pt-4 text-center text-sm text-white/60">
            <Link
              to="/"
              className="font-semibold text-white/80 hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
