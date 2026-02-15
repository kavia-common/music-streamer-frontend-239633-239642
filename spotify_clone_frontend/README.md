# Spotify Clone Frontend (React-only)

A production-style, frontend-only Spotify-like UI built with:
- React 18 (CRA)
- React Router
- Tailwind CSS
- Context API state management (playback/queue/likes)
- Mock data + service layer (async) to simulate backend calls

## Layout & UX
- Left Sidebar (desktop) for navigation + playlists
- Sticky TopNav inside main content
- Main content routes: Home, Search, Library, Playlist
- Bottom Player pinned to the viewport bottom

## Folder structure (high level)
- `src/components/`
  - `layout/` (Sidebar, TopNav, AppLayout)
  - `player/` (BottomPlayer)
  - `cards/` (PlaylistCard)
  - `list/` (TrackRow)
  - `ui/` (IconButton)
- `src/pages/` route pages
- `src/context/` Context API providers (PlayerProvider)
- `src/data/` mock data
- `src/services/` “API-like” service layer (mock async)

## State flow (PlayerContext)
Single source of truth for:
- `currentTrack`, `isPlaying`
- `queue`, `queueIndex`
- `likedTrackIds`
- `volume`, `shuffle`, `repeatMode`

UI events (play, next, like, etc.) dispatch reducer actions. No backend required.

## Setup
```bash
npm install
npm start
```

## Tailwind
Already wired via:
- `tailwind.config.js`
- `postcss.config.js`
- `src/index.css` includes Tailwind layers

## Backend integration suggestions (future)
Keep the UI unchanged and swap the mock service layer with real network calls:
- Replace `src/services/catalogService.js` functions with `fetch`/axios calls to your backend.
- Use env vars:
  - `REACT_APP_API_BASE` / `REACT_APP_BACKEND_URL` for REST base URL
  - `REACT_APP_WS_URL` if you later add real-time events (e.g., collaborative sessions)

Recommended next steps:
- Add auth (OAuth / Supabase / custom backend)
- Persist likes/playlists with a database
- Real audio playback via `<audio>` element + streaming URLs
- Improve mobile with a collapsible sidebar and bottom-sheet queue
