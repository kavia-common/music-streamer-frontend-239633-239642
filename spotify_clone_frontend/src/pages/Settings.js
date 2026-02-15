import React from "react";
import { Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import { useUISettings } from "../context/UISettingsContext";

// PUBLIC_INTERFACE
export default function Settings() {
  /** Settings page: controls UI preferences such as theme (light/dark). */
  const { settings, setTheme } = useUISettings();

  const isDark = settings.theme === "dark";

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-black/70 dark:text-white/80">
            <FaCog className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Settings
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-extrabold text-black dark:text-white">
            Preferences
          </h1>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            Customize the appearance of the app.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex flex-none items-center justify-center rounded-full bg-black/10 px-4 py-2 text-sm font-semibold text-black hover:bg-black/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70 dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/15"
        >
          Done
        </Link>
      </header>

      <section className="rounded-2xl border border-black/10 bg-black/[0.03] p-5 ring-1 ring-black/5 dark:border-white/10 dark:bg-white/5 dark:ring-white/5">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-black dark:text-white">
              Theme
            </div>
            <div className="mt-1 text-sm text-black/60 dark:text-white/60">
              Switch between <span className="font-semibold text-black/80 dark:text-white/80">light</span>{" "}
              and <span className="font-semibold text-black/80 dark:text-white/80">dark</span>{" "}
              mode. This setting is saved to your device.
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <label className="inline-flex items-center gap-2">
              <span className="text-xs font-semibold text-black/70 dark:text-white/70">
                Dark
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isDark}
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={[
                  "relative inline-flex h-7 w-12 items-center rounded-full transition",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70",
                  isDark ? "bg-spotify-green" : "bg-black/15 dark:bg-white/20"
                ].join(" ")}
                title="Toggle theme"
              >
                <span
                  className={[
                    "inline-block h-5 w-5 transform rounded-full transition",
                    isDark ? "translate-x-6 bg-black" : "translate-x-1 bg-white dark:bg-black"
                  ].join(" ")}
                />
              </button>
            </label>

            <div className="text-xs text-black/50 dark:text-white/50 text-right">
              Current:{" "}
              <span className="text-black/70 dark:text-white/70">
                {isDark ? "Dark" : "Light"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-black/10 bg-black/[0.03] p-5 ring-1 ring-black/5 dark:border-white/10 dark:bg-white/5 dark:ring-white/5">
        <div className="text-sm font-semibold text-black dark:text-white">
          Quick links
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to="/signin"
            className="inline-flex items-center justify-center rounded-full bg-black/10 px-4 py-2 text-sm font-semibold text-black hover:bg-black/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70 dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/15"
          >
            Go to Sign in
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-full bg-black/10 px-4 py-2 text-sm font-semibold text-black hover:bg-black/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70 dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/15"
          >
            Go to Sign up
          </Link>
        </div>
      </section>
    </div>
  );
}
