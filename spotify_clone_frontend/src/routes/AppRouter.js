import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Library from "../pages/Library";
import Playlist from "../pages/Playlist";
import NotFound from "../pages/NotFound";

// PUBLIC_INTERFACE
export default function AppRouter() {
  /** Declares app routes (React Router). */
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/library" element={<Library />} />
      <Route path="/playlist/:playlistId" element={<Playlist />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
