import React, { useEffect, useMemo, useState } from "react";
import PlaylistCard from "../components/cards/PlaylistCard";
import { getFeaturedSections, getPlaylists } from "../services/catalogService";

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page: featured sections and playlists (mock). */
  const [sections, setSections] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [s, p] = await Promise.all([getFeaturedSections(), getPlaylists()]);
      if (!mounted) return;
      setSections(s);
      setPlaylists(p);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const byId = useMemo(() => new Map(playlists.map((p) => [p.id, p])), [playlists]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold">Good afternoon</h2>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
          Frontend-only Spotify clone UI with mock data and Context API playback state.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {playlists.map((p) => (
            <button
              key={p.id}
              type="button"
              className="group flex items-center gap-3 overflow-hidden rounded-lg border border-black/5 bg-white pr-3 shadow-sm transition hover:bg-black/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70 dark:border-white/5 dark:bg-white/5 dark:shadow-none dark:hover:bg-white/10"
            >
              <div
                className="h-14 w-14 flex-none"
                style={{
                  background: `linear-gradient(135deg, ${p.coverColor} 0%, rgba(0,0,0,0.35) 100%)`
                }}
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-black dark:text-white">{p.name}</div>
                <div className="truncate text-xs text-black/60 dark:text-white/60">Playlist</div>
              </div>
              <div className="ml-auto opacity-0 transition group-hover:opacity-100 text-xs text-black/50 dark:text-white/70">
                Open
              </div>
            </button>
          ))}
        </div>
      </section>

      {sections.map((s) => (
        <section key={s.id}>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-black/60 dark:text-white/60">{s.subtitle}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {s.playlistIds
              .map((id) => byId.get(id))
              .filter(Boolean)
              .map((p) => (
                <PlaylistCard key={p.id} playlist={p} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
