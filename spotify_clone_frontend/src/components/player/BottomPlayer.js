import React, { useMemo } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaRandom,
  FaRedo,
  FaVolumeUp
} from "react-icons/fa";
import IconButton from "../ui/IconButton";
import { usePlayer } from "../../context/PlayerContext";

function nextRepeat(mode) {
  if (mode === "off") return "all";
  if (mode === "all") return "one";
  return "off";
}

function repeatLabel(mode) {
  if (mode === "off") return "Repeat off";
  if (mode === "all") return "Repeat all";
  return "Repeat one";
}

// PUBLIC_INTERFACE
export default function BottomPlayer() {
  /** Pinned bottom player. Uses PlayerContext to reflect current state. */
  const { state, togglePlay, next, prev, setVolume, toggleShuffle, setRepeatMode } = usePlayer();

  const repeatText = useMemo(() => repeatLabel(state.repeatMode), [state.repeatMode]);

  const track = state.currentTrack;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-black/10 bg-white shadow-top dark:border-white/10 dark:bg-spotify-dark">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] items-center gap-4 px-4 py-3">
        {/* Now playing */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-12 w-12 flex-none rounded-md"
            style={{
              background: `linear-gradient(135deg, ${track?.coverColor ?? "#2a2a2a"} 0%, rgba(0,0,0,0.35) 100%)`
            }}
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-black dark:text-white">
              {track ? track.title : "Select a track"}
            </div>
            <div className="truncate text-xs text-black/60 dark:text-white/60">
              {track ? track.artist : "Your queue will appear here"}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <IconButton
              label={state.shuffle ? "Shuffle on" : "Shuffle off"}
              className={state.shuffle ? "text-spotify-green" : ""}
              onClick={toggleShuffle}
              disabled={!state.queue.length}
            >
              <FaRandom className="h-4 w-4" />
            </IconButton>

            <IconButton label="Previous" onClick={prev} disabled={!state.queue.length}>
              <FaStepBackward className="h-4 w-4" />
            </IconButton>

            <button
              type="button"
              onClick={togglePlay}
              disabled={!track}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-[1.03] disabled:opacity-40"
              aria-label={state.isPlaying ? "Pause" : "Play"}
              title={state.isPlaying ? "Pause" : "Play"}
            >
              {state.isPlaying ? <FaPause className="h-4 w-4" /> : <FaPlay className="h-4 w-4 ml-0.5" />}
            </button>

            <IconButton label="Next" onClick={next} disabled={!state.queue.length}>
              <FaStepForward className="h-4 w-4" />
            </IconButton>

            <IconButton
              label={repeatText}
              className={state.repeatMode !== "off" ? "text-spotify-green" : ""}
              onClick={() => setRepeatMode(nextRepeat(state.repeatMode))}
              disabled={!state.queue.length}
            >
              <FaRedo className="h-4 w-4" />
            </IconButton>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
            {state.queue.length ? (
              <span className="tabular-nums">
                Queue: {Math.max(state.queueIndex + 1, 0)}/{state.queue.length}
              </span>
            ) : (
              <span>Queue empty</span>
            )}
          </div>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center justify-end gap-3">
          <FaVolumeUp className="h-4 w-4 text-black/70 dark:text-white/70" />
          <input
            aria-label="Volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={state.volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-40 accent-spotify-green"
          />
        </div>
      </div>
    </div>
  );
}
