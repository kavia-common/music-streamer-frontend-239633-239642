/**
 * Mock catalog data for the Spotify clone (frontend-only).
 * In a real app this would come from an API (Spotify, your own backend, etc).
 */

const mkTrack = (partial) => ({
  id: partial.id,
  title: partial.title,
  artist: partial.artist,
  album: partial.album ?? "Single",
  durationMs: partial.durationMs ?? 192000,
  coverColor: partial.coverColor ?? "#2a2a2a",
  audioUrl: partial.audioUrl ?? "", // no real playback in this mock
  explicit: Boolean(partial.explicit)
});

export const mockTracks = [
  mkTrack({
    id: "t1",
    title: "Midnight Drive",
    artist: "Neon Skyline",
    album: "Night City",
    durationMs: 214000,
    coverColor: "#1f2937"
  }),
  mkTrack({
    id: "t2",
    title: "Low Tide",
    artist: "Moonwater",
    album: "Drift",
    durationMs: 186000,
    coverColor: "#0f766e"
  }),
  mkTrack({
    id: "t3",
    title: "Falling Up",
    artist: "Violet Hours",
    album: "Bloom",
    durationMs: 203000,
    coverColor: "#7c3aed",
    explicit: true
  }),
  mkTrack({
    id: "t4",
    title: "Solar Echo",
    artist: "Aurora District",
    album: "Signals",
    durationMs: 198000,
    coverColor: "#f59e0b"
  }),
  mkTrack({
    id: "t5",
    title: "Afterglow",
    artist: "City Lights",
    album: "Warmth",
    durationMs: 229000,
    coverColor: "#ef4444"
  }),
  mkTrack({
    id: "t6",
    title: "Soft Static",
    artist: "Glassfield",
    album: "FM",
    durationMs: 177000,
    coverColor: "#22c55e"
  })
];

export const mockPlaylists = [
  {
    id: "p1",
    name: "Daily Mix 1",
    description: "A mix of indie electronic, synthwave and chill pop.",
    coverColor: "#1DB954",
    trackIds: ["t1", "t2", "t6"]
  },
  {
    id: "p2",
    name: "Chill Focus",
    description: "Focus-friendly beats and clean ambience.",
    coverColor: "#3b82f6",
    trackIds: ["t2", "t4", "t6"]
  },
  {
    id: "p3",
    name: "Top Hits (Mock)",
    description: "The biggest tracks you can't stop replaying.",
    coverColor: "#f97316",
    trackIds: ["t3", "t5", "t1"]
  }
];

export const mockFeatured = [
  {
    id: "f1",
    title: "Made For You",
    subtitle: "Mixes inspired by your recent listening",
    playlistIds: ["p1", "p2"]
  },
  {
    id: "f2",
    title: "Charts",
    subtitle: "Trending now (mock charts)",
    playlistIds: ["p3"]
  }
];
