import React, { useEffect, useState } from "react";
import PlaylistCard from "../components/cards/PlaylistCard";
import { getPlaylists } from "../services/catalogService";
import { usePlayer } from "../context/PlayerContext";

// PUBLIC_INTERFACE
export default function Library() {
  /** Library page: playlists + liked songs indicator (mock). */
  const [playlists, setPlaylists] = useState([]);
  const { state } = usePlayer();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const p = await getPlaylists();
      if (!mounted) return;
      setPlaylists(p);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-white/5 dark:shadow-none">
        <div className="text-sm font-semibold text-black/80 dark:text-white/80">Liked Songs</div>
        <div className="mt-1 text-2xl font-bold text-black dark:text-white">
          {state.likedTrackIds.size}
        </div>
        <div className="mt-1 text-sm text-black/60 dark:text-white/60">
          Tracks you’ve liked in this session (stored in memory).
        </div>
      </div>

      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold">Your Playlists</h2>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {playlists.map((p) => (
            <PlaylistCard key={p.id} playlist={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
