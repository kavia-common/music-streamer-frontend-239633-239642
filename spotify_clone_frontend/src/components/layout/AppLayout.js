import React from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import BottomPlayer from "../player/BottomPlayer";

// PUBLIC_INTERFACE
export default function AppLayout({ playlists, children }) {
  /** Main Spotify-like layout: sidebar + content + pinned bottom player. */
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-black dark:text-white">
      <div className="mx-auto flex max-w-screen-2xl gap-0">
        <Sidebar playlists={playlists} />

        <main className="flex-1 min-w-0">
          <div className="px-0 md:px-2">
            <div className="rounded-none md:rounded-xl md:mt-3 md:mr-3 overflow-hidden border border-black/5 bg-white dark:border-white/5 dark:bg-gradient-to-b dark:from-[#1f1f1f] dark:to-black">
              <TopNav />
              <div className="px-4 pb-28 pt-2">{children}</div>
            </div>
          </div>
        </main>
      </div>

      {/* Pinned player */}
      <BottomPlayer />
    </div>
  );
}
