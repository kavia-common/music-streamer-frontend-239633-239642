import React, { useMemo } from "react";
import { FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";
import IconButton from "../ui/IconButton";
import { usePlayer } from "../../context/PlayerContext";

function formatDuration(ms) {
  const total = Math.floor((ms ?? 0) / 1000);
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// PUBLIC_INTERFACE
export default function TrackRow({ track, queue, index }) {
  /** A single row in a track list with play + like actions. */
  const { state, playQueueAt, toggleLike } = usePlayer();

  const isCurrent = state.currentTrack?.id === track.id;
  const liked = useMemo(() => state.likedTrackIds.has(track.id), [state.likedTrackIds, track.id]);

  return (
    <div
      className={[
        "grid grid-cols-[28px_1fr_90px] items-center gap-3 rounded-md px-2 py-2",
        "hover:bg-black/5 dark:hover:bg-white/5 transition",
        isCurrent ? "bg-black/5 dark:bg-white/8" : ""
      ].join(" ")}
    >
      <div className="flex items-center justify-center">
        <IconButton
          label={isCurrent ? "Playing" : "Play"}
          className="p-1"
          onClick={() => playQueueAt(queue ?? [track], index ?? 0)}
        >
          <FaPlay className="h-3.5 w-3.5" />
        </IconButton>
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="truncate font-medium text-black dark:text-white">
            {track.title}
          </div>
          {track.explicit ? (
            <span className="rounded bg-black/10 px-1.5 py-0.5 text-[10px] font-semibold text-black/70 dark:bg-white/20 dark:text-white/80">
              E
            </span>
          ) : null}
        </div>
        <div className="truncate text-sm text-black/60 dark:text-white/60">
          {track.artist} • {track.album}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 text-sm text-black/60 dark:text-white/60">
        <IconButton
          label={liked ? "Unlike" : "Like"}
          className="p-1"
          onClick={() => toggleLike(track.id)}
        >
          {liked ? <FaHeart className="h-3.5 w-3.5 text-spotify-green" /> : <FaRegHeart className="h-3.5 w-3.5" />}
        </IconButton>
        <div className="w-10 text-right tabular-nums">{formatDuration(track.durationMs)}</div>
      </div>
    </div>
  );
}
