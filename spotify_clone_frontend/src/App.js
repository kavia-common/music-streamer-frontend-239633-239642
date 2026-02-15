import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import AppRouter from "./routes/AppRouter";
import { PlayerProvider } from "./context/PlayerContext";
import { UISettingsProvider, useUISettings } from "./context/UISettingsContext";
import { getPlaylists } from "./services/catalogService";
import "./App.css";

function AppShell({ playlists }) {
  const location = useLocation();
  const { settings } = useUISettings();

  const isAuthRoute =
    location.pathname === "/signin" || location.pathname === "/signup";

  // When enabled, auth routes are rendered as true full-viewport pages (no app chrome).
  // When disabled, auth routes render inside the normal AppLayout.
  const authIsFullscreen = settings.authLayoutMode === "fullscreen";

  if (isAuthRoute && authIsFullscreen) {
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
      <UISettingsProvider>
        <BrowserRouter>
          <AppShell playlists={playlists} />
        </BrowserRouter>
      </UISettingsProvider>
    </PlayerProvider>
  );
}

export default App;
