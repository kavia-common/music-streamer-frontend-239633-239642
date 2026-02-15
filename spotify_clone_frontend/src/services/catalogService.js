import { mockPlaylists, mockTracks, mockFeatured } from "../data/mockCatalog";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * In a real project this module would call:
 * - REST: `${process.env.REACT_APP_API_BASE}/...`
 * - or GraphQL, etc.
 *
 * Keeping a service layer makes backend swap easy later.
 */

// PUBLIC_INTERFACE
export async function getFeaturedSections() {
  /** Fetch curated sections for the Home page. */
  await wait(150);
  return mockFeatured;
}

// PUBLIC_INTERFACE
export async function getPlaylists() {
  /** Fetch user's playlists (mock). */
  await wait(120);
  return mockPlaylists;
}

// PUBLIC_INTERFACE
export async function getPlaylistById(playlistId) {
  /** Fetch a playlist with its tracks by id (mock). */
  await wait(150);
  const playlist = mockPlaylists.find((p) => p.id === playlistId);
  if (!playlist) return null;
  const tracks = playlist.trackIds
    .map((id) => mockTracks.find((t) => t.id === id))
    .filter(Boolean);
  return { ...playlist, tracks };
}

// PUBLIC_INTERFACE
export async function searchCatalog(query) {
  /** Simple in-memory search over tracks and playlists (mock). */
  await wait(150);
  const q = (query ?? "").trim().toLowerCase();
  if (!q) return { tracks: [], playlists: [] };

  const tracks = mockTracks.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      t.album.toLowerCase().includes(q)
  );

  const playlists = mockPlaylists.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.description ?? "").toLowerCase().includes(q)
  );

  return { tracks, playlists };
}
