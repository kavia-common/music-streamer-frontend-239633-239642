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
      className="group w-full rounded-lg bg-white/5 p-4 text-left transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70"
    >
      <div
        className="mb-3 aspect-square w-full rounded-md"
        style={{
          background: `linear-gradient(135deg, ${playlist.coverColor} 0%, rgba(0,0,0,0.35) 100%)`
        }}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate font-semibold text-white">{playlist.name}</div>
          <div className="mt-1 line-clamp-2 text-sm text-white/60">
            {playlist.description}
          </div>
        </div>
        <div className="mt-0.5 opacity-0 transition group-hover:opacity-100 text-xs text-white/70">
          Open
        </div>
      </div>
    </button>
  );
}
