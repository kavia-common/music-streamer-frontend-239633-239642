import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import AppRouter from "./routes/AppRouter";
import { PlayerProvider } from "./context/PlayerContext";
import { UISettingsProvider } from "./context/UISettingsContext";
import { getPlaylists } from "./services/catalogService";
import "./App.css";

function AppShell({ playlists }) {
  return (
    <AppLayout playlists={playlists}>
      <AppRouter />
    </AppLayout>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Application root: providers + router. Theme is applied by UISettingsProvider. */
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
