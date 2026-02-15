import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import AppRouter from "./routes/AppRouter";
import { PlayerProvider } from "./context/PlayerContext";
import { getPlaylists } from "./services/catalogService";
import "./App.css";

function AppShell({ playlists }) {
  const location = useLocation();

  // Auth routes should render as true full-viewport pages (no app chrome).
  const isAuthRoute =
    location.pathname === "/signin" || location.pathname === "/signup";

  if (isAuthRoute) {
    // Full viewport container to ensure auth pages are not confined
    // to the app's main content area.
    return (
      <div className="min-h-screen bg-black text-white">
        <AppRouter />
      </div>
    );
  }

  return (
    <AppLayout playlists={playlists}>
      <AppRouter />
    </AppLayout>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Application root: providers + router + conditional layout selection. */
  const [playlists, setPlaylists] = useState([]);

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
    <PlayerProvider>
      <BrowserRouter>
        <AppShell playlists={playlists} />
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;
