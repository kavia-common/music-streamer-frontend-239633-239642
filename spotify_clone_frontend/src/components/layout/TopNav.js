import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaUserCircle } from "react-icons/fa";
import IconButton from "../ui/IconButton";
import UserModal from "./UserModal";

// PUBLIC_INTERFACE
export default function TopNav() {
  /** Sticky top nav for the main content area. */
  const navigate = useNavigate();
  const location = useLocation();
  const [userModalOpen, setUserModalOpen] = useState(false);

  const title = (() => {
    if (location.pathname === "/") return "Home";
    if (location.pathname.startsWith("/search")) return "Search";
    if (location.pathname.startsWith("/library")) return "Your Library";
    if (location.pathname.startsWith("/playlist/")) return "Playlist";
    return "Browse";
  })();

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-black/5 bg-white/80 px-4 py-3 backdrop-blur dark:border-white/5 dark:bg-gradient-to-b dark:from-black/70 dark:to-black/10">
      <div className="flex items-center gap-2">
        <IconButton label="Back" onClick={() => navigate(-1)}>
          <FaChevronLeft className="h-4 w-4" />
        </IconButton>
        <IconButton label="Forward" onClick={() => navigate(1)}>
          <FaChevronRight className="h-4 w-4" />
        </IconButton>
        <div className="ml-2 text-lg font-bold text-black dark:text-white">{title}</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setUserModalOpen(true)}
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5 text-sm font-semibold text-black/90 hover:bg-black/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70 dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/15"
          aria-label="Open account menu"
          title="Account"
        >
          <FaUserCircle className="h-4 w-4" />
          Demo User
        </button>
      </div>

      <UserModal open={userModalOpen} onClose={() => setUserModalOpen(false)} />
    </div>
  );
}
