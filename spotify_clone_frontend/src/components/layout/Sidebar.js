import React from "react";
import { NavLink } from "react-router-dom";
import { FaSpotify, FaHome, FaSearch, FaBook } from "react-icons/fa";

// PUBLIC_INTERFACE
export default function Sidebar({ playlists }) {
  /** Left sidebar navigation with primary routes and playlist shortcuts. */
  const linkClass = ({ isActive }) =>
    [
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition",
      isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
    ].join(" ");

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:gap-2 md:p-3">
      <div className="rounded-xl bg-spotify-black p-3">
        <div className="flex items-center gap-2 px-2 py-2">
          <FaSpotify className="h-6 w-6 text-spotify-green" />
          <div className="text-sm font-bold tracking-wide text-white">Spotify Clone</div>
        </div>

        <nav className="mt-2 space-y-1">
          <NavLink to="/" className={linkClass}>
            <FaHome className="h-4 w-4" />
            Home
          </NavLink>
          <NavLink to="/search" className={linkClass}>
            <FaSearch className="h-4 w-4" />
            Search
          </NavLink>
          <NavLink to="/library" className={linkClass}>
            <FaBook className="h-4 w-4" />
            Your Library
          </NavLink>
        </nav>
      </div>

      <div className="flex-1 overflow-hidden rounded-xl bg-spotify-black p-3">
        <div className="px-2 pb-2 text-xs font-bold uppercase tracking-wider text-white/60">
          Playlists
        </div>
        <div className="h-full overflow-auto pr-1">
          <div className="space-y-1 pb-12">
            {(playlists ?? []).map((p) => (
              <NavLink
                key={p.id}
                to={`/playlist/${p.id}`}
                className={({ isActive }) =>
                  [
                    "block truncate rounded-md px-3 py-2 text-sm transition",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  ].join(" ")
                }
                title={p.name}
              >
                {p.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
