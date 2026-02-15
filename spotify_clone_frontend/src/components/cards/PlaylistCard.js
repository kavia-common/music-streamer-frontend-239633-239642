import React from "react";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
export default function PlaylistCard({ playlist }) {
  /** Small Spotify-like playlist card with hover affordance. */
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/playlist/${playlist.id}`)}
      className="group w-full rounded-lg border border-black/5 bg-white p-4 text-left shadow-sm transition hover:bg-black/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70 dark:border-white/5 dark:bg-white/5 dark:shadow-none dark:hover:bg-white/10"
    >
      <div
        className="mb-3 aspect-square w-full rounded-md"
        style={{
          background: `linear-gradient(135deg, ${playlist.coverColor} 0%, rgba(0,0,0,0.35) 100%)`
        }}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate font-semibold text-black dark:text-white">
            {playlist.name}
          </div>
          <div className="mt-1 line-clamp-2 text-sm text-black/60 dark:text-white/60">
            {playlist.description}
          </div>
        </div>
        <div className="mt-0.5 text-xs text-black/50 opacity-0 transition group-hover:opacity-100 dark:text-white/70">
          Open
        </div>
      </div>
    </button>
  );
}
