import React from "react";
import { Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import { useUISettings } from "../context/UISettingsContext";

// PUBLIC_INTERFACE
export default function Settings() {
  /** Settings page: controls UI preferences such as auth layout mode. */
  const { settings, setAuthLayoutMode } = useUISettings();

  const isFullscreen = settings.authLayoutMode === "fullscreen";

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-white/80">
            <FaCog className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Settings
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-extrabold text-white">Preferences</h1>
          <p className="mt-1 text-sm text-white/60">
            Customize how authentication screens are presented.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex flex-none items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70"
        >
          Done
        </Link>
      </header>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/5">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white">
              Auth screen layout
            </div>
            <div className="mt-1 text-sm text-white/60">
              Choose whether <span className="font-semibold text-white/80">Sign in</span>{" "}
              and <span className="font-semibold text-white/80">Sign up</span> render as
              full-screen pages (no app chrome) or inside the app layout.
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <label className="inline-flex items-center gap-2">
              <span className="text-xs font-semibold text-white/70">
                Full-screen
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isFullscreen}
                onClick={() =>
                  setAuthLayoutMode(isFullscreen ? "inapp" : "fullscreen")
                }
                className={[
                  "relative inline-flex h-7 w-12 items-center rounded-full transition",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70",
                  isFullscreen ? "bg-spotify-green" : "bg-white/20"
                ].join(" ")}
                title="Toggle auth screen layout"
              >
                <span
                  className={[
                    "inline-block h-5 w-5 transform rounded-full bg-black transition",
                    isFullscreen ? "translate-x-6" : "translate-x-1"
                  ].join(" ")}
                />
              </button>
            </label>

            <div className="text-xs text-white/50 text-right">
              Current:{" "}
              <span className="text-white/70">
                {isFullscreen ? "Full-screen auth routes" : "In-app auth routes"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/5">
        <div className="text-sm font-semibold text-white">Quick links</div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to="/signin"
            className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70"
          >
            Go to Sign in
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70"
          >
            Go to Sign up
          </Link>
        </div>
      </section>
    </div>
  );
}
