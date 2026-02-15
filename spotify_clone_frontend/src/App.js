import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import AppRouter from "./routes/AppRouter";
import { PlayerProvider } from "./context/PlayerContext";
import { getPlaylists } from "./services/catalogService";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  /** Application root: providers + router + layout. */
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
        <AppLayout playlists={playlists}>
          <AppRouter />
        </AppLayout>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;
