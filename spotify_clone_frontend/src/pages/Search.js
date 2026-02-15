import React, { useEffect, useMemo, useState } from "react";
import PlaylistCard from "../components/cards/PlaylistCard";
import TrackRow from "../components/list/TrackRow";
import { searchCatalog } from "../services/catalogService";

// PUBLIC_INTERFACE
export default function Search() {
  /** Search page: searches mock catalog and renders tracks/playlists. */
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ tracks: [], playlists: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const t = setTimeout(async () => {
      setLoading(true);
      const r = await searchCatalog(query);
      if (!mounted) return;
      setResults(r);
      setLoading(false);
    }, 200);

    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, [query]);

  const queue = useMemo(() => results.tracks ?? [], [results.tracks]);

  return (
    <div className="space-y-8">
      <section>
        <div className="max-w-2xl">
          <label className="text-sm font-semibold text-black/70 dark:text-white/70" htmlFor="searchInput">
            Search
          </label>
          <input
            id="searchInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="mt-2 w-full rounded-full bg-black/5 px-4 py-3 text-black placeholder:text-black/40 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-spotify-green/70 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40 dark:ring-white/10"
          />
          <div className="mt-2 text-xs text-black/50 dark:text-white/50">
            {loading ? "Searching..." : "Tip: try “mix”, “chill”, “city”, “moon”"}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold">Songs</h3>
        <div className="mt-3 space-y-1">
          {(results.tracks ?? []).length ? (
            results.tracks.map((t, idx) => (
              <TrackRow key={t.id} track={t} queue={queue} index={idx} />
            ))
          ) : (
            <div className="rounded-lg border border-black/5 bg-white p-4 text-sm text-black/60 shadow-sm dark:border-white/5 dark:bg-white/5 dark:text-white/60 dark:shadow-none">
              No songs found.
            </div>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold">Playlists</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {(results.playlists ?? []).length ? (
            results.playlists.map((p) => <PlaylistCard key={p.id} playlist={p} />)
          ) : (
            <div className="col-span-full rounded-lg border border-black/5 bg-white p-4 text-sm text-black/60 shadow-sm dark:border-white/5 dark:bg-white/5 dark:text-white/60 dark:shadow-none">
              No playlists found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
