import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import TrackRow from "../components/list/TrackRow";
import { getPlaylistById } from "../services/catalogService";
import { usePlayer } from "../context/PlayerContext";

// PUBLIC_INTERFACE
export default function Playlist() {
  /** Playlist page: playlist header + tracks with play/like controls. */
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playQueueAt } = usePlayer();

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const p = await getPlaylistById(playlistId);
      if (!mounted) return;
      setPlaylist(p);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [playlistId]);

  const queue = useMemo(() => playlist?.tracks ?? [], [playlist]);

  if (loading) {
    return (
      <div className="rounded-lg bg-white/5 p-6 text-sm text-white/60">
        Loading playlist...
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="rounded-lg bg-white/5 p-6 text-sm text-white/60">
        Playlist not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-end">
        <div
          className="h-40 w-40 flex-none rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${playlist.coverColor} 0%, rgba(0,0,0,0.35) 100%)`
          }}
        />
        <div className="min-w-0">
          <div className="text-xs font-bold uppercase tracking-wider text-white/60">
            Playlist
          </div>
          <h1 className="mt-2 truncate text-3xl font-extrabold text-white md:text-5xl">
            {playlist.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/60">
            {playlist.description}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => playQueueAt(queue, 0)}
              disabled={!queue.length}
              className="inline-flex items-center gap-2 rounded-full bg-spotify-green px-5 py-2.5 text-sm font-bold text-black transition hover:scale-[1.02] disabled:opacity-50"
            >
              <FaPlay className="h-4 w-4" />
              Play
            </button>
            <div className="text-sm text-white/60">
              {queue.length} songs
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 text-sm font-semibold text-white/70">Tracks</div>
        <div className="space-y-1">
          {queue.map((t, idx) => (
            <TrackRow key={t.id} track={t} queue={queue} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
