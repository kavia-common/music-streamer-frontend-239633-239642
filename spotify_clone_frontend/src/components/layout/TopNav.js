import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaUserCircle } from "react-icons/fa";
import IconButton from "../ui/IconButton";

// PUBLIC_INTERFACE
export default function TopNav() {
  /** Sticky top nav for the main content area. */
  const navigate = useNavigate();
  const location = useLocation();

  const title = (() => {
    if (location.pathname === "/") return "Home";
    if (location.pathname.startsWith("/search")) return "Search";
    if (location.pathname.startsWith("/library")) return "Your Library";
    if (location.pathname.startsWith("/playlist/")) return "Playlist";
    return "Browse";
  })();

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-3 bg-gradient-to-b from-black/70 to-black/10 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <IconButton label="Back" onClick={() => navigate(-1)}>
          <FaChevronLeft className="h-4 w-4" />
        </IconButton>
        <IconButton label="Forward" onClick={() => navigate(1)}>
          <FaChevronRight className="h-4 w-4" />
        </IconButton>
        <div className="ml-2 text-lg font-bold text-white">{title}</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/90 hover:bg-white/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70"
        >
          <FaUserCircle className="h-4 w-4" />
          Demo User
        </button>
      </div>
    </div>
  );
}
